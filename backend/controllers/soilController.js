const Soil = require('../models/soil');

const addSoilReport = async (req, res) => {
    try {
        const { nitrogen, phosphorus, potassium, phLevel, recommendation } = req.body;

        const newSoil = new Soil({
            nitrogen,
            phosphorus,
            potassium,
            phLevel,
            recommendation,
            userId: req.user.id
        });

        await newSoil.save();
        res.status(201).json({ 
            message: 'Soil report saved successfully!', newSoil 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error saving soil report', 
            error: error.message 
        });
    }
};

const getSoilReports = async (req, res) => {
    try {
        const soilReports = await Soil.find({ userId: req.user.id });
        res.status(200).json(soilReports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching soil reports', error: error.message });
    }
};


module.exports = { addSoilReport, getSoilReports };