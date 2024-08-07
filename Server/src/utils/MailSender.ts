import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const mail_id: string = process.env.USER || " ";
const app_password: string = process.env.PASS || " ";

if (!mail_id || !app_password) {
    throw new Error('Missing environment variables for email configuration.');
}

// create reusable transporter object using the default SMTP transport 
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: mail_id,
        pass: app_password
    },
});

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Node Mailer is ready to send emails");
    }
});

// send mail with defined transport object
const sendOTP = async (receiver: string, otp: string) => {
    try {
        const info = await transporter.sendMail({
            from: `<${mail_id}>`,
            to: receiver,
            subject: 'Your OTP for Verification',
            text: `Your OTP is: ${otp}`,
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
};




export default sendOTP;
