import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import DBconnection from './utils/DBconnect';
import PasswordRoute from './routes/password.route';
import authRoute from './routes/auth.route';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 5000;
const accessOrigin = process.env.ORIGIN_URL || 'http://localhost:3000';

app.use(cors({
    origin: accessOrigin,
    credentials: true
}));

// Proxy
app.use(
    '/weather',
    createProxyMiddleware({
        target: accessOrigin,
        changeOrigin: true,
        pathRewrite: {
            '^/weather': '', // This rewrites /weather to /
        },
    })
);

// Middleware
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/auth", authRoute);
app.use("/", PasswordRoute);

// Base route
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "TypeScript with express" });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server after DB connection
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`CORS Origin: ${accessOrigin}`);
    DBconnection();
});
