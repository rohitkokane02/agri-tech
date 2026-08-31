const express = require('express');
const router = express.Router();
const { addSoilReport, getSoilReports } = require('../controllers/soilController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addSoilReport);
router.get('/', authMiddleware, getSoilReports);

module.exports = router;