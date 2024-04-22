import express, {Express, Request,  Response} from 'express'
import dotenv from 'dotenv'
import DBconnection from './utils/DBconnect';
import authRoute from './routes/auth.route'

const app : Express = express();
dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use("/",authRoute)


app.get("/", (req: Request, res:Response)=>{
    res.send("TypeScript wiht express");
})

app.listen(port || 5000, ()=>{
    console.log(`http://localhost:${port}`);
    DBconnection();
})