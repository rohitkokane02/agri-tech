const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true // Seeds, Fertilizers, Pesticides, Equipment, Services
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    unit: {
        type: String,
        default: 'per unit'
    },
    image: {
        type: String
    },
    imgUrl: {
        type: String
    },
    inStock: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
