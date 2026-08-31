const mongoose = require('mongoose');

const resourceUsageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm'
    },
    resourceType: {
        type: String,
        enum: ['Water Irrigation', 'Fertilizer Application', 'Pesticide Spray', 'Seeds Sown', 'Fuel & Energy'],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true // Liters, Bags, Kg, Hours
    },
    cost: {
        type: Number,
        default: 0
    },
    dateUsed: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('ResourceUsage', resourceUsageSchema);
