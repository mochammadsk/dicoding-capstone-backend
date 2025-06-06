const nodemailer = require('nodemailer');

require('dotenv').config();

// Function to send verification email
function sendVerificationEmail(email, name, uniqueString) {
  return new Promise((resolve, reject) => {
    // Create reusable transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log('User email register service:', success);
      }
    });

    // Send mail with defined transport object
    transporter.sendMail(
      {
        from: `"noreply" <${process.env.AUTH_EMAIL}>`,
        to: email,
        subject: 'Account Verification',
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
            <p style="color: #333;">
              Hello <b>${name}</b>,
            </p>
            <p style="color: #333;">
              Thank you for registering with us. To complete your registration, please verify your email address by clicking the link below
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <a href='https://dicoding-capstone-backend.vercel.app/auth/verify-email/${uniqueString}' style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007BFF; border-radius: 5px; text-decoration: none;">
                Verify Email
              </a>
            </div>
            <p style="color: #333;">
              If you did not create an account, please ignore this email.
            </p>
            <p style="color: #333;">Best regards,<br/>
              <b>Ramal Kripto ID Team</b>
            </p>
          </div>
        </div>`,
      },
      (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      }
    );
  });
}

module.exports = sendVerificationEmail;
