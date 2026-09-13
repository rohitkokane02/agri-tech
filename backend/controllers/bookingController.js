const Booking = require('../models/Booking');

const getBookings = async (req, res) => {
    try {
        const userId = req.query.userId;
        const query = userId ? { userId } : {};
        const bookings = await Booking.find(query)
            .populate('productId')
            .populate('userId', 'name email phone')
            .sort({ bookingDate: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};

const createBooking = async (req, res) => {
    try {
        const { userId, productId, quantity, totalAmount, notes } = req.body;
        if (!userId || !productId || !totalAmount) {
            return res.status(400).json({ message: 'userId, productId, and totalAmount are required' });
        }
        const booking = new Booking({
            userId,
            productId,
            quantity: quantity || 1,
            totalAmount,
            notes: notes || '',
            bookingDate: new Date()
        });
        await booking.save();
        
        const populatedBooking = await Booking.findById(booking._id).populate('productId');
        res.status(201).json({ message: 'Booking placed successfully', booking: populatedBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndUpdate(id, { status: 'Cancelled' }, { new: true });
        res.status(200).json({ message: 'Booking cancelled', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling booking', error: error.message });
    }
};


module.exports = { getBookings, createBooking, cancelBooking };
