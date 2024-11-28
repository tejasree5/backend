// controllers/qrController.js
const QRCode = require('qrcode');

exports.generateQRCode = async (req, res) => {
    const { text } = req.body;
    try {
        const qrCodeUrl = await QRCode.toDataURL(text);
        res.status(200).json({ qrCodeUrl });
    } catch (error) {
        res.status(500).json({ error: 'QR Code generation failed.' });
    }
};
