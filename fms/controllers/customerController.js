const { pool } = require('../config/db');
const { logOperation } = require('../services/operationLogService');

// GET /api/customers — 客户列表（暂用于订单创建选择客户，完整CRUD在第7阶段）
async function listCustomers(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    let where = '', params = [];
    if (search) { where = 'WHERE name LIKE ? OR company LIKE ?'; params.push(`%${search}%`, `%${search}%`); }

    const [countResult] = await pool.execute(`SELECT COUNT(*) AS total FROM customers ${where}`, params);
    const total = countResult[0].total;

    const [customers] = await pool.execute(
      `SELECT * FROM customers ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({ code: 200, data: { list: customers, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
  } catch (error) {
    console.error('[Customer] 列表错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

module.exports = { listCustomers };
