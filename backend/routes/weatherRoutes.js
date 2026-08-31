const express = require('express');
const router = express.Router();
const { addWeather, getWeather } = require('../controllers/weatherController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addWeather);
router.get('/', authMiddleware, getWeather);

module.exports = router;