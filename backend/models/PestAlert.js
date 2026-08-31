const mongoose = require('mongoose');

const pestAlertSchema = new mongoose.Schema({
    cropName: {
        type: String,
        required: true
    },
    pestOrDisease: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },
    symptoms: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    affectedRegion: {
        type: String,
        default: 'General / All Regions'
    },
    dateReported: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PestAlert', pestAlertSchema);
