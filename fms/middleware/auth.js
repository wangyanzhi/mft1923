const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

/**
 * 验证 JWT Token，将用户信息附加到 req.user
 */
async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ code: 401, message: '未提供认证令牌' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 验证用户是否存在且启用
    const [users] = await pool.execute(
      'SELECT id, username, name, role_id, status FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (users.length === 0) {
      return res.status(401).json({ code: 401, message: '用户不存在' });
    }

    const user = users[0];
    if (user.status !== '启用') {
      return res.status(403).json({ code: 403, message: '账号已被停用' });
    }

    // 获取用户的角色和权限
    const [permissions] = await pool.execute(
      `SELECT p.name FROM permissions p
       JOIN role_permissions rp ON p.id = rp.permission_id
       WHERE rp.role_id = ?`,
      [user.role_id]
    );

    req.user = {
      id: user.id,
      username: user.username,
      name: user.name,
      role_id: user.role_id,
      permissions: permissions.map(p => p.name),
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ code: 401, message: '无效的认证令牌' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ code: 401, message: '认证令牌已过期，请重新登录' });
    }
    console.error('[Auth] Token 验证错误:', error);
    return res.status(500).json({ code: 500, message: '认证服务异常' });
  }
}

/**
 * 权限检查中间件工厂
 * @param {string} permissionName - 需要的权限名
 */
function verifyPermission(permissionName) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ code: 401, message: '请先登录' });
    }
    if (!req.user.permissions.includes(permissionName)) {
      return res.status(403).json({ code: 403, message: '权限不足：' + permissionName });
    }
    next();
  };
}

/**
 * 数据范围过滤中间件工厂
 * 两级优先级：user_data_scopes > role_data_scopes > 默认 '本人'
 * @param {string} resource - 资源类型（customer/consultation/order/purchase/stock_in_order）
 */
function applyDataScope(resource) {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ code: 401, message: '请先登录' });
    }

    try {
      // 1. 先查用户级数据范围
      const [userScopes] = await pool.execute(
        'SELECT scope FROM user_data_scopes WHERE user_id = ? AND resource = ?',
        [req.user.id, resource]
      );

      let scope;
      if (userScopes.length > 0) {
        scope = userScopes[0].scope;
      } else {
        // 2. 查角色级默认范围
        const [roleScopes] = await pool.execute(
          'SELECT scope FROM role_data_scopes WHERE role_id = ? AND resource = ?',
          [req.user.role_id, resource]
        );
        scope = roleScopes.length > 0 ? roleScopes[0].scope : '本人';
      }

      req.dataScope = scope;
      next();
    } catch (error) {
      console.error('[Auth] 数据范围查询错误:', error);
      return res.status(500).json({ code: 500, message: '权限查询异常' });
    }
  };
}

module.exports = { verifyToken, verifyPermission, applyDataScope };
