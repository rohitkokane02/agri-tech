const User = require('../models/User');
const Booking = require('../models/Booking');
const Product = require('../models/Product');
const PestAlert = require('../models/PestAlert');

const getSystemAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const activeAlerts = await PestAlert.countDocuments();

        const bookings = await Booking.find({ status: { $ne: 'Cancelled' } });
        const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

        res.status(200).json({
            totalUsers,
            totalProducts,
            totalBookings,
            activeAlerts,
            totalRevenue,
            systemHealth: 'Optimal',
            dbStatus: 'Connected'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin analytics', error: error.message });
    }
};

const verifyUserAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.isApproved = true;
        await user.save();
        res.status(200).json({ message: 'User account verified successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying user', error: error.message });
    }
};

const getAllUsersAdmin = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

module.exports = { getSystemAnalytics, verifyUserAccount, getAllUsersAdmin };
