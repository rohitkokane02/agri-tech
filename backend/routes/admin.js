const express = require('express');
const router = express.Router();
const { getSystemAnalytics, verifyUserAccount, getAllUsersAdmin } = require('../controllers/adminController');
const { authMiddleware, requireAdmin } = require('../middleware/authMiddleware');

router.get('/analytics', authMiddleware, requireAdmin, getSystemAnalytics);
router.get('/users', authMiddleware, requireAdmin, getAllUsersAdmin);
router.put('/users/:id/verify', authMiddleware, requireAdmin, verifyUserAccount);

module.exports = router;
