const ResourceUsage = require('../models/ResourceUsage');

const getResourceLogs = async (req, res) => {
    try {
        const userId = req.query.userId;
        const query = userId ? { userId } : {};
        const logs = await ResourceUsage.find(query).populate('farmId').sort({ dateUsed: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resource logs', error: error.message });
    }
};

const createResourceLog = async (req, res) => {
    try {
        const { userId, farmId, resourceType, quantity, unit, cost, notes } = req.body;
        if (!userId || !resourceType || !quantity || !unit) {
            return res.status(400).json({ message: 'userId, resourceType, quantity, and unit are required' });
        }
        const log = new ResourceUsage({ userId, farmId, resourceType, quantity, unit, cost: cost || 0, notes });
        await log.save();
        res.status(201).json({ message: 'Resource usage recorded successfully', log });
    } catch (error) {
        res.status(500).json({ message: 'Error recording resource usage', error: error.message });
    }
};

const deleteResourceLog = async (req, res) => {
    try {
        const { id } = req.params;
        await ResourceUsage.findByIdAndDelete(id);
        res.status(200).json({ message: 'Resource log deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting log', error: error.message });
    }
};

module.exports = { getResourceLogs, createResourceLog, deleteResourceLog };
