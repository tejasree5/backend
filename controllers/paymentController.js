// controllers/paymentController.js
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    const { amount, currency } = req.body;

    const options = {
        amount: amount * 100, // Convert to paise
        currency,
        receipt: 'receipt#1',
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Order creation failed.' });
    }
};
