const express = require('express');
const router = express.Router();
const { addWeather, getWeather } = require('../controllers/weatherController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, addWeather);

router.get('/', verifyToken, getWeather);

module.exports = router;