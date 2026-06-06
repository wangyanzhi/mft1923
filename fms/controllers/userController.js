const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');
const { logOperation } = require('../services/operationLogService');

/**
 * GET /api/users
 * 用户列表（分页 + 搜索）
 */
async function listUsers(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    let where = '';
    const params = [];
    if (search) {
      where = 'WHERE u.username LIKE ? OR u.name LIKE ? OR u.email LIKE ?';
      const kw = `%${search}%`;
      params.push(kw, kw, kw);
    }

    // 总数
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) AS total FROM users u ${where}`,
      params
    );
    const total = countResult[0].total;

    // 列表
    const [users] = await pool.execute(
      `SELECT u.id, u.username, u.name, u.email, u.phone, u.status,
              r.id AS role_id, r.name AS role_name
       FROM users u
       JOIN roles r ON u.role_id = r.id
       ${where}
       ORDER BY u.id ASC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      code: 200,
      data: {
        list: users,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      },
    });
  } catch (error) {
    console.error('[User] 列表查询错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

/**
 * GET /api/users/:id
 * 用户详情（含 user_data_scopes）
 */
async function getUser(req, res) {
  try {
    const { id } = req.params;

    const [users] = await pool.execute(
      `SELECT u.id, u.username, u.name, u.email, u.phone, u.role_id, u.status,
              r.name AS role_name
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.id = ?`,
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({ code: 404, message: '用户不存在' });
    }

    const user = users[0];

    // 获取该用户的数据范围配置
    const [scopes] = await pool.execute(
      'SELECT resource, scope FROM user_data_scopes WHERE user_id = ?',
      [id]
    );

    res.json({
      code: 200,
      data: {
        ...user,
        data_scopes: scopes,
      },
    });
  } catch (error) {
    console.error('[User] 详情查询错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

/**
 * PUT /api/users/:id
 * 更新用户信息 + user_data_scopes
 */
async function updateUser(req, res) {
  const conn = await pool.getConnection();
  try {
    const { id } = req.params;
    const { name, email, phone, role_id, status, password, data_scopes } = req.body;

    // 检查用户是否存在
    const [existing] = await conn.execute('SELECT id FROM users WHERE id = ?', [id]);
    if (existing.length === 0) {
      conn.release();
      return res.status(404).json({ code: 404, message: '用户不存在' });
    }

    // 禁止修改自己的角色或状态（防止锁死）
    if (parseInt(id) === req.user.id && role_id) {
      // 不允许自己改自己的角色
    }

    await conn.beginTransaction();

    // 更新用户基本信息
    const updateFields = [];
    const updateParams = [];

    if (name !== undefined) { updateFields.push('name = ?'); updateParams.push(name); }
    if (email !== undefined) { updateFields.push('email = ?'); updateParams.push(email); }
    if (phone !== undefined) { updateFields.push('phone = ?'); updateParams.push(phone); }
    if (role_id !== undefined) { updateFields.push('role_id = ?'); updateParams.push(role_id); }
    if (status !== undefined) { updateFields.push('status = ?'); updateParams.push(status); }

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateFields.push('password = ?');
      updateParams.push(hashed);
    }

    if (updateFields.length > 0) {
      updateParams.push(id);
      await conn.execute(
        `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
        updateParams
      );
    }

    // 更新 user_data_scopes
    if (data_scopes && Array.isArray(data_scopes)) {
      for (const item of data_scopes) {
        // 先尝试更新，再插入
        const [result] = await conn.execute(
          'UPDATE user_data_scopes SET scope = ? WHERE user_id = ? AND resource = ?',
          [item.scope, id, item.resource]
        );
        if (result.affectedRows === 0) {
          await conn.execute(
            'INSERT INTO user_data_scopes (user_id, resource, scope) VALUES (?, ?, ?)',
            [id, item.resource, item.scope]
          );
        }
      }
    }

    await conn.commit();

    await logOperation({
      user_id: req.user.id,
      action: '更新用户',
      target_type: 'user',
      target_id: parseInt(id),
      details: { fields: Object.keys(req.body) },
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
    });

    res.json({ code: 200, message: '用户更新成功' });
  } catch (error) {
    await conn.rollback();
    console.error('[User] 更新错误:', error.message, error.sql || '');
    res.status(500).json({ code: 500, message: '服务器内部错误: ' + error.message });
  } finally {
    conn.release();
  }
}

/**
 * DELETE /api/users/:id
 * 删除用户（禁止删除自己）
 */
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ code: 400, message: '不能删除自己的账号' });
    }

    const [existing] = await pool.execute('SELECT id, username FROM users WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ code: 404, message: '用户不存在' });
    }

    await pool.execute('DELETE FROM users WHERE id = ?', [id]);

    await logOperation({
      user_id: req.user.id,
      action: '删除用户',
      target_type: 'user',
      target_id: parseInt(id),
      details: { username: existing[0].username },
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
    });

    res.json({ code: 200, message: '用户已删除' });
  } catch (error) {
    console.error('[User] 删除错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

/**
 * GET /api/users/roles/list
 * 角色列表
 */
async function listRoles(req, res) {
  try {
    const [roles] = await pool.execute('SELECT id, name, description FROM roles ORDER BY id');
    res.json({ code: 200, data: roles });
  } catch (error) {
    console.error('[User] 角色列表错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

/**
 * GET /api/users/permissions/list
 * 权限列表
 */
async function listPermissions(req, res) {
  try {
    const [permissions] = await pool.execute('SELECT id, name, description FROM permissions ORDER BY id');
    res.json({ code: 200, data: permissions });
  } catch (error) {
    console.error('[User] 权限列表错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

module.exports = { listUsers, getUser, updateUser, deleteUser, listRoles, listPermissions };
