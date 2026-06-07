const { pool } = require('../config/db');
const { logOperation } = require('../services/operationLogService');

// ============================================================
// 采购单 CRUD
// ============================================================
async function listPurchases(req, res) {
  try {
    const page = parseInt(req.query.page) || 1, limit = parseInt(req.query.limit) || 15, offset = (page - 1) * limit;
    const status = req.query.status || '', supplierId = req.query.supplier_id || '', search = req.query.search || '';
    const conds = [], params = [];
    if (status) { conds.push('po.status = ?'); params.push(status); }
    if (supplierId) { conds.push('po.supplier_id = ?'); params.push(supplierId); }
    if (search) { conds.push('(po.order_number LIKE ? OR s.name LIKE ?)'); params.push(`%${search}%`,`%${search}%`); }
    const where = conds.length > 0 ? 'WHERE ' + conds.join(' AND ') : '';
    const [c] = await pool.execute(`SELECT COUNT(*) AS total FROM purchase_orders po LEFT JOIN suppliers s ON po.supplier_id = s.id ${where}`, params);
    const [list] = await pool.execute(
      `SELECT po.*, s.name AS supplier_name, u.name AS operator_name,
              (SELECT COUNT(*) FROM purchase_order_items WHERE purchase_order_id = po.id) AS item_count
       FROM purchase_orders po LEFT JOIN suppliers s ON po.supplier_id = s.id LEFT JOIN users u ON po.user_id = u.id
       ${where} ORDER BY po.id DESC LIMIT ? OFFSET ?`, [...params, limit, offset]
    );
    res.json({ code: 200, data: { list, pagination: { page, limit, total: c[0].total, totalPages: Math.ceil(c[0].total / limit) } } });
  } catch (e) { console.error('[Purch] 列表:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function getPurchase(req, res) {
  try {
    const [rows] = await pool.execute(
      `SELECT po.*, s.name AS supplier_name FROM purchase_orders po LEFT JOIN suppliers s ON po.supplier_id = s.id WHERE po.id = ?`, [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ code: 404, message: '采购单不存在' });
    const [items] = await pool.execute(
      `SELECT pi.*, p.model AS product_model FROM purchase_order_items pi JOIN products p ON pi.product_id = p.id WHERE pi.purchase_order_id = ?`, [req.params.id]
    );
    res.json({ code: 200, data: { ...rows[0], items } });
  } catch (e) { console.error('[Purch] 详情:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function createPurchase(req, res) {
  try {
    const { supplier_id, order_date, expected_date, notes, items } = req.body;
    if (!supplier_id) return res.status(400).json({ code: 400, message: '请选择供应商' });
    if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ code: 400, message: '请添加产品明细' });
    const orderNumber = 'PO' + Date.now().toString(36).toUpperCase();
    let total = 0;
    for (const item of items) total += (item.quantity || 0) * (item.unit_price || 0);

    const [r] = await pool.execute(
      'INSERT INTO purchase_orders (order_number, supplier_id, user_id, order_date, expected_date, total_amount, notes) VALUES (?,?,?,?,?,?,?)',
      [orderNumber, supplier_id, req.user.id, order_date || new Date().toISOString().slice(0,10), expected_date || null, total, notes || '']
    );
    for (const item of items) {
      await pool.execute(
        'INSERT INTO purchase_order_items (purchase_order_id, product_id, quantity, unit_price, subtotal) VALUES (?,?,?,?,?)',
        [r.insertId, item.product_id, item.quantity, item.unit_price || 0, (item.quantity||0)*(item.unit_price||0)]
      );
    }
    await logOperation({ user_id: req.user.id, action: '创建采购单', target_type: 'purchase', target_id: r.insertId, details: { order_number: orderNumber }, ip_address: req.ip, user_agent: req.headers['user-agent'] });
    res.status(201).json({ code: 201, message: '采购单创建成功', data: { id: r.insertId, order_number: orderNumber } });
  } catch (e) { console.error('[Purch] 创建:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function updatePurchaseStatus(req, res) {
  try {
    const valid = { '待处理': ['已下单','已取消'], '已下单': ['已收货','已取消'] };
    const [rows] = await pool.execute('SELECT status FROM purchase_orders WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ code: 404, message: '采购单不存在' });
    const allowed = valid[rows[0].status];
    if (!allowed || !allowed.includes(req.body.status)) return res.status(400).json({ code: 400, message: `不能从"${rows[0].status}"变更为"${req.body.status}"` });
    await pool.execute('UPDATE purchase_orders SET status = ? WHERE id = ?', [req.body.status, req.params.id]);
    res.json({ code: 200, message: '状态更新成功' });
  } catch (e) { console.error('[Purch] 状态:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function deletePurchase(req, res) {
  try {
    const [rows] = await pool.execute('SELECT status FROM purchase_orders WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ code: 404, message: '采购单不存在' });
    if (rows[0].status !== '待处理') return res.status(400).json({ code: 400, message: '仅待处理状态可删除' });
    await pool.execute('DELETE FROM purchase_orders WHERE id = ?', [req.params.id]);
    res.json({ code: 200, message: '采购单已删除' });
  } catch (e) { console.error('[Purch] 删除:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

// ============================================================
// 供应商 CRUD
// ============================================================
async function listSuppliers(req, res) {
  try {
    const [rows] = await pool.execute('SELECT * FROM suppliers ORDER BY id');
    res.json({ code: 200, data: rows });
  } catch (e) { console.error('[Supp] 列表:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function createSupplier(req, res) {
  try {
    const { name, contact_person, phone, email, address, notes } = req.body;
    if (!name) return res.status(400).json({ code: 400, message: '供应商名称为必填项' });
    const [r] = await pool.execute(
      'INSERT INTO suppliers (name, contact_person, phone, email, address, notes) VALUES (?,?,?,?,?,?)',
      [name, contact_person||'', phone||'', email||'', address||'', notes||'']
    );
    res.status(201).json({ code: 201, message: '供应商创建成功', data: { id: r.insertId } });
  } catch (e) { console.error('[Supp] 创建:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function updateSupplier(req, res) {
  try {
    const fields = [], params = [];
    for (const k of ['name','contact_person','phone','email','address','notes','status']) {
      if (req.body[k] !== undefined) { fields.push(k+' = ?'); params.push(req.body[k]); }
    }
    if (fields.length === 0) return res.status(400).json({ code: 400, message: '无更新字段' });
    params.push(req.params.id);
    await pool.execute(`UPDATE suppliers SET ${fields.join(', ')} WHERE id = ?`, params);
    res.json({ code: 200, message: '供应商更新成功' });
  } catch (e) { console.error('[Supp] 更新:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function deleteSupplier(req, res) {
  try {
    const [rows] = await pool.execute('SELECT COUNT(*) AS cnt FROM purchase_orders WHERE supplier_id = ?', [req.params.id]);
    if (rows[0].cnt > 0) return res.status(400).json({ code: 400, message: `该供应商有 ${rows[0].cnt} 个关联采购单，无法删除` });
    await pool.execute('DELETE FROM suppliers WHERE id = ?', [req.params.id]);
    res.json({ code: 200, message: '供应商已删除' });
  } catch (e) { console.error('[Supp] 删除:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

module.exports = { listPurchases, getPurchase, createPurchase, updatePurchaseStatus, deletePurchase,
                   listSuppliers, createSupplier, updateSupplier, deleteSupplier };
