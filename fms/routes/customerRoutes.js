const express = require('express');
const router = express.Router();
const { listCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const { verifyToken, verifyPermission } = require('../middleware/auth');

router.get('/', verifyToken, listCustomers);
router.get('/:id', verifyToken, getCustomer);
router.post('/', verifyToken, verifyPermission('customer_management'), createCustomer);
router.put('/:id', verifyToken, verifyPermission('customer_management'), updateCustomer);
router.delete('/:id', verifyToken, verifyPermission('customer_management'), deleteCustomer);

module.exports = router;
