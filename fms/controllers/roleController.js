const { pool } = require('../config/db');
const { logOperation } = require('../services/operationLogService');

/**
 * GET /api/roles
 * 角色列表（含各角色权限数量）
 */
async function listRoles(req, res) {
  try {
    const [roles] = await pool.execute(`
      SELECT r.id, r.name, r.description,
             COUNT(rp.permission_id) AS perm_count
      FROM roles r
      LEFT JOIN role_permissions rp ON r.id = rp.role_id
      GROUP BY r.id
      ORDER BY r.id
    `);
    res.json({ code: 200, data: roles });
  } catch (error) {
    console.error('[Role] 列表错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

/**
 * GET /api/roles/:id
 * 角色详情（含该角色拥有的权限 ID 列表）
 */
async function getRole(req, res) {
  try {
    const { id } = req.params;

    const [roles] = await pool.execute('SELECT id, name, description FROM roles WHERE id = ?', [id]);
    if (roles.length === 0) {
      return res.status(404).json({ code: 404, message: '角色不存在' });
    }

    const [permIds] = await pool.execute(
      'SELECT permission_id FROM role_permissions WHERE role_id = ?',
      [id]
    );

    res.json({
      code: 200,
      data: {
        ...roles[0],
        permission_ids: permIds.map(p => p.permission_id),
      },
    });
  } catch (error) {
    console.error('[Role] 详情错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

/**
 * POST /api/roles
 * 创建新角色（含权限分配）
 */
async function createRole(req, res) {
  const conn = await pool.getConnection();
  try {
    const { name, description, permission_ids } = req.body;

    if (!name) {
      conn.release();
      return res.status(400).json({ code: 400, message: '角色名称为必填项' });
    }

    // 检查名称唯一
    const [existing] = await conn.execute('SELECT id FROM roles WHERE name = ?', [name]);
    if (existing.length > 0) {
      conn.release();
      return res.status(400).json({ code: 400, message: '角色名称已存在' });
    }

    await conn.beginTransaction();

    const [result] = await conn.execute(
      'INSERT INTO roles (name, description) VALUES (?, ?)',
      [name, description || '']
    );
    const roleId = result.insertId;

    // 分配权限
    if (permission_ids && Array.isArray(permission_ids)) {
      for (const permId of permission_ids) {
        await conn.execute(
          'INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
          [roleId, permId]
        );
      }
    }

    await conn.commit();

    await logOperation({
      user_id: req.user.id,
      action: '创建角色',
      target_type: 'role',
      target_id: roleId,
      details: { name },
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
    });

    res.status(201).json({ code: 201, message: '角色创建成功', data: { id: roleId } });
  } catch (error) {
    await conn.rollback();
    console.error('[Role] 创建错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  } finally {
    conn.release();
  }
}

/**
 * PUT /api/roles/:id
 * 更新角色（名称、描述、权限）
 */
async function updateRole(req, res) {
  const conn = await pool.getConnection();
  try {
    const { id } = req.params;
    const { name, description, permission_ids } = req.body;

    const [existing] = await conn.execute('SELECT id FROM roles WHERE id = ?', [id]);
    if (existing.length === 0) {
      conn.release();
      return res.status(404).json({ code: 404, message: '角色不存在' });
    }

    // 检查名称唯一（排除自身）
    if (name) {
      const [dup] = await conn.execute('SELECT id FROM roles WHERE name = ? AND id != ?', [name, id]);
      if (dup.length > 0) {
        conn.release();
        return res.status(400).json({ code: 400, message: '角色名称已存在' });
      }
    }

    await conn.beginTransaction();

    // 更新基本信息
    const fields = [];
    const params = [];
    if (name !== undefined) { fields.push('name = ?'); params.push(name); }
    if (description !== undefined) { fields.push('description = ?'); params.push(description); }
    if (fields.length > 0) {
      params.push(id);
      await conn.execute(`UPDATE roles SET ${fields.join(', ')} WHERE id = ?`, params);
    }

    // 更新权限（全量替换）
    if (permission_ids !== undefined) {
      await conn.execute('DELETE FROM role_permissions WHERE role_id = ?', [id]);
      for (const permId of permission_ids) {
        await conn.execute(
          'INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
          [id, permId]
        );
      }
    }

    await conn.commit();

    await logOperation({
      user_id: req.user.id,
      action: '更新角色',
      target_type: 'role',
      target_id: parseInt(id),
      details: { name: name || existing[0].name },
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
    });

    res.json({ code: 200, message: '角色更新成功' });
  } catch (error) {
    await conn.rollback();
    console.error('[Role] 更新错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  } finally {
    conn.release();
  }
}

/**
 * DELETE /api/roles/:id
 * 删除角色（角色下有用户时禁止删除）
 */
async function deleteRole(req, res) {
  try {
    const { id } = req.params;

    const [existing] = await pool.execute('SELECT id, name FROM roles WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ code: 404, message: '角色不存在' });
    }

    // 检查是否有用户使用此角色
    const [users] = await pool.execute('SELECT COUNT(*) AS cnt FROM users WHERE role_id = ?', [id]);
    if (users[0].cnt > 0) {
      return res.status(400).json({
        code: 400,
        message: `该角色下还有 ${users[0].cnt} 个用户，请先将用户分配到其他角色`,
      });
    }

    await pool.execute('DELETE FROM roles WHERE id = ?', [id]);

    await logOperation({
      user_id: req.user.id,
      action: '删除角色',
      target_type: 'role',
      target_id: parseInt(id),
      details: { name: existing[0].name },
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
    });

    res.json({ code: 200, message: '角色已删除' });
  } catch (error) {
    console.error('[Role] 删除错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

/**
 * GET /api/roles/permissions/all
 * 获取所有可用权限（用于角色编辑时的权限选择）
 */
async function listAllPermissions(req, res) {
  try {
    const [permissions] = await pool.execute('SELECT id, name, description FROM permissions ORDER BY id');
    res.json({ code: 200, data: permissions });
  } catch (error) {
    console.error('[Role] 权限列表错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

module.exports = { listRoles, getRole, createRole, updateRole, deleteRole, listAllPermissions };
