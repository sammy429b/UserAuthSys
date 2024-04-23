import User from "../models/user.model";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'



export const registerController = async (req:Request, res:Response) =>{
    try {
        const {username, email, password} = req.body;

        if(!username  || !email || !password ){
            // console.log(username, email, password)
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
        const { email, password } = req.body;

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
        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error("Error in login route", error);
        res.status(500).json({ message: "Internal server error" });
    }
};