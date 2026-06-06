const express = require('express');
const router = express.Router();
const { listUsers, getUser, updateUser, deleteUser, listRoles, listPermissions } = require('../controllers/userController');
const { verifyToken, verifyPermission } = require('../middleware/auth');

// 所有用户路由都需要认证 + user_management 权限
router.use(verifyToken);
router.use(verifyPermission('user_management'));

router.get('/', listUsers);
router.get('/roles/list', listRoles);
router.get('/permissions/list', listPermissions);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
