import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

interface ForgotPasswordType {
    rerenterPassword: string,
    newPassword: string,
    email: string
}

interface ChangePasswordType {
    oldPassword: string,
    newPassword: string,
    email: string
}

export const changePasswordController = async (req: Request, res: Response) => {
    try {
        const { oldPassword, newPassword, email } = req.body as ChangePasswordType;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Provide both new and old passwords" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updateResult = await User.updateOne({ email }, { $set: { password: hashedPassword } });

        if (!updateResult) {
            return res.status(400).json({ message: "Something went wrong" });
        }

        return res.status(200).json({ message: "Successfully changed password" });
    } catch (error) {
        console.error("Error in change password controller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
