const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm'
    },
    cropName: {
        type: String,
        required: true
    },
    cropType: {
        type: String,
        required: true // e.g. Kharif, Rabi, Zaid, Cash Crop, Grain, Vegetable
    },
    sowingTime: {
        type: Date,
        required: true
    },
    harvestingTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'Active' // Active, Harvested, Planned
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Crop', cropSchema);
