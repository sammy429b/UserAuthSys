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
exports.logoutController = exports.loginController = exports.registerController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWT_1 = require("../utils/JWT");
// Register controller
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ "message": "Username or password missing in request" });
        }
        const existingMail = yield user_model_1.default.findOne({ email });
        if (existingMail) {
            return res.status(409).json({ message: "User already exist with this email", success: false, field: "email" });
        }
        const existingUsername = yield user_model_1.default.findOne({ username });
        if (existingUsername) {
            return res.status(409).json({ message: "User already exist with this username", success: false, field: "username" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_model_1.default({
            username,
            email,
            password: hashedPassword
        });
        if (!newUser) {
            return res.status(500).json({ message: "Could not create user" });
        }
        yield newUser.save();
        return res.status(201).json({ message: "User created successfully.", success: true });
    }
    catch (error) {
        console.log("error in register", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerController = registerController;
// Login controller
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ "message": "Username or password missing in request" });
        }
        const existingUser = yield user_model_1.default.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Email does not exist", success: false, field: "email" });
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Wrong password", success: false, field: "password" });
        }
        // Passwords match, user authenticated
        const token = yield (0, JWT_1.JWTsign)(existingUser._id.toString());
        if (!token) {
            return res.status(500).json({ message: "Could not generate token" });
        }
        res.cookie('token', token, {
            sameSite: 'lax',
            httpOnly: true,
            secure: false,
        });
        console.log(token);
        return res.status(200).json({ message: "Login successful", success: true });
    }
    catch (error) {
        console.error("Error in login route", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.loginController = loginController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: "Logged out successfully", success: true });
    }
    catch (error) {
        console.error("Error in login route", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.logoutController = logoutController;
