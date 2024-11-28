require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const emailVerifyRoutes = require('./routes/emailVerifyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', emailVerifyRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});
