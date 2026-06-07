const express = require('express');
const router = express.Router();
const { listOrders, todayCount, salesStats, getOrder, createOrder, updateOrder, updateStatus, deleteOrder,
        uploadFile, listFiles, deleteFile } = require('../controllers/orderController');
const { verifyToken, verifyPermission } = require('../middleware/auth');
const { uploadDocument, uploadShipment } = require('../middleware/upload');

router.use(verifyToken);
router.use(verifyPermission('order_management'));

// 订单 CRUD
router.get('/', listOrders);
router.get('/today-count', todayCount);
router.get('/stats/sales', salesStats);
router.get('/:id', getOrder);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.put('/:id/status', updateStatus);
router.delete('/:id', deleteOrder);

// 订单文件
router.post('/:id/files', (req, res, next) => {
  const uploader = req.body.file_type === '发货图片' ? uploadShipment : uploadDocument;
  uploader.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ code: 400, message: err.message });
    next();
  });
}, uploadFile);
router.get('/:id/files', listFiles);
router.delete('/:id/files/:fileId', deleteFile);

module.exports = router;
