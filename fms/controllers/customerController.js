const { pool } = require('../config/db');
const { logOperation } = require('../services/operationLogService');

async function listCustomers(req, res) {
  try {
    const page = parseInt(req.query.page) || 1, limit = parseInt(req.query.limit) || 50, offset = (page - 1) * limit;
    const search = req.query.search || '';
    let where = '', params = [];
    if (search) { where = 'WHERE name LIKE ? OR company LIKE ? OR contact_person LIKE ?'; params.push(`%${search}%`,`%${search}%`,`%${search}%`); }
    const [c] = await pool.execute(`SELECT COUNT(*) AS total FROM customers ${where}`, params);
    const [list] = await pool.execute(`SELECT * FROM customers ${where} ORDER BY id DESC LIMIT ? OFFSET ?`, [...params, limit, offset]);
    res.json({ code: 200, data: { list, pagination: { page, limit, total: c[0].total, totalPages: Math.ceil(c[0].total / limit) } } });
  } catch (e) { console.error('[Customer] 列表:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function getCustomer(req, res) {
  try {
    const [rows] = await pool.execute('SELECT * FROM customers WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ code: 404, message: '客户不存在' });
    // 关联订单数
    const [ords] = await pool.execute('SELECT COUNT(*) AS cnt FROM orders WHERE customer_id = ?', [req.params.id]);
    const [cons] = await pool.execute('SELECT COUNT(*) AS cnt FROM customer_consultations WHERE customer_id = ?', [req.params.id]);
    res.json({ code: 200, data: { ...rows[0], order_count: ords[0].cnt, consultation_count: cons[0].cnt } });
  } catch (e) { console.error('[Customer] 详情:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function createCustomer(req, res) {
  try {
    const { name, company, contact_person, phone, email, address, notes } = req.body;
    if (!name) return res.status(400).json({ code: 400, message: '客户名称为必填项' });
    const [r] = await pool.execute(
      'INSERT INTO customers (name, company, contact_person, phone, email, address, notes, created_by) VALUES (?,?,?,?,?,?,?,?)',
      [name, company||'', contact_person||'', phone||'', email||'', address||'', notes||'', req.user.id]
    );
    await logOperation({ user_id: req.user.id, action: '创建客户', target_type: 'customer', target_id: r.insertId, details: { name }, ip_address: req.ip, user_agent: req.headers['user-agent'] });
    res.status(201).json({ code: 201, message: '客户创建成功', data: { id: r.insertId } });
  } catch (e) { console.error('[Customer] 创建:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function updateCustomer(req, res) {
  try {
    const fields = [], params = [];
    for (const k of ['name','company','contact_person','phone','email','address','notes','status']) {
      if (req.body[k] !== undefined) { fields.push(k+' = ?'); params.push(req.body[k]); }
    }
    if (fields.length === 0) return res.status(400).json({ code: 400, message: '无更新字段' });
    params.push(req.params.id);
    await pool.execute(`UPDATE customers SET ${fields.join(', ')} WHERE id = ?`, params);
    res.json({ code: 200, message: '客户更新成功' });
  } catch (e) { console.error('[Customer] 更新:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function deleteCustomer(req, res) {
  try {
    const [ords] = await pool.execute('SELECT COUNT(*) AS cnt FROM orders WHERE customer_id = ?', [req.params.id]);
    if (ords[0].cnt > 0) return res.status(400).json({ code: 400, message: `该客户有 ${ords[0].cnt} 个关联订单，无法删除` });
    await pool.execute('DELETE FROM customers WHERE id = ?', [req.params.id]);
    res.json({ code: 200, message: '客户已删除' });
  } catch (e) { console.error('[Customer] 删除:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

module.exports = { listCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer };
