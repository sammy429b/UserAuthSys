import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port:587,
    secure:false,
    auth:{
        user:process.env.USER,
        pass: process.env.PASS 
    }
});

const sendOTP = async(receiver:string, otp:number) =>{
    const info = await transporter.sendMail({
        from :`"Sammy from app" ${process.env.USER}`,
        to:`${receiver}`,
        subject: 'Your OTP for Verification',
        text: `Your OTP is: ${otp}`
    });

    console.log("Message sent: %s", info.messageId);
}

export default sendOTP;