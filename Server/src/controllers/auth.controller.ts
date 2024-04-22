import User from "../models/user.model";
import { Request, Response } from 'express';



const userController = async (req:Request, res:Response) =>{
    try {
        const {username, email, password} = req.body;

        if(!username  || !email || !password ){
            console.log(username, email, password)
            return res.status(400).json({"message":"Username or password missing in request"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message:"User already exist with this email"})
        }


        const newUser = new User({
            username,
            email,
            password
        })

        await newUser.save();

        res.status(201).json({ message: "User created successfully.", user: newUser });
    } catch (error) {
        console.log("error in register", error)
        res.status(500).json({message : "Internal server error"});
    }
}

export default userController;