const { pool } = require('../config/db');
const { logOperation } = require('../services/operationLogService');
const fs = require('fs');
const path = require('path');

// ============================================================
// 产品 CRUD
// ============================================================

async function listProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const categoryId = req.query.category_id;
    const search = req.query.search || '';
    const status = req.query.status;

    const conditions = [];
    const params = [];

    if (categoryId) { conditions.push('p.category_id = ?'); params.push(categoryId); }
    if (status) { conditions.push('p.status = ?'); params.push(status); }
    if (search) { conditions.push('(p.model LIKE ? OR p.description LIKE ?)'); params.push(`%${search}%`, `%${search}%`); }

    const where = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

    const [countResult] = await pool.execute(
      `SELECT COUNT(*) AS total FROM products p ${where}`, params
    );
    const total = countResult[0].total;

    const [products] = await pool.execute(
      `SELECT p.id, p.model, p.description, p.price, p.cost_price, p.unit, p.image_url,
              p.status, p.created_at, p.updated_at,
              c.id AS category_id, c.name AS category_name
       FROM products p
       JOIN categories c ON p.category_id = c.id
       ${where}
       ORDER BY p.id DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      code: 200,
      data: { list: products, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
    });
  } catch (error) {
    console.error('[Product] 列表错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

async function getProduct(req, res) {
  try {
    const [products] = await pool.execute(
      `SELECT p.*, c.name AS category_name
       FROM products p JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`, [req.params.id]
    );
    if (products.length === 0) return res.status(404).json({ code: 404, message: '产品不存在' });
    res.json({ code: 200, data: products[0] });
  } catch (error) {
    console.error('[Product] 详情错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

async function createProduct(req, res) {
  try {
    const { model, description, category_id, price, cost_price, unit } = req.body;

    if (!model || !category_id || price === undefined) {
      return res.status(400).json({ code: 400, message: '型号、分类和价格为必填项' });
    }

    // 检查型号唯一
    const [dup] = await pool.execute('SELECT id FROM products WHERE model = ?', [model]);
    if (dup.length > 0) return res.status(400).json({ code: 400, message: '产品型号已存在' });

    const imageUrl = req.file ? '/uploads/products/' + req.file.filename : null;

    const [result] = await pool.execute(
      `INSERT INTO products (model, description, category_id, price, cost_price, unit, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [model, description || '', category_id, price, cost_price || 0, unit || 'pcs', imageUrl]
    );

    await logOperation({
      user_id: req.user.id, action: '创建产品', target_type: 'product',
      target_id: result.insertId, details: { model },
      ip_address: req.ip, user_agent: req.headers['user-agent'],
    });

    res.status(201).json({ code: 201, message: '产品创建成功', data: { id: result.insertId } });
  } catch (error) {
    console.error('[Product] 创建错误:', error);
    if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ code: 400, message: '产品型号已存在' });
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { model, description, category_id, price, cost_price, unit, status } = req.body;

    const [existing] = await pool.execute('SELECT id FROM products WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ code: 404, message: '产品不存在' });

    if (model) {
      const [dup] = await pool.execute('SELECT id FROM products WHERE model = ? AND id != ?', [model, id]);
      if (dup.length > 0) return res.status(400).json({ code: 400, message: '产品型号已存在' });
    }

    const imageUrl = req.file ? '/uploads/products/' + req.file.filename : undefined;

    const fields = [], params = [];
    if (model !== undefined) { fields.push('model = ?'); params.push(model); }
    if (description !== undefined) { fields.push('description = ?'); params.push(description); }
    if (category_id !== undefined) { fields.push('category_id = ?'); params.push(category_id); }
    if (price !== undefined) { fields.push('price = ?'); params.push(price); }
    if (cost_price !== undefined) { fields.push('cost_price = ?'); params.push(cost_price); }
    if (unit !== undefined) { fields.push('unit = ?'); params.push(unit); }
    if (status !== undefined) { fields.push('status = ?'); params.push(status); }
    if (imageUrl !== undefined) { fields.push('image_url = ?'); params.push(imageUrl); }

    if (fields.length > 0) {
      params.push(id);
      await pool.execute(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, params);
    }

    await logOperation({
      user_id: req.user.id, action: '更新产品', target_type: 'product',
      target_id: parseInt(id), details: { model },
      ip_address: req.ip, user_agent: req.headers['user-agent'],
    });

    res.json({ code: 200, message: '产品更新成功' });
  } catch (error) {
    console.error('[Product] 更新错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

async function deleteProduct(req, res) {
  try {
    const [existing] = await pool.execute('SELECT id, model, image_url FROM products WHERE id = ?', [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ code: 404, message: '产品不存在' });

    // 检查是否有库存
    const [inv] = await pool.execute('SELECT COUNT(*) AS cnt FROM inventory WHERE product_id = ?', [req.params.id]);
    if (inv[0].cnt > 0) {
      return res.status(400).json({ code: 400, message: `该产品还有 ${inv[0].cnt} 条库存记录，请先清空库存` });
    }

    // 删除图片文件
    if (existing[0].image_url) {
      const filePath = path.join(__dirname, '..', existing[0].image_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await pool.execute('DELETE FROM products WHERE id = ?', [req.params.id]);

    await logOperation({
      user_id: req.user.id, action: '删除产品', target_type: 'product',
      target_id: parseInt(req.params.id), details: { model: existing[0].model },
      ip_address: req.ip, user_agent: req.headers['user-agent'],
    });

    res.json({ code: 200, message: '产品已删除' });
  } catch (error) {
    console.error('[Product] 删除错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// ============================================================
// 分类 CRUD
// ============================================================

async function listCategories(req, res) {
  try {
    const [cats] = await pool.execute(
      `SELECT c.*, COUNT(p.id) AS product_count
       FROM categories c LEFT JOIN products p ON c.id = p.category_id
       GROUP BY c.id ORDER BY c.id`
    );
    res.json({ code: 200, data: cats });
  } catch (error) {
    console.error('[Product] 分类列表错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

async function createCategory(req, res) {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ code: 400, message: '分类名称为必填项' });

    const [dup] = await pool.execute('SELECT id FROM categories WHERE name = ?', [name]);
    if (dup.length > 0) return res.status(400).json({ code: 400, message: '分类名称已存在' });

    const [result] = await pool.execute(
      'INSERT INTO categories (name, description) VALUES (?, ?)', [name, description || '']
    );
    res.status(201).json({ code: 201, message: '分类创建成功', data: { id: result.insertId } });
  } catch (error) {
    console.error('[Product] 分类创建错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

async function updateCategory(req, res) {
  try {
    const { name, description } = req.body;
    const [existing] = await pool.execute('SELECT id FROM categories WHERE id = ?', [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ code: 404, message: '分类不存在' });

    const fields = [], params = [];
    if (name !== undefined) { fields.push('name = ?'); params.push(name); }
    if (description !== undefined) { fields.push('description = ?'); params.push(description); }
    if (fields.length > 0) {
      params.push(req.params.id);
      await pool.execute(`UPDATE categories SET ${fields.join(', ')} WHERE id = ?`, params);
    }
    res.json({ code: 200, message: '分类更新成功' });
  } catch (error) {
    console.error('[Product] 分类更新错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

async function deleteCategory(req, res) {
  try {
    const [existing] = await pool.execute('SELECT id, name FROM categories WHERE id = ?', [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ code: 404, message: '分类不存在' });

    const [prods] = await pool.execute('SELECT COUNT(*) AS cnt FROM products WHERE category_id = ?', [req.params.id]);
    if (prods[0].cnt > 0) {
      return res.status(400).json({ code: 400, message: `该分类下还有 ${prods[0].cnt} 个产品，请先删除或转移产品` });
    }

    await pool.execute('DELETE FROM categories WHERE id = ?', [req.params.id]);
    res.json({ code: 200, message: '分类已删除' });
  } catch (error) {
    console.error('[Product] 分类删除错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

module.exports = { listProducts, getProduct, createProduct, updateProduct, deleteProduct,
                   listCategories, createCategory, updateCategory, deleteCategory };
