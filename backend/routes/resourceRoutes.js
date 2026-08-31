const express = require('express');
const router = express.Router();
const { getResourceLogs, createResourceLog, deleteResourceLog } = require('../controllers/resourceController');

router.get('/', getResourceLogs);
router.post('/', createResourceLog);
router.delete('/:id', deleteResourceLog);

module.exports = router;
