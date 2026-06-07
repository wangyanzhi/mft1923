const { pool } = require('../config/db');
const { logOperation } = require('../services/operationLogService');
const fs = require('fs');
const path = require('path');

// ============================================================
// 订单号生成
// ============================================================
function generateOrderNumber() {
  const now = new Date();
  const d = now.toISOString().slice(2, 10).replace(/-/g, '');
  const t = now.getHours().toString(36).toUpperCase() + now.getMinutes().toString(36).toUpperCase();
  const r = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `SO${d}${t}${r}`;
}

// ============================================================
// 订单 CRUD
// ============================================================

// GET /api/orders — 订单列表
async function listOrders(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const offset = (page - 1) * limit;
    const status = req.query.status;
    const paymentStatus = req.query.payment_status;
    const customerId = req.query.customer_id;
    const search = req.query.search || '';
    const dateFrom = req.query.date_from;
    const dateTo = req.query.date_to;

    const conditions = [];
    const params = [];
    if (status) { conditions.push('o.status = ?'); params.push(status); }
    if (paymentStatus) { conditions.push('o.payment_status = ?'); params.push(paymentStatus); }
    if (customerId) { conditions.push('o.customer_id = ?'); params.push(customerId); }
    if (search) { conditions.push('(o.order_number LIKE ? OR c.name LIKE ? OR o.agent_name LIKE ?)'); params.push(`%${search}%`, `%${search}%`, `%${search}%`); }
    if (dateFrom) { conditions.push('o.sales_date >= ?'); params.push(dateFrom); }
    if (dateTo) { conditions.push('o.sales_date <= ?'); params.push(dateTo); }
    const where = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

    const [countResult] = await pool.execute(
      `SELECT COUNT(*) AS total FROM orders o LEFT JOIN customers c ON o.customer_id = c.id ${where}`, params
    );
    const total = countResult[0].total;

    const [orders] = await pool.execute(
      `SELECT o.id, o.order_number, o.customer_id, c.name AS customer_name,
              o.sales_date, o.agent_name, o.total_amount, o.status, o.payment_status,
              o.payment_method, o.express_company, o.created_at,
              u.name AS operator_name,
              (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) AS item_count
       FROM orders o
       LEFT JOIN customers c ON o.customer_id = c.id
       LEFT JOIN users u ON o.user_id = u.id
       ${where}
       ORDER BY o.id DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({ code: 200, data: { list: orders, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
  } catch (error) {
    console.error('[Order] 列表错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// GET /api/orders/today-count
async function todayCount(req, res) {
  try {
    const [result] = await pool.execute(
      "SELECT COUNT(*) AS cnt FROM orders WHERE DATE(created_at) = CURDATE()"
    );
    res.json({ code: 200, data: { count: result[0].cnt } });
  } catch (error) {
    console.error('[Order] 今日订单数错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// GET /api/orders/stats/sales
async function salesStats(req, res) {
  try {
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month;

    let dateCondition = "YEAR(o.sales_date) = ?";
    const params = [year];
    if (month) { dateCondition += " AND MONTH(o.sales_date) = ?"; params.push(month); }

    const [total] = await pool.execute(
      `SELECT COALESCE(SUM(o.total_amount), 0) AS total_amount, COUNT(*) AS order_count
       FROM orders o WHERE o.status != '已取消' AND ${dateCondition}`, params
    );

    // 按月统计
    const [monthly] = await pool.execute(
      `SELECT MONTH(o.sales_date) AS m, COALESCE(SUM(o.total_amount), 0) AS amount, COUNT(*) AS cnt
       FROM orders o WHERE o.status != '已取消' AND YEAR(o.sales_date) = ?
       GROUP BY MONTH(o.sales_date) ORDER BY m`, [year]
    );

    res.json({ code: 200, data: { total: total[0], monthly } });
  } catch (error) {
    console.error('[Order] 统计错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// GET /api/orders/:id — 订单详情
async function getOrder(req, res) {
  try {
    const [orders] = await pool.execute(
      `SELECT o.*, c.name AS customer_name, u.name AS operator_name
       FROM orders o
       LEFT JOIN customers c ON o.customer_id = c.id
       LEFT JOIN users u ON o.user_id = u.id
       WHERE o.id = ?`, [req.params.id]
    );
    if (orders.length === 0) return res.status(404).json({ code: 404, message: '订单不存在' });

    const [items] = await pool.execute(
      `SELECT oi.*, p.model AS product_model, i.batch_number, i.quantity AS stock_quantity,
              b.bin_number, b.location AS bin_location
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       LEFT JOIN inventory i ON oi.inventory_id = i.id
       LEFT JOIN bins b ON i.bin_id = b.id
       WHERE oi.order_id = ?`, [req.params.id]
    );

    const [files] = await pool.execute(
      'SELECT * FROM order_files WHERE order_id = ? ORDER BY file_type, id', [req.params.id]
    );

    res.json({ code: 200, data: { ...orders[0], items, files } });
  } catch (error) {
    console.error('[Order] 详情错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// POST /api/orders — 创建订单
async function createOrder(req, res) {
  const conn = await pool.getConnection();
  try {
    const { customer_id, sales_date, agent_name, contact_phone, items,
            tray_type, waterproof, coc, delivery_note, return_note, inspection,
            invoice_rate, payment_terms, payment_term_manual, payment_method,
            express_company, notes } = req.body;

    if (!customer_id) { conn.release(); return res.status(400).json({ code: 400, message: '请选择客户' }); }
    if (!items || !Array.isArray(items) || items.length === 0) {
      conn.release(); return res.status(400).json({ code: 400, message: '请添加订单产品明细' }); }

    await conn.beginTransaction();

    // 验证并扣减库存
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      if (!item.product_id || !item.inventory_id || !item.quantity || item.quantity < 0.1) {
        await conn.rollback(); conn.release();
        return res.status(400).json({ code: 400, message: '产品、批次和数量（≥0.1）为必填项' }); }

      // 锁定库存行
      const [invRows] = await conn.execute(
        'SELECT id, product_id, batch_number, quantity, bin_id FROM inventory WHERE id = ? FOR UPDATE',
        [item.inventory_id]
      );

      if (invRows.length === 0) {
        await conn.rollback(); conn.release();
        return res.status(400).json({ code: 400, message: `库存批次不存在（ID: ${item.inventory_id}）` }); }

      const inv = invRows[0];
      if (inv.quantity < parseFloat(item.quantity)) {
        await conn.rollback(); conn.release();
        return res.status(400).json({ code: 400, message: `库存不足：${inv.batch_number} 当前库存 ${inv.quantity}，需要 ${item.quantity}` }); }

      const unitPrice = item.unit_price || 0;
      const subtotal = parseFloat(item.quantity) * parseFloat(unitPrice);
      totalAmount += subtotal;

      // 扣减库存
      const newQty = inv.quantity - parseFloat(item.quantity);
      await conn.execute('UPDATE inventory SET quantity = ?, last_updated_at = NOW() WHERE id = ?', [newQty, inv.id]);

      // 记录库存变动历史
      await conn.execute(
        `INSERT INTO inventory_history (inventory_id, product_id, batch_number, change_type, quantity_before, quantity_change, quantity_after, reference_type, reference_id, created_by)
         VALUES (?, ?, ?, '订单创建', ?, ?, ?, 'order', 0, ?)`,
        [inv.id, inv.product_id, inv.batch_number, inv.quantity, -parseFloat(item.quantity), newQty, req.user.id]
      );

      orderItems.push({ product_id: item.product_id, inventory_id: inv.id, quantity: item.quantity, unit_price: unitPrice, subtotal });
    }

    // 创建订单
    const orderNumber = generateOrderNumber();
    const [result] = await conn.execute(
      `INSERT INTO orders (order_number, customer_id, user_id, sales_date, agent_name, contact_phone,
        tray_type, waterproof, coc, delivery_note, return_note, inspection,
        invoice_rate, payment_terms, payment_term_manual, payment_method, express_company, total_amount, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderNumber, customer_id, req.user.id, sales_date || new Date().toISOString().slice(0,10),
       agent_name || '', contact_phone || '',
       tray_type || '无', waterproof || '否', coc || '否', delivery_note || '否', return_note || '否', inspection || '否',
       invoice_rate || '无', payment_terms || '已付', payment_term_manual || '', payment_method || '', express_company || '',
       totalAmount, notes || '']
    );
    const orderId = result.insertId;

    // 插入订单明细（关联 inventory_id）
    for (const oi of orderItems) {
      await conn.execute(
        'INSERT INTO order_items (order_id, product_id, inventory_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?, ?)',
        [orderId, oi.product_id, oi.inventory_id, oi.quantity, oi.unit_price, oi.subtotal]
      );
      // 更新库存历史中的 reference_id
      await conn.execute(
        "UPDATE inventory_history SET reference_id = ? WHERE reference_type = 'order' AND reference_id = 0 AND inventory_id = ? AND created_by = ? ORDER BY id DESC LIMIT 1",
        [orderId, oi.inventory_id, req.user.id]
      );
    }

    await conn.commit();

    await logOperation({ user_id: req.user.id, action: '创建订单', target_type: 'order', target_id: orderId, details: { order_number: orderNumber, total_amount: totalAmount }, ip_address: req.ip, user_agent: req.headers['user-agent'] });

    res.status(201).json({ code: 201, message: '订单创建成功', data: { id: orderId, order_number: orderNumber } });
  } catch (error) {
    await conn.rollback();
    console.error('[Order] 创建错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  } finally { conn.release(); }
}

// PUT /api/orders/:id/status — 更新订单状态
async function updateStatus(req, res) {
  const conn = await pool.getConnection();
  try {
    const { status } = req.body;
    if (!status) { conn.release(); return res.status(400).json({ code: 400, message: '请指定状态' }); }

    const [orders] = await conn.execute('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (orders.length === 0) { conn.release(); return res.status(404).json({ code: 404, message: '订单不存在' }); }

    const validTransitions = {
      '待处理': ['处理中', '已取消'],
      '处理中': ['已完成', '已取消'],
    };

    const allowed = validTransitions[orders[0].status];
    if (!allowed || !allowed.includes(status)) {
      conn.release();
      return res.status(400).json({ code: 400, message: `不能从"${orders[0].status}"变更为"${status}"` }); }

    // 取消订单：恢复库存
    if (status === '已取消' && orders[0].status !== '已取消') {
      await conn.beginTransaction();

      const [items] = await conn.execute('SELECT * FROM order_items WHERE order_id = ?', [req.params.id]);
      for (const item of items) {
        const [invRows] = await conn.execute('SELECT id, quantity FROM inventory WHERE id = ? FOR UPDATE', [item.inventory_id]);
        if (invRows.length > 0) {
          const newQty = invRows[0].quantity + parseFloat(item.quantity);
          await conn.execute('UPDATE inventory SET quantity = ?, last_updated_at = NOW() WHERE id = ?', [newQty, item.inventory_id]);
          await conn.execute(
            `INSERT INTO inventory_history (inventory_id, product_id, batch_number, change_type, quantity_before, quantity_change, quantity_after, reference_type, reference_id, created_by)
             VALUES (?, (SELECT product_id FROM inventory WHERE id = ?), (SELECT batch_number FROM inventory WHERE id = ?), '订单取消', ?, ?, ?, 'order', ?, ?)`,
            [item.inventory_id, item.inventory_id, item.inventory_id, invRows[0].quantity, item.quantity, newQty, req.params.id, req.user.id]
          );
        }
      }
      await conn.execute("UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?", [status, req.params.id]);
      await conn.commit();
    } else {
      await conn.execute("UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?", [status, req.params.id]);
    }

    await logOperation({ user_id: req.user.id, action: '更新订单状态', target_type: 'order', target_id: parseInt(req.params.id), details: { status }, ip_address: req.ip, user_agent: req.headers['user-agent'] });

    res.json({ code: 200, message: '状态更新成功' });
  } catch (error) {
    await conn.rollback();
    console.error('[Order] 状态更新错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  } finally { conn.release(); }
}

// PUT /api/orders/:id — 更新订单基本信息（不涉及库存）
async function updateOrder(req, res) {
  try {
    const fields = [], params = [];
    const allowed = ['agent_name', 'contact_phone', 'tray_type', 'waterproof', 'coc', 'delivery_note',
                     'return_note', 'inspection', 'invoice_rate', 'payment_terms', 'payment_term_manual',
                     'payment_method', 'payment_status', 'express_company', 'notes', 'sales_date'];

    for (const key of allowed) {
      if (req.body[key] !== undefined) { fields.push(`${key} = ?`); params.push(req.body[key]); }
    }

    if (fields.length === 0) return res.status(400).json({ code: 400, message: '没有要更新的字段' });

    params.push(req.params.id);
    await pool.execute(`UPDATE orders SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`, params);

    res.json({ code: 200, message: '订单更新成功' });
  } catch (error) {
    console.error('[Order] 更新错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// DELETE /api/orders/:id — 删除订单（仅待处理）
async function deleteOrder(req, res) {
  try {
    const [orders] = await pool.execute('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (orders.length === 0) return res.status(404).json({ code: 404, message: '订单不存在' });
    if (orders[0].status !== '待处理') return res.status(400).json({ code: 400, message: '仅待处理状态的订单可删除' });

    // 恢复库存
    const [items] = await pool.execute('SELECT * FROM order_items WHERE order_id = ?', [req.params.id]);
    for (const item of items) {
      await pool.execute('UPDATE inventory SET quantity = quantity + ?, last_updated_at = NOW() WHERE id = ?', [item.quantity, item.inventory_id]);
    }

    // 删除附件文件
    const [files] = await pool.execute('SELECT * FROM order_files WHERE order_id = ?', [req.params.id]);
    for (const f of files) {
      const fp = path.join(__dirname, '..', f.file_path);
      if (fs.existsSync(fp)) fs.unlinkSync(fp);
    }

    await pool.execute('DELETE FROM orders WHERE id = ?', [req.params.id]);

    await logOperation({ user_id: req.user.id, action: '删除订单', target_type: 'order', target_id: parseInt(req.params.id), details: { order_number: orders[0].order_number }, ip_address: req.ip, user_agent: req.headers['user-agent'] });

    res.json({ code: 200, message: '订单已删除，库存已恢复' });
  } catch (error) {
    console.error('[Order] 删除错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// ============================================================
// 订单文件管理
// ============================================================

// POST /api/orders/:id/files — 上传文件
async function uploadFile(req, res) {
  try {
    const orderId = req.params.id;
    const [orders] = await pool.execute('SELECT id FROM orders WHERE id = ?', [orderId]);
    if (orders.length === 0) return res.status(404).json({ code: 404, message: '订单不存在' });

    if (!req.file) return res.status(400).json({ code: 400, message: '请选择文件' });

    const fileType = req.body.file_type || '合同资质';
    if (!['合同资质', '发货图片'].includes(fileType)) {
      return res.status(400).json({ code: 400, message: '文件类型无效' });
    }

    const filePath = fileType === '合同资质' ? '/uploads/orders/documents/' : '/uploads/orders/shipments/';

    await pool.execute(
      `INSERT INTO order_files (order_id, file_type, file_name, file_path, file_size, mime_type, description, uploaded_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderId, fileType, req.file.originalname, filePath + req.file.filename, req.file.size, req.file.mimetype, req.body.description || '', req.user.id]
    );

    res.json({ code: 200, message: '文件上传成功' });
  } catch (error) {
    console.error('[Order] 文件上传错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// GET /api/orders/:id/files — 文件列表
async function listFiles(req, res) {
  try {
    const [files] = await pool.execute(
      'SELECT * FROM order_files WHERE order_id = ? ORDER BY file_type, id',
      [req.params.id]
    );
    res.json({ code: 200, data: files });
  } catch (error) {
    console.error('[Order] 文件列表错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// DELETE /api/orders/:id/files/:fileId
async function deleteFile(req, res) {
  try {
    const [files] = await pool.execute('SELECT * FROM order_files WHERE id = ? AND order_id = ?', [req.params.fileId, req.params.id]);
    if (files.length === 0) return res.status(404).json({ code: 404, message: '文件不存在' });

    const fp = path.join(__dirname, '..', files[0].file_path);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);

    await pool.execute('DELETE FROM order_files WHERE id = ?', [req.params.fileId]);
    res.json({ code: 200, message: '文件已删除' });
  } catch (error) {
    console.error('[Order] 文件删除错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

module.exports = { listOrders, todayCount, salesStats, getOrder, createOrder, updateOrder, updateStatus, deleteOrder,
                   uploadFile, listFiles, deleteFile };
