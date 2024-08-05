import { Request, Response } from 'express';
import User from "../models/user.model";
import bcrypt from 'bcrypt'
import { JWTsign } from '../utils/JWT';

interface registerType {
    username: string,
    email: string,
    password: string
}

interface loginType {
    email: string,
    password: string
}

// Register controller
export const registerController = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body as registerType;

        if (!username || !email || !password) {
            return res.status(400).json({ "message": "Username or password missing in request" });
        }

        const existingMail = await User.findOne({ email });
        if (existingMail) {
            return res.status(409).json({ message: "User already exist with this email", success: false, field: "email" });
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(409).json({ message: "User already exist with this username", success: false, field: "username" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        if (!newUser) {
            return res.status(500).json({ message: "Could not create user" });
        }

        await newUser.save();

        return res.status(201).json({ message: "User created successfully.", success: true });
    } catch (error) {
        console.log("error in register", error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Login controller
export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as loginType;

        if (!email || !password) {
            return res.status(400).json({ "message": "Username or password missing in request" });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "Email does not exist", success: false, field: "email" });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Wrong password", success: false, field: "password" });
        }

        // Passwords match, user authenticated

        const token = await JWTsign(existingUser._id.toString())

        if (!token) {
            return res.status(500).json({ message: "Could not generate token" });
        }

        res.cookie('token', token, {
            sameSite: 'lax',
            httpOnly: true,
            secure: false,
        });

        console.log(token)

        return res.status(200).json({ message: "Login successful", success: true });

    } catch (error) {
        console.error("Error in login route", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const logoutController = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: "Logged out successfully", success: true });

    } catch (error) {
        console.error("Error in login route", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};






