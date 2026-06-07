const { pool } = require('../config/db');
const { logOperation } = require('../services/operationLogService');

async function listConsultations(req, res) {
  try {
    const page = parseInt(req.query.page) || 1, limit = parseInt(req.query.limit) || 20, offset = (page - 1) * limit;
    const customerId = req.query.customer_id, status = req.query.status;
    const conditions = [], params = [];
    if (customerId) { conditions.push('c.customer_id = ?'); params.push(customerId); }
    if (status) { conditions.push('c.status = ?'); params.push(status); }
    const where = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
    const [cnt] = await pool.execute(`SELECT COUNT(*) AS total FROM customer_consultations c ${where}`, params);
    const [list] = await pool.execute(
      `SELECT c.*, cu.name AS customer_name, u.name AS operator_name
       FROM customer_consultations c
       JOIN customers cu ON c.customer_id = cu.id
       LEFT JOIN users u ON c.user_id = u.id
       ${where} ORDER BY c.consultation_date DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    res.json({ code: 200, data: { list, pagination: { page, limit, total: cnt[0].total, totalPages: Math.ceil(cnt[0].total / limit) } } });
  } catch (e) { console.error('[Consult] 列表:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function getConsultation(req, res) {
  try {
    const [rows] = await pool.execute(
      `SELECT c.*, cu.name AS customer_name FROM customer_consultations c JOIN customers cu ON c.customer_id = cu.id WHERE c.id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ code: 404, message: '咨询不存在' });
    res.json({ code: 200, data: rows[0] });
  } catch (e) { console.error('[Consult] 详情:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function createConsultation(req, res) {
  try {
    const { customer_id, consultation_date, content, next_follow_up, status, notes } = req.body;
    if (!customer_id || !content) return res.status(400).json({ code: 400, message: '客户和咨询内容为必填项' });
    const [r] = await pool.execute(
      'INSERT INTO customer_consultations (customer_id, user_id, consultation_date, content, next_follow_up, status, notes) VALUES (?,?,?,?,?,?,?)',
      [customer_id, req.user.id, consultation_date || new Date().toISOString().slice(0,10), content, next_follow_up || null, status || '待跟进', notes || '']
    );
    await logOperation({ user_id: req.user.id, action: '创建咨询', target_type: 'consultation', target_id: r.insertId, details: { customer_id }, ip_address: req.ip, user_agent: req.headers['user-agent'] });
    res.status(201).json({ code: 201, message: '咨询记录创建成功', data: { id: r.insertId } });
  } catch (e) { console.error('[Consult] 创建:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function updateConsultation(req, res) {
  try {
    const fields = [], params = [];
    for (const k of ['content','next_follow_up','status','notes']) {
      if (req.body[k] !== undefined) { fields.push(k+' = ?'); params.push(req.body[k]); }
    }
    if (fields.length === 0) return res.status(400).json({ code: 400, message: '无更新字段' });
    params.push(req.params.id);
    await pool.execute(`UPDATE customer_consultations SET ${fields.join(', ')} WHERE id = ?`, params);
    res.json({ code: 200, message: '咨询更新成功' });
  } catch (e) { console.error('[Consult] 更新:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

async function deleteConsultation(req, res) {
  try {
    await pool.execute('DELETE FROM customer_consultations WHERE id = ?', [req.params.id]);
    res.json({ code: 200, message: '咨询已删除' });
  } catch (e) { console.error('[Consult] 删除:', e); res.status(500).json({ code: 500, message: '服务器内部错误' }); }
}

module.exports = { listConsultations, getConsultation, createConsultation, updateConsultation, deleteConsultation };
