const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const sendResponse = require('./formatResponse')

const generateOTP = () => {
  let secret = process.env.SECRET_OTP;
  let token = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
      step: 230
  });
  return token;
};

const sendEmailOTP = (email, res) => {
  let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
      }
  });

  let code = generateOTP();

  let message = {
      from: 'qrary@himatif.org',
      to: email,
      subject: 'Qrary Verification Code',
      text: `Verification Code : ${code}`
  }

  // Send Email

  transporter.sendMail(message).then(info => {
      if (res == null) {
          console.log('Kode OTP berhasil dikirim');
      } else {
          sendResponse(res, true, 200, info, 'Kode OTP berhasil dikirim', true);
      }
  }).catch(err => {
      if (res == null) {
          console.log(`Sendmail error: ${err.message}`);
      } else {
          sendResponse(res, false, 500, {}, `Error: ${err.message}`, true);
      }
  });
}

// exports.sendOTP = (req, res) => {
//   let emailto = req.body.email
//   sendEmailOTP(emailto, res)
// }

module.exports = {
  sendOTP: (req, res) => {
    let emailto = req.body.email
    sendEmailOTP(emailto, res)
  }
}