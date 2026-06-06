const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');
const { logOperation } = require('../services/operationLogService');

/**
 * POST /api/auth/login
 * 用户登录，返回 JWT Token + 用户信息 + 权限列表
 */
async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ code: 400, message: '请输入用户名和密码' });
    }

    // 查询用户
    const [users] = await pool.execute(
      'SELECT id, username, password, name, email, phone, role_id, status FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ code: 401, message: '用户名或密码错误' });
    }

    const user = users[0];

    if (user.status !== '启用') {
      return res.status(403).json({ code: 403, message: '账号已被停用，请联系管理员' });
    }

    // 验证密码
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ code: 401, message: '用户名或密码错误' });
    }

    // 获取角色名
    const [roles] = await pool.execute('SELECT name FROM roles WHERE id = ?', [user.role_id]);
    const roleName = roles.length > 0 ? roles[0].name : '未知';

    // 获取权限列表
    const [permissions] = await pool.execute(
      `SELECT p.name FROM permissions p
       JOIN role_permissions rp ON p.id = rp.permission_id
       WHERE rp.role_id = ?`,
      [user.role_id]
    );
    const permList = permissions.map(p => p.name);

    // 生成 JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // 记录操作日志
    await logOperation({
      user_id: user.id,
      action: '用户登录',
      target_type: 'user',
      target_id: user.id,
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
    });

    res.json({
      code: 200,
      message: '登录成功',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: roleName,
          permissions: permList,
        },
      },
    });
  } catch (error) {
    console.error('[Auth] 登录错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

/**
 * POST /api/auth/register
 * 管理员注册新用户
 */
async function register(req, res) {
  try {
    const { username, password, name, email, phone, role_id } = req.body;

    if (!username || !password || !name || !role_id) {
      return res.status(400).json({ code: 400, message: '用户名、密码、姓名和角色为必填项' });
    }

    // 检查用户名唯一
    const [existing] = await pool.execute('SELECT id FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ code: 400, message: '用户名已存在' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      'INSERT INTO users (username, password, name, email, phone, role_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, hashedPassword, name, email || null, phone || null, role_id, '启用']
    );

    await logOperation({
      user_id: req.user.id,
      action: '创建用户',
      target_type: 'user',
      target_id: result.insertId,
      details: { username, name },
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
    });

    res.status(201).json({
      code: 201,
      message: '用户创建成功',
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error('[Auth] 注册错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

/**
 * GET /api/auth/me
 * 获取当前登录用户信息
 */
async function getCurrentUser(req, res) {
  try {
    const [users] = await pool.execute(
      'SELECT id, username, name, email, phone, role_id, status FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ code: 404, message: '用户不存在' });
    }

    const user = users[0];
    const [roles] = await pool.execute('SELECT name FROM roles WHERE id = ?', [user.role_id]);
    const [permissions] = await pool.execute(
      `SELECT p.name FROM permissions p
       JOIN role_permissions rp ON p.id = rp.permission_id
       WHERE rp.role_id = ?`,
      [user.role_id]
    );

    res.json({
      code: 200,
      data: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: roles[0]?.name || '未知',
        permissions: permissions.map(p => p.name),
      },
    });
  } catch (error) {
    console.error('[Auth] 获取用户信息错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

/**
 * PUT /api/auth/password
 * 更新当前用户密码
 */
async function updatePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ code: 400, message: '请输入旧密码和新密码' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ code: 400, message: '新密码至少6位' });
    }

    // 验证旧密码
    const [users] = await pool.execute('SELECT password FROM users WHERE id = ?', [req.user.id]);
    const isValid = await bcrypt.compare(oldPassword, users[0].password);
    if (!isValid) {
      return res.status(400).json({ code: 400, message: '旧密码不正确' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.execute('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, req.user.id]);

    await logOperation({
      user_id: req.user.id,
      action: '修改密码',
      target_type: 'user',
      target_id: req.user.id,
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
    });

    res.json({ code: 200, message: '密码修改成功' });
  } catch (error) {
    console.error('[Auth] 修改密码错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

module.exports = { login, register, getCurrentUser, updatePassword };
