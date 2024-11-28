const express = require('express');
const { verifyJWT } = require('../middleware/authMiddleware');
const router = express.Router();

const { verifyRole } = require('../middleware/authMiddleware');
router.get('/admin-only', verifyRole('admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome, Admin!' });
});


module.exports = router;
