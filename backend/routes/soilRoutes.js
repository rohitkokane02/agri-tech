const express = require('express');
const router = express.Router();
const { addSoilReport, getSoilReports } = require('../controllers/soilController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, addSoilReport);
router.get('/', verifyToken, getSoilReports);

module.exports = router;