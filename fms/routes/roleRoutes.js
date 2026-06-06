const express = require('express');
const router = express.Router();
const { listRoles, getRole, createRole, updateRole, deleteRole, listAllPermissions } = require('../controllers/roleController');
const { verifyToken, verifyPermission } = require('../middleware/auth');

router.use(verifyToken);
router.use(verifyPermission('user_management'));

router.get('/permissions/all', listAllPermissions);
router.get('/', listRoles);
router.get('/:id', getRole);
router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

module.exports = router;
