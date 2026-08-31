const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, toggleApproveUser, deleteUser } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.put('/users/:id/approve', toggleApproveUser);
router.delete('/users/:id', deleteUser);

module.exports = router;