const express = require('express');
const router = express.Router();
const { getPestAlerts, createPestAlert } = require('../controllers/pestController');

router.get('/', getPestAlerts);
router.post('/', createPestAlert);

module.exports = router;
