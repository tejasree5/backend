const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../utils/emailService');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, emailToken: jwt.sign({ email }, process.env.JWT_SECRET) });
        await newUser.save();
        const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        await sendVerificationEmail(email, verificationToken);
        await sendVerificationEmail(newUser.email, newUser.emailToken);
        res.status(201).json({ message: 'User registered. Check your email for verification.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed.' });
    }
};