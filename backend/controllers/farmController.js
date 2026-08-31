const Farm = require('../models/Farm');

const getFarms = async (req, res) => {
    try {
        const userId = req.query.userId || req.user?.id;
        const query = userId ? { userId } : {};
        const farms = await Farm.find(query).sort({ createdAt: -1 });
        res.status(200).json(farms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching farms', error: error.message });
    }
};

const createFarm = async (req, res) => {
    try {
        const { userId, farmName, farmSize, location } = req.body;
        if (!userId || !farmName || !farmSize) {
            return res.status(400).json({ message: 'userId, farmName, and farmSize are required' });
        }
        const farm = new Farm({ userId, farmName, farmSize, location });
        await farm.save();
        res.status(201).json({ message: 'Farm created successfully', farm });
    } catch (error) {
        res.status(500).json({ message: 'Error creating farm', error: error.message });
    }
};

const updateFarm = async (req, res) => {
    try {
        const { id } = req.params;
        const { farmName, farmSize, location } = req.body;
        const updatedFarm = await Farm.findByIdAndUpdate(
            id,
            { farmName, farmSize, location },
            { new: true }
        );
        res.status(200).json({ message: 'Farm updated successfully', farm: updatedFarm });
    } catch (error) {
        res.status(500).json({ message: 'Error updating farm', error: error.message });
    }
};

const deleteFarm = async (req, res) => {
    try {
        const { id } = req.params;
        await Farm.findByIdAndDelete(id);
        res.status(200).json({ message: 'Farm deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting farm', error: error.message });
    }
};

module.exports = { getFarms, createFarm, updateFarm, deleteFarm };
