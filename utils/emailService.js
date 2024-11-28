// utils/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendVerificationEmail = async (userEmail, token) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Verify Your Email',
        text: `Please verify your email by clicking the following link: http://localhost:5000/api/auth/verify-email/${token}`,
    };
    await transporter.sendMail(mailOptions);
};
