import { Request, Response } from 'express';
import User from "../models/user.model";
import bcrypt from 'bcrypt'
import redis from '../utils/Redis';
import sendOTP from '../utils/MailSender';
import generateOTP from '../utils/generateOTP'
import { JWTsign } from '../utils/JWT';

interface registerType{
    username : string,
    email : string,
    password : string
}

interface changePasswordType{
    oldPassword : string,
    newPassword : string,
    email : string
}

interface forgotPasswordType{
    rerenterPassword : string,
    newPassword : string,
    email : string
}

interface loginType{
    email : string,
    password : string
}

export const registerController = async (req:Request, res:Response) =>{
    try {
        const {username, email, password} = req.body as registerType;

        if(!username  || !email || !password ){
            return res.status(400).json({"message":"Username or password missing in request"});
        }
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message:"User already exist with this email"})
        }
        
       const hashedPassword = await  bcrypt.hash(password, 10);
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        
        await newUser.save();
        
        res.status(201).json({ message: "User created successfully.", user: newUser });
    } catch (error) {
        console.log("error in register", error)
        res.status(500).json({message : "Internal server error"});
    }
}



export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as loginType;

        if (!email || !password) {
            return res.status(400).json({ "message": "Username or password missing in request" });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "Email does not exist" });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        // Passwords match, user authenticated

        const token = JWTsign(existingUser._id)

        if (!token) {
            return res.status(500).json({ message: "Could not generate token" });
        }

        res.cookie('token', token, {
            sameSite: 'strict',
            httpOnly: true,
        });

        res.status(201).json({ message: "Login successful"});

    } catch (error) {
        console.error("Error in login route", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const logoutController = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token');
        res.send('Cookie cleared');

    } catch (error) {
        console.error("Error in login route", error);
        res.status(500).json({ message: "Internal server error" });
    }
};






export const changePasswordController = async(req:Request, res: Response) =>{
    try {
        const{token} = req.cookies;
        if(!token){
           return res.status(400).json({message:"no token"})
        }
        console.log("token:",token)

        const {oldPassword, newPassword, email} = req.body as changePasswordType;
        console.log(oldPassword, " ", newPassword)
        if(!oldPassword || !newPassword ){
            return res.status(400).json({message: "Provide new and old both password"})
        }

        const user = await User.findOne({email})
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const pass = user?.password

        const isPasswordMatch = await bcrypt.compare(oldPassword,pass)
        console.log(isPasswordMatch)
        console.log(pass)

        const hashedPassword = await bcrypt.hash(newPassword,10);

        const newPass = await User.updateOne({email}, {$set:{password:hashedPassword}}) 
        console.log(newPass)
        return res.status(200).json({message : "Successfully changed password"});
    } catch (error) {
        console.log("error in change password", error)
    }
}


export const forgotPasswordController = async(req:Request, res: Response) =>{
    try {
        const {rerenterPassword, newPassword, email} = req.body as forgotPasswordType;
        console.log(rerenterPassword, " ", newPassword)
        if(!rerenterPassword || !newPassword ){
            return res.status(400).json({message: "Provide new and old both password"})
        }

        const user = await User.findOne({email})
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const hashedPassword = await bcrypt.hash(newPassword,10);

        const newPass = await User.updateOne({email}, {$set:{password:hashedPassword}}) 
        console.log(newPass)
        return res.status(200).json({message : "Successfully changed password"});
    } catch (error) {
        console.log("error in forgot password", error)
    }
}


export const sendOTPController = async (req:Request, res:Response)=>{
    try {
        const { email } = req.body;
        console.log(req.body)
        console.log(email)
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "user not found"})
        }
        // otp gernartion storing in redis
        const otp = generateOTP();
        await redis.set(`${email}:otp`, otp, 'EX', 120);
        const redisOTP = await redis.get(`${email}:otp`);
        if(redisOTP){
           await sendOTP(email,redisOTP);
        }
        res.status(200).json({Message : "Please Check Your Mail For OTP"})
        
    } catch (error) {
        console.log("error in sendOTP controller");
        res.status(400).json({message:"Internal server error"})
    }
}

export const verifyOTPController = async (req:Request, res:Response)=>{
    try {
        const { email, OTP } = req.body;
        console.log(req.body)
        console.log(email)
        const user = User.findOne({email});
        if(!user){
            return res.status(400).json({message : "user not found"})
        }
        const redisOTP = await redis.get(`${email}:otp`);
        if(redisOTP === OTP){
            return res.json({message : "set your new password"})
        }
        res.status(200).json({Message : "Please Check Your Mail For OTP"})
        
    } catch (error) {
        console.log("error in sendOTP controller");
        res.status(400).json({message:"Internal server error"})
    }
}