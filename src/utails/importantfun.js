const nodemailer = require('nodemailer')

const emailConfig = {
    service: 'gmail',
    auth: {
        user:process.env.PORTAL_EMAIL,
        pass:process.env.PORTAL_PASSWORD,
    },
};


async function   (mail , otp) {

    const transporter = nodemailer.createTransport(emailConfig);

    const mailOptions = {
        from: process.env.PORTAL_EMAIL,
        to: mail,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`,
    };
    
    try{
        await transporter.sendMail(mailOptions);
        return `OTP send to ${mail} via email`;
    
    } catch (error) {
        thorw `Error sending OTP to ${mail} via email: ${error}`
    }
}

module.exports = sendEmailOTP