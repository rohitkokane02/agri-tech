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
        required: true 
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
        default: 'Active' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Crop', cropSchema);
