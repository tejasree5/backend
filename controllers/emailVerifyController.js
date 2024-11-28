const User = require('../models/User');

exports.verifyEmail = async (req, res) => {
    const { token } = req.params;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(400).json({ message: 'Invalid token' });

        user.isVerified = true; // Update user status
        await user.save();
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
