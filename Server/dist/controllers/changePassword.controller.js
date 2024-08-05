"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const changePasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { oldPassword, newPassword, email } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Provide both new and old passwords" });
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        const updateResult = yield user_model_1.default.updateOne({ email }, { $set: { password: hashedPassword } });
        if (!updateResult) {
            return res.status(400).json({ message: "Something went wrong" });
        }
        return res.status(200).json({ message: "Successfully changed password" });
    }
    catch (error) {
        console.error("Error in change password controller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.changePasswordController = changePasswordController;
