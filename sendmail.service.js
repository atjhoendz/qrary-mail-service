const nodemailer = require('nodemailer');
const sendResponse = require('./formatResponse');

const sendMail = (req, res) => {
    let message = req.body.message

    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SMTP,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    transporter.sendMail(message).then(info => {
        return sendResponse(res, true, 200, { success: true }, `Email berhasil terkirim ke ${message.to}`, true)
    }).catch(err => {
        return sendResponse(res, false, 200, { success: false }, `Error: ${err.message}`, true)
    });
}

module.exports = sendMail