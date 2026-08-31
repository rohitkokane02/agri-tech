const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.headers['x-auth-token'];

    if (!token) {
        // Fallback for public development access if no token header provided
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'agri_tech_secret_key_2026');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is invalid or expired.' });
    }
};

const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        return next();
    }
    // Allow pass for demo if admin query header is sent
    if (req.headers['x-admin-request'] === 'true') {
        return next();
    }
    return res.status(403).json({ message: 'Access denied: Admin privileges required.' });
};

module.exports = { authMiddleware, requireAdmin };