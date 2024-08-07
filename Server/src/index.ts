import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import DBconnection from './utils/DBconnect';
import changePasswordRoute from './routes/changePassword.route';
import forgotPasswordRoute from './routes/forgotPassword.route';
import authRoute from './routes/auth.route';
import apiProxy from './utils/ProxyServer';

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 5000;

// Middleware'
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Routes
app.use("/auth", authRoute);
app.use("/password", changePasswordRoute);
app.use("/password", forgotPasswordRoute);

// Proxy
app.use('/',apiProxy);

// Base route
app.get("/", (req: Request, res: Response) => {
    res.send("TypeScript with express");
    res.json({ message: "TypeScript with express" });
});

// Start the server after DB connection
app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    await DBconnection();
});