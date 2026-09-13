const Product = require('../models/Product');

// Seed default products if database is empty
const seedProducts = [
    { name: 'Hybrid Wheat Seeds (HD-2967)', category: 'Seeds', price: 1200, unit: 'per 40kg bag', description: 'High yield disease resistant wheat seeds for optimal harvest.' },
    { name: 'Organic NPK Fertilizer', category: 'Fertilizers', price: 850, unit: 'per 50kg bag', description: 'Balanced Nitrogen, Phosphorus, Potassium organic formula.' },
    { name: 'Neem-based Bio Insecticide', category: 'Pesticides', price: 450, unit: 'per 1L bottle', description: 'Eco-friendly pest controller safe for beneficial insects.' },
    { name: 'Solar Powered Irrigation Pump', category: 'Equipment', price: 35000, unit: 'per set', description: 'High efficiency 3HP solar water pumping system.' },
    { name: 'Soil & Crop Health Expert Consultation', category: 'Services', price: 500, unit: 'per session', description: '1-on-1 agronomy consultation with field visit report.' },
    { name: 'Combine Harvester Rental Service', category: 'Services', price: 2500, unit: 'per acre', description: 'Automated harvesting & threshing machinery service.' }
];


const getProducts = async (req, res) => {
    try {
        let products = await Product.find();
        if (products.length === 0) {
            products = await Product.insertMany(seedProducts);
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, category, price, description, unit, image } = req.body;
        const product = new Product({ name, category, price, description, unit, image });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

module.exports = { getProducts, createProduct };
