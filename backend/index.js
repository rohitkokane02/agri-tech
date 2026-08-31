const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db/config');
const mainRouter = require('./routes/index');

const app = express();

// Connect to MongoDB Database
connectDB();

// Global Middleware Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route & API Aggregator Route
app.get('/', (req, res) => {
    res.json({
        message: 'KisanLog Agri-Tech API Server is Running! 🌱',
        status: 'Active',
        endpoints: '/api'
    });
});

app.use('/api', mainRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});
