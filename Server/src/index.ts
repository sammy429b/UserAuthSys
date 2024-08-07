import express, { Express, NextFunction, Request, Response } from 'express';
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
const accessOrigin = process.env.ORIGIN_URL || 'http://localhost:3000';

// Proxy
app.use('/',apiProxy);

// Middleware'
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}));

// Routes
app.use("/auth", authRoute);
app.use("/password", changePasswordRoute);
app.use("/password", forgotPasswordRoute);


// Base route
app.get("/", (req: Request, res: Response) => {
    res.send("TypeScript with express");
    res.json({ message: "TypeScript with express" });
});

// Start the server after DB connection
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`CORS Origin: ${accessOrigin}`);
    DBconnection();
});