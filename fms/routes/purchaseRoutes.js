const express = require('express');
const router = express.Router();
const { listPurchases, getPurchase, createPurchase, updatePurchaseStatus, deletePurchase,
        listSuppliers, createSupplier, updateSupplier, deleteSupplier } = require('../controllers/purchaseController');
const { verifyToken, verifyPermission } = require('../middleware/auth');

router.use(verifyToken);
router.use(verifyPermission('purchase_management'));

// 采购单
router.get('/', listPurchases);
router.get('/:id', getPurchase);
router.post('/', createPurchase);
router.put('/:id/status', updatePurchaseStatus);
router.delete('/:id', deletePurchase);

// 供应商
router.get('/suppliers/list', listSuppliers);
router.post('/suppliers', createSupplier);
router.put('/suppliers/:id', updateSupplier);
router.delete('/suppliers/:id', deleteSupplier);

module.exports = router;
