const { pool } = require('../config/db');
const { logOperation } = require('../services/operationLogService');

// GET /api/bins — 箱号列表，含各箱号下产品数量
async function listBins(req, res) {
  try {
    const search = req.query.search || '';
    const status = req.query.status || '';
    let where = '', params = [];
    if (search) { where += 'WHERE b.bin_number LIKE ? OR b.location LIKE ?'; params.push(`%${search}%`, `%${search}%`); }
    if (status) {
      where += where ? ' AND b.status = ?' : 'WHERE b.status = ?';
      params.push(status);
    }

    const [bins] = await pool.execute(
      `SELECT b.*, COUNT(i.id) AS product_count,
              COALESCE(SUM(i.quantity), 0) AS total_quantity
       FROM bins b
       LEFT JOIN inventory i ON b.id = i.bin_id AND i.quantity > 0
       ${where}
       GROUP BY b.id
       ORDER BY b.id`,
      params
    );
    res.json({ code: 200, data: bins });
  } catch (error) {
    console.error('[Bin] 列表错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// GET /api/bins/:id — 箱号详情 + 存放产品列表
async function getBin(req, res) {
  try {
    const [bins] = await pool.execute('SELECT * FROM bins WHERE id = ?', [req.params.id]);
    if (bins.length === 0) return res.status(404).json({ code: 404, message: '箱号不存在' });

    const [products] = await pool.execute(
      `SELECT i.id, p.model, i.batch_number, i.quantity, i.unit_price
       FROM inventory i JOIN products p ON i.product_id = p.id
       WHERE i.bin_id = ? AND i.quantity > 0`,
      [req.params.id]
    );

    res.json({ code: 200, data: { ...bins[0], products } });
  } catch (error) {
    console.error('[Bin] 详情错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// GET /api/bins/:id/products — 该箱号下所有产品
async function getBinProducts(req, res) {
  try {
    const [products] = await pool.execute(
      `SELECT i.id, p.id AS product_id, p.model, i.batch_number, i.quantity, i.unit_price
       FROM inventory i JOIN products p ON i.product_id = p.id
       WHERE i.bin_id = ? AND i.quantity > 0`,
      [req.params.id]
    );
    res.json({ code: 200, data: products });
  } catch (error) {
    console.error('[Bin] 产品列表错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// POST /api/bins — 新增箱号
async function createBin(req, res) {
  try {
    const { bin_number, location, description } = req.body;
    if (!bin_number) return res.status(400).json({ code: 400, message: '箱号编号为必填项' });

    const [dup] = await pool.execute('SELECT id FROM bins WHERE bin_number = ?', [bin_number]);
    if (dup.length > 0) return res.status(400).json({ code: 400, message: '箱号编号已存在' });

    const [result] = await pool.execute(
      'INSERT INTO bins (bin_number, location, description) VALUES (?, ?, ?)',
      [bin_number, location || '', description || '']
    );

    await logOperation({ user_id: req.user.id, action: '创建箱号', target_type: 'bin', target_id: result.insertId, details: { bin_number }, ip_address: req.ip, user_agent: req.headers['user-agent'] });
    res.status(201).json({ code: 201, message: '箱号创建成功', data: { id: result.insertId } });
  } catch (error) {
    console.error('[Bin] 创建错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// PUT /api/bins/:id — 修改箱号
async function updateBin(req, res) {
  try {
    const [existing] = await pool.execute('SELECT * FROM bins WHERE id = ?', [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ code: 404, message: '箱号不存在' });

    const { bin_number, location, description, status } = req.body;
    if (bin_number) {
      const [dup] = await pool.execute('SELECT id FROM bins WHERE bin_number = ? AND id != ?', [bin_number, req.params.id]);
      if (dup.length > 0) return res.status(400).json({ code: 400, message: '箱号编号已存在' });
    }

    const fields = [], params = [];
    if (bin_number !== undefined) { fields.push('bin_number = ?'); params.push(bin_number); }
    if (location !== undefined) { fields.push('location = ?'); params.push(location); }
    if (description !== undefined) { fields.push('description = ?'); params.push(description); }
    if (status !== undefined) { fields.push('status = ?'); params.push(status); }
    if (fields.length > 0) { params.push(req.params.id); await pool.execute(`UPDATE bins SET ${fields.join(', ')} WHERE id = ?`, params); }

    await logOperation({ user_id: req.user.id, action: '修改箱号', target_type: 'bin', target_id: parseInt(req.params.id), details: req.body, ip_address: req.ip, user_agent: req.headers['user-agent'] });
    res.json({ code: 200, message: '箱号更新成功' });
  } catch (error) {
    console.error('[Bin] 更新错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// DELETE /api/bins/:id — 删除箱号（必须先清空库存）
async function deleteBin(req, res) {
  try {
    const [existing] = await pool.execute('SELECT * FROM bins WHERE id = ?', [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ code: 404, message: '箱号不存在' });

    const [inv] = await pool.execute('SELECT COUNT(*) AS cnt, COALESCE(SUM(quantity),0) AS qty FROM inventory WHERE bin_id = ? AND quantity > 0', [req.params.id]);
    if (inv[0].cnt > 0) {
      return res.status(400).json({ code: 400, message: `该箱号下还有 ${inv[0].cnt} 条库存记录（共 ${inv[0].qty} 单位），请先移走所有产品` });
    }

    await pool.execute('DELETE FROM bins WHERE id = ?', [req.params.id]);
    await logOperation({ user_id: req.user.id, action: '删除箱号', target_type: 'bin', target_id: parseInt(req.params.id), details: { bin_number: existing[0].bin_number }, ip_address: req.ip, user_agent: req.headers['user-agent'] });
    res.json({ code: 200, message: '箱号已删除' });
  } catch (error) {
    console.error('[Bin] 删除错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

module.exports = { listBins, getBin, getBinProducts, createBin, updateBin, deleteBin };
