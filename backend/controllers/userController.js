const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone: phone || '',
            address: address || '',
            role: role || 'Farmer',
            isApproved: true
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'agri_tech_secret_key_2026',
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Logged in successfully!',
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role || 'Farmer',
                isApproved: user.isApproved !== false
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address } = req.body;
        const targetId = userId || req.user?.id;
        const updatedUser = await User.findByIdAndUpdate(
            targetId,
            { name, phone, address },
            { new: true }
        ).select('-password');

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};

module.exports = { registerUser, loginUser, updateProfile };
