// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyRole = (role) => (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Access denied.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== role) return res.status(403).json({ message: 'Forbidden.' });

        req.user = decoded; // Store user info in req for further use
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
