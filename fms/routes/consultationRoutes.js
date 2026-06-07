const express = require('express');
const router = express.Router();
const { listConsultations, getConsultation, createConsultation, updateConsultation, deleteConsultation } = require('../controllers/consultationController');
const { verifyToken, verifyPermission } = require('../middleware/auth');

router.use(verifyToken);
router.get('/', verifyPermission('consultation_management'), listConsultations);
router.get('/:id', verifyPermission('consultation_management'), getConsultation);
router.post('/', verifyPermission('consultation_management'), createConsultation);
router.put('/:id', verifyPermission('consultation_management'), updateConsultation);
router.delete('/:id', verifyPermission('consultation_management'), deleteConsultation);

module.exports = router;
