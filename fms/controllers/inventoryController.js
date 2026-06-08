const { pool } = require('../config/db');
const { logOperation } = require('../services/operationLogService');

// ============================================================
// 库存查询
// ============================================================

// GET /api/inventory — 库存列表
async function listInventory(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const productId = req.query.product_id;
    const binId = req.query.bin_id;
    const search = req.query.search || '';
    const alertOnly = req.query.alert_only === '1';

    const conditions = [];
    const params = [];
    if (productId) { conditions.push('i.product_id = ?'); params.push(productId); }
    if (binId) { conditions.push('i.bin_id = ?'); params.push(binId); }
    if (search) { conditions.push('(p.model LIKE ? OR i.batch_number LIKE ?)'); params.push(`%${search}%`, `%${search}%`); }
    if (alertOnly) { conditions.push('i.quantity <= i.min_stock AND i.quantity > 0'); }
    const where = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

    const [countResult] = await pool.execute(`SELECT COUNT(*) AS total FROM inventory i JOIN products p ON i.product_id = p.id ${where}`, params);
    const total = countResult[0].total;

    const [rows] = await pool.execute(
      `SELECT i.id, i.product_id, p.model AS product_model, p.unit,
              i.batch_number, i.quantity, i.unit_price, i.min_stock,
              i.bin_id, b.bin_number, b.location AS bin_location,
              c.name AS category_name, i.last_updated_at
       FROM inventory i
       JOIN products p ON i.product_id = p.id
       JOIN categories c ON p.category_id = c.id
       LEFT JOIN bins b ON i.bin_id = b.id
       ${where}
       ORDER BY i.quantity <= i.min_stock AND i.quantity > 0 DESC, i.id ASC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({ code: 200, data: { list: rows, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
  } catch (error) {
    console.error('[Inv] 列表错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// GET /api/inventory/alerts — 库存预警列表
async function listAlerts(req, res) {
  try {
    const [rows] = await pool.execute(
      `SELECT i.id, p.model AS product_model, i.batch_number, i.quantity, i.min_stock,
              b.bin_number, b.location AS bin_location
       FROM inventory i JOIN products p ON i.product_id = p.id
       LEFT JOIN bins b ON i.bin_id = b.id
       WHERE i.quantity <= i.min_stock AND i.quantity > 0
       ORDER BY i.quantity ASC`
    );
    res.json({ code: 200, data: rows });
  } catch (error) {
    console.error('[Inv] 预警错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// GET /api/inventory/history — 变动历史
async function listHistory(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const offset = (page - 1) * limit;
    const productId = req.query.product_id;

    let where = '', params = [];
    if (productId) { where = 'WHERE h.product_id = ?'; params.push(productId); }

    const [countResult] = await pool.execute(`SELECT COUNT(*) AS total FROM inventory_history h ${where}`, params);
    const total = countResult[0].total;

    const [rows] = await pool.execute(
      `SELECT h.*, p.model AS product_model, u.name AS operator_name
       FROM inventory_history h
       JOIN products p ON h.product_id = p.id
       LEFT JOIN users u ON h.created_by = u.id
       ${where}
       ORDER BY h.id DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({ code: 200, data: { list: rows, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
  } catch (error) {
    console.error('[Inv] 历史错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// GET /api/inventory/batch-numbers/:productId
async function listBatchNumbers(req, res) {
  try {
    const [rows] = await pool.execute(
      'SELECT id, batch_number, quantity, bin_id FROM inventory WHERE product_id = ? AND quantity > 0 ORDER BY batch_number',
      [req.params.productId]
    );
    res.json({ code: 200, data: rows });
  } catch (error) {
    console.error('[Inv] 批号错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// GET /api/inventory/search-suggestions
async function searchSuggestions(req, res) {
  try {
    const q = req.query.q || '';
    const [rows] = await pool.execute(
      `SELECT DISTINCT p.id, p.model, p.unit FROM products p
       JOIN inventory i ON i.product_id = p.id
       WHERE p.model LIKE ? AND i.quantity > 0 LIMIT 10`,
      [`%${q}%`]
    );
    res.json({ code: 200, data: rows });
  } catch (error) {
    console.error('[Inv] 搜索错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// ============================================================
// 库存操作（入库/出库/调整）
// ============================================================

// POST /api/inventory/in — 入库
async function stockIn(req, res) {
  const conn = await pool.getConnection();
  try {
    const { product_id, batch_number, bin_id, quantity, unit_price } = req.body;
    if (!product_id || !batch_number || !quantity || quantity < 0.1) {
      conn.release(); return res.status(400).json({ code: 400, message: '产品、批号、数量（≥0.1）为必填项' });
    }

    // 验证箱号
    if (bin_id) {
      const [bins] = await conn.execute('SELECT id, status FROM bins WHERE id = ?', [bin_id]);
      if (bins.length === 0) { conn.release(); return res.status(400).json({ code: 400, message: '箱号不存在' }); }
      if (bins[0].status !== '启用') { conn.release(); return res.status(400).json({ code: 400, message: '该箱号已停用' }); }
    }

    await conn.beginTransaction();

    // 查询现有库存（加行锁）
    const [existing] = await conn.execute(
      'SELECT id, quantity FROM inventory WHERE product_id = ? AND batch_number = ? FOR UPDATE',
      [product_id, batch_number]
    );

    let inventoryId;
    const qtyBefore = existing.length > 0 ? existing[0].quantity : 0;
    const qtyAfter = qtyBefore + parseFloat(quantity);

    if (existing.length > 0) {
      inventoryId = existing[0].id;
      await conn.execute(
        'UPDATE inventory SET quantity = ?, unit_price = ?, bin_id = COALESCE(?, bin_id), last_updated_at = NOW() WHERE id = ?',
        [qtyAfter, unit_price || 0, bin_id || null, inventoryId]
      );
    } else {
      const [result] = await conn.execute(
        'INSERT INTO inventory (product_id, batch_number, bin_id, quantity, unit_price) VALUES (?, ?, ?, ?, ?)',
        [product_id, batch_number, bin_id || null, quantity, unit_price || 0]
      );
      inventoryId = result.insertId;
    }

    // 记录历史
    await conn.execute(
      `INSERT INTO inventory_history (inventory_id, product_id, batch_number, change_type, quantity_before, quantity_change, quantity_after, reference_type, notes, created_by)
       VALUES (?, ?, ?, '入库', ?, ?, ?, 'manual', ?, ?)`,
      [inventoryId, product_id, batch_number, qtyBefore, quantity, qtyAfter, '手动入库', req.user.id]
    );

    await conn.commit();

    await logOperation({ user_id: req.user.id, action: '库存入库', target_type: 'inventory', target_id: inventoryId, details: { product_id, batch_number, quantity, bin_id }, ip_address: req.ip, user_agent: req.headers['user-agent'] });

    res.json({ code: 200, message: '入库成功', data: { inventory_id: inventoryId, quantity_after: qtyAfter } });
  } catch (error) {
    await conn.rollback();
    console.error('[Inv] 入库错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  } finally { conn.release(); }
}

// POST /api/inventory/out — 出库
async function stockOut(req, res) {
  const conn = await pool.getConnection();
  try {
    const { product_id, batch_number, quantity, notes } = req.body;
    if (!product_id || !batch_number || !quantity || quantity < 0.1) {
      conn.release(); return res.status(400).json({ code: 400, message: '产品、批号、数量（≥0.1）为必填项' });
    }

    await conn.beginTransaction();

    const [existing] = await conn.execute(
      'SELECT id, quantity FROM inventory WHERE product_id = ? AND batch_number = ? FOR UPDATE',
      [product_id, batch_number]
    );

    if (existing.length === 0) {
      await conn.rollback(); conn.release();
      return res.status(400).json({ code: 400, message: '该批次库存不存在' });
    }

    const qtyBefore = existing[0].quantity;
    const qtyAfter = qtyBefore - parseFloat(quantity);
    if (qtyAfter < 0) {
      await conn.rollback(); conn.release();
      return res.status(400).json({ code: 400, message: `库存不足（当前: ${qtyBefore}，需要: ${quantity}）` });
    }

    await conn.execute('UPDATE inventory SET quantity = ?, last_updated_at = NOW() WHERE id = ?', [qtyAfter, existing[0].id]);

    await conn.execute(
      `INSERT INTO inventory_history (inventory_id, product_id, batch_number, change_type, quantity_before, quantity_change, quantity_after, reference_type, notes, created_by)
       VALUES (?, ?, ?, '出库', ?, ?, ?, 'manual', ?, ?)`,
      [existing[0].id, product_id, batch_number, qtyBefore, -parseFloat(quantity), qtyAfter, '手动出库', notes || '', req.user.id]
    );

    await conn.commit();

    await logOperation({ user_id: req.user.id, action: '库存出库', target_type: 'inventory', target_id: existing[0].id, details: { product_id, batch_number, quantity }, ip_address: req.ip, user_agent: req.headers['user-agent'] });

    res.json({ code: 200, message: '出库成功', data: { inventory_id: existing[0].id, quantity_after: qtyAfter } });
  } catch (error) {
    await conn.rollback();
    console.error('[Inv] 出库错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  } finally { conn.release(); }
}

// PUT /api/inventory/adjust — 库存调整
async function stockAdjust(req, res) {
  const conn = await pool.getConnection();
  try {
    const { inventory_id, new_quantity, notes } = req.body;
    if (!inventory_id || new_quantity === undefined || new_quantity < 0) {
      conn.release(); return res.status(400).json({ code: 400, message: '库存ID和新数量为必填项' });
    }

    await conn.beginTransaction();

    const [existing] = await conn.execute('SELECT id, product_id, batch_number, quantity FROM inventory WHERE id = ? FOR UPDATE', [inventory_id]);
    if (existing.length === 0) { await conn.rollback(); conn.release(); return res.status(404).json({ code: 404, message: '库存记录不存在' }); }

    const qtyBefore = existing[0].quantity;
    const change = parseFloat(new_quantity) - qtyBefore;

    await conn.execute('UPDATE inventory SET quantity = ?, last_updated_at = NOW() WHERE id = ?', [new_quantity, inventory_id]);
    await conn.execute(
      `INSERT INTO inventory_history (inventory_id, product_id, batch_number, change_type, quantity_before, quantity_change, quantity_after, reference_type, notes, created_by)
       VALUES (?, ?, ?, '调整', ?, ?, ?, 'manual', ?, ?)`,
      [inventory_id, existing[0].product_id, existing[0].batch_number, qtyBefore, change, new_quantity, '手动调整', notes || '', req.user.id]
    );

    await conn.commit();
    res.json({ code: 200, message: '调整成功', data: { inventory_id, quantity_after: parseFloat(new_quantity) } });
  } catch (error) {
    await conn.rollback();
    console.error('[Inv] 调整错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  } finally { conn.release(); }
}

// ============================================================
// 入库单管理
// ============================================================

// POST /api/inventory/stock-in-orders — 创建入库单
async function createStockInOrder(req, res) {
  try {
    const { items, notes } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ code: 400, message: '请添加入库产品明细' });
    }

    const orderNumber = 'SI-' + Date.now().toString(36).toUpperCase();

    const [result] = await pool.execute(
      'INSERT INTO stock_in_orders (order_number, user_id, notes) VALUES (?, ?, ?)',
      [orderNumber, req.user.id, notes || '']
    );
    const orderId = result.insertId;

    for (const item of items) {
      await pool.execute(
        'INSERT INTO stock_in_order_items (stock_in_order_id, product_id, batch_number, bin_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [orderId, item.product_id, item.batch_number, item.bin_id || null, item.quantity, item.unit_price || 0, (item.quantity || 0) * (item.unit_price || 0)]
      );
    }

    await logOperation({ user_id: req.user.id, action: '创建入库单', target_type: 'stock_in_order', target_id: orderId, details: { order_number: orderNumber, items_count: items.length }, ip_address: req.ip, user_agent: req.headers['user-agent'] });

    res.status(201).json({ code: 201, message: '入库单创建成功', data: { id: orderId, order_number: orderNumber } });
  } catch (error) {
    console.error('[Inv] 创建入库单错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// GET /api/inventory/stock-in-orders — 入库单列表
async function listStockInOrders(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const offset = (page - 1) * limit;
    const status = req.query.status || '';

    let where = '', params = [];
    if (status) { where = 'WHERE s.status = ?'; params.push(status); }

    const [countResult] = await pool.execute(`SELECT COUNT(*) AS total FROM stock_in_orders s ${where}`, params);
    const total = countResult[0].total;

    const [rows] = await pool.execute(
      `SELECT s.*, u.name AS operator_name,
              (SELECT COUNT(*) FROM stock_in_order_items WHERE stock_in_order_id = s.id) AS item_count
       FROM stock_in_orders s
       LEFT JOIN users u ON s.user_id = u.id
       ${where}
       ORDER BY s.id DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({ code: 200, data: { list: rows, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
  } catch (error) {
    console.error('[Inv] 入库单列表错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// GET /api/inventory/stock-in-orders/:id — 入库单详情
async function getStockInOrder(req, res) {
  try {
    const [orders] = await pool.execute(
      `SELECT s.*, u.name AS operator_name FROM stock_in_orders s LEFT JOIN users u ON s.user_id = u.id WHERE s.id = ?`,
      [req.params.id]
    );
    if (orders.length === 0) return res.status(404).json({ code: 404, message: '入库单不存在' });

    const [items] = await pool.execute(
      `SELECT si.*, p.model AS product_model, b.bin_number, b.location AS bin_location
       FROM stock_in_order_items si
       JOIN products p ON si.product_id = p.id
       LEFT JOIN bins b ON si.bin_id = b.id
       WHERE si.stock_in_order_id = ?`,
      [req.params.id]
    );

    res.json({ code: 200, data: { ...orders[0], items } });
  } catch (error) {
    console.error('[Inv] 入库单详情错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// PUT /api/inventory/stock-in-orders/:id/approve — 审批入库
async function approveStockInOrder(req, res) {
  const conn = await pool.getConnection();
  try {
    const orderId = parseInt(req.params.id);
    const [orders] = await conn.execute('SELECT * FROM stock_in_orders WHERE id = ?', [orderId]);
    if (orders.length === 0) { conn.release(); return res.status(404).json({ code: 404, message: '入库单不存在' }); }
    if (orders[0].status !== '草稿') { conn.release(); return res.status(400).json({ code: 400, message: '仅草稿状态可审批' }); }

    const [items] = await conn.execute('SELECT * FROM stock_in_order_items WHERE stock_in_order_id = ?', [orderId]);

    await conn.beginTransaction();

    for (const item of items) {
      // 验证箱号
      if (item.bin_id) {
        const [bins] = await conn.execute('SELECT status FROM bins WHERE id = ?', [item.bin_id]);
        if (bins.length === 0 || bins[0].status !== '启用') { await conn.rollback(); conn.release(); return res.status(400).json({ code: 400, message: `箱号不可用（明细ID: ${item.id}）` }); }
      }

      // 安全库存默认值
      const minStock = 10;

      const [existing] = await conn.execute(
        'SELECT id, quantity FROM inventory WHERE product_id = ? AND batch_number = ? FOR UPDATE',
        [item.product_id, item.batch_number]
      );

      const qtyBefore = existing.length > 0 ? parseFloat(existing[0].quantity) : 0;
      const qtyAfter = qtyBefore + parseFloat(item.quantity);

      let inventoryId;
      if (existing.length > 0) {
        inventoryId = existing[0].id;
        await conn.execute('UPDATE inventory SET quantity = ?, unit_price = ?, bin_id = COALESCE(?, bin_id), last_updated_at = NOW() WHERE id = ?',
          [qtyAfter, parseFloat(item.unit_price), item.bin_id || null, inventoryId]);
      } else {
        const [result] = await conn.execute(
          'INSERT INTO inventory (product_id, batch_number, bin_id, quantity, unit_price, min_stock) VALUES (?, ?, ?, ?, ?, ?)',
          [item.product_id, item.batch_number, item.bin_id || null, parseFloat(item.quantity), parseFloat(item.unit_price), minStock]
        );
        inventoryId = result.insertId;
      }

      await conn.execute(
        `INSERT INTO inventory_history (inventory_id, product_id, batch_number, change_type, quantity_before, quantity_change, quantity_after, reference_type, reference_id, created_by)
         VALUES (?, ?, ?, '入库审批', ?, ?, ?, 'stock_in_order', ?, ?)`,
        [inventoryId, item.product_id, item.batch_number, qtyBefore, parseFloat(item.quantity), qtyAfter, orderId, req.user.id]
      );
    }

    await conn.execute("UPDATE stock_in_orders SET status = '已审批', updated_at = NOW() WHERE id = ?", [orderId]);
    await conn.commit();

    await logOperation({ user_id: req.user.id, action: '审批入库单', target_type: 'stock_in_order', target_id: orderId, details: { items_count: items.length }, ip_address: req.ip, user_agent: req.headers['user-agent'] });

    res.json({ code: 200, message: '入库单审批通过，库存已更新' });
  } catch (error) {
    await conn.rollback();
    console.error('[Inv] 审批错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  } finally { conn.release(); }
}

// PUT /api/inventory/stock-in-orders/:id/cancel — 取消入库单
async function cancelStockInOrder(req, res) {
  try {
    const [orders] = await pool.execute('SELECT * FROM stock_in_orders WHERE id = ?', [req.params.id]);
    if (orders.length === 0) return res.status(404).json({ code: 404, message: '入库单不存在' });
    if (orders[0].status !== '草稿') return res.status(400).json({ code: 400, message: '仅草稿状态可取消' });

    await pool.execute("UPDATE stock_in_orders SET status = '已取消', updated_at = NOW() WHERE id = ?", [req.params.id]);
    res.json({ code: 200, message: '入库单已取消' });
  } catch (error) {
    console.error('[Inv] 取消错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

module.exports = { listInventory, listAlerts, listHistory, listBatchNumbers, searchSuggestions,
                   stockIn, stockOut, stockAdjust,
                   createStockInOrder, listStockInOrders, getStockInOrder, approveStockInOrder, cancelStockInOrder };
