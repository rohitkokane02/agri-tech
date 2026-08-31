const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const adminRoutes = require('./admin');
const farmRoutes = require('./farm');
const cropRoutes = require('./crop');
const productRoutes = require('./product');
const bookingRoutes = require('./booking');
const weatherRoutes = require('./weatherRoutes');
const soilRoutes = require('./soilRoutes');
const pestRoutes = require('./pestRoutes');
const resourceRoutes = require('./resourceRoutes');
const forumRoutes = require('./forumRoutes');

// Mount sub-routes under API paths
router.use('/users', userRoutes);
router.use('/auth', userRoutes); // Alias for legacy auth compatibility
router.use('/admin', adminRoutes);
router.use('/farms', farmRoutes);
router.use('/farm', farmRoutes); // Alias
router.use('/crops', cropRoutes);
router.use('/products', productRoutes);
router.use('/bookings', bookingRoutes);
router.use('/weather', weatherRoutes);
router.use('/soil', soilRoutes);
router.use('/pests', pestRoutes);
router.use('/resources', resourceRoutes);
router.use('/forum', forumRoutes);

module.exports = router;
