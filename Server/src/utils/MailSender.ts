import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config()

const username = process.env.USER;
const app_password = process.env.PASS

    const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:username,
        pass: app_password
    },
    logger: true, 
    debug: true 
});

const sendOTP = async(receiver:string, otp:string) =>{
    try{

            const info = await transporter.sendMail({
            from :`"Sammy from app" ${process.env.USER}`,
            to:`${receiver}`,
            subject: 'Your OTP for Verification',
            text: `Your OTP is: ${otp}`
        });
        
        console.log("Message sent: %s", info.messageId);
    }catch(error){
        console.log(error)
    }
}

export default sendOTP;