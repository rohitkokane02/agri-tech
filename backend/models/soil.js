const mongoose = require('mongoose');

const soilSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    nitrogen: {
        type: Number, 
        required: true 
    },
    phosphorus: { 
        type: Number, 
        required: true 
    },
    potassium: { 
        type: Number, 
        required: true 
    },
    phLevel: { 
        type: Number, 
        required: true 
    },
    recommendation: { 
        type: String 
    }, 
    date: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Soil', soilSchema);