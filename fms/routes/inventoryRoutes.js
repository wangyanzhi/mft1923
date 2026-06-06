const express = require('express');
const router = express.Router();
const { listInventory, listAlerts, listHistory, listBatchNumbers, searchSuggestions,
        stockIn, stockOut, stockAdjust,
        createStockInOrder, listStockInOrders, getStockInOrder, approveStockInOrder, cancelStockInOrder } = require('../controllers/inventoryController');
const { verifyToken, verifyPermission } = require('../middleware/auth');

router.use(verifyToken);
router.use(verifyPermission('inventory_management'));

// 库存查询
router.get('/', listInventory);
router.get('/alerts', listAlerts);
router.get('/history', listHistory);
router.get('/batch-numbers/:productId', listBatchNumbers);
router.get('/search-suggestions', searchSuggestions);

// 库存操作
router.post('/in', stockIn);
router.post('/out', stockOut);
router.put('/adjust', stockAdjust);

// 入库单
router.post('/stock-in-orders', createStockInOrder);
router.get('/stock-in-orders', listStockInOrders);
router.get('/stock-in-orders/:id', getStockInOrder);
router.put('/stock-in-orders/:id/approve', approveStockInOrder);
router.put('/stock-in-orders/:id/cancel', cancelStockInOrder);

module.exports = router;
