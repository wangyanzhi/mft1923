const express = require('express');
const router = express.Router();
const { listProducts, getProduct, createProduct, updateProduct, deleteProduct,
        listCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/productController');
const { verifyToken, verifyPermission } = require('../middleware/auth');
const { uploadProduct } = require('../middleware/upload');

// 产品列表和详情公开可读
router.get('/', listProducts);
router.get('/categories/list', listCategories);
router.get('/:id', getProduct);

// 写操作需要 product_management 权限
router.post('/', verifyToken, verifyPermission('product_management'), uploadProduct.single('image'), createProduct);
router.put('/:id', verifyToken, verifyPermission('product_management'), uploadProduct.single('image'), updateProduct);
router.delete('/:id', verifyToken, verifyPermission('product_management'), deleteProduct);

// 分类管理
router.post('/categories', verifyToken, verifyPermission('product_management'), createCategory);
router.put('/categories/:id', verifyToken, verifyPermission('product_management'), updateCategory);
router.delete('/categories/:id', verifyToken, verifyPermission('product_management'), deleteCategory);

module.exports = router;
