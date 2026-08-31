const Crop = require('../models/Crop');

const getCrops = async (req, res) => {
    try {
        const userId = req.query.userId;
        const query = userId ? { userId } : {};
        const crops = await Crop.find(query).populate('farmId').sort({ createdAt: -1 });
        res.status(200).json(crops);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching crops', error: error.message });
    }
};

const createCrop = async (req, res) => {
    try {
        const { userId, farmId, cropName, cropType, sowingTime, harvestingTime, status } = req.body;
        if (!userId || !cropName || !cropType || !sowingTime || !harvestingTime) {
            return res.status(400).json({ message: 'userId, cropName, cropType, sowingTime, and harvestingTime are required' });
        }
        const crop = new Crop({ userId, farmId, cropName, cropType, sowingTime, harvestingTime, status });
        await crop.save();
        res.status(201).json({ message: 'Crop recorded successfully', crop });
    } catch (error) {
        res.status(500).json({ message: 'Error creating crop record', error: error.message });
    }
};

const updateCrop = async (req, res) => {
    try {
        const { id } = req.params;
        const { cropName, cropType, sowingTime, harvestingTime, status } = req.body;
        const updatedCrop = await Crop.findByIdAndUpdate(
            id,
            { cropName, cropType, sowingTime, harvestingTime, status },
            { new: true }
        );
        res.status(200).json({ message: 'Crop updated successfully', crop: updatedCrop });
    } catch (error) {
        res.status(500).json({ message: 'Error updating crop', error: error.message });
    }
};

const deleteCrop = async (req, res) => {
    try {
        const { id } = req.params;
        await Crop.findByIdAndDelete(id);
        res.status(200).json({ message: 'Crop deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting crop', error: error.message });
    }
};

module.exports = { getCrops, createCrop, updateCrop, deleteCrop };
