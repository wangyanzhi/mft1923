const express = require('express');
const router = express.Router();
const { login, register, getCurrentUser, updatePassword } = require('../controllers/authController');
const { verifyToken, verifyPermission } = require('../middleware/auth');

// 登录（无需认证）
router.post('/login', login);

// 以下需要认证
router.post('/register', verifyToken, verifyPermission('user_management'), register);
router.get('/me', verifyToken, getCurrentUser);
router.put('/password', verifyToken, updatePassword);

module.exports = router;
