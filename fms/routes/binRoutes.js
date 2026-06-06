const express = require('express');
const router = express.Router();
const { listBins, getBin, getBinProducts, createBin, updateBin, deleteBin } = require('../controllers/binController');
const { verifyToken, verifyPermission } = require('../middleware/auth');

router.use(verifyToken);
router.use(verifyPermission('inventory_management'));

router.get('/', listBins);
router.get('/:id', getBin);
router.get('/:id/products', getBinProducts);
router.post('/', createBin);
router.put('/:id', updateBin);
router.delete('/:id', deleteBin);

module.exports = router;
