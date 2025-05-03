import express, { Request, Response } from 'express'; 
import apiV1Router from './routes';
import logger from './middlewares/logger';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express(); 
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded()); 
app.use(cookieParser()); 

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    exposedHeaders: ['Set-Cookie'],
    credentials: true
  }));
  

app.use(logger); 
app.use("/api/v1", apiV1Router); 

app.get("/", (req: Request, res: Response) => {
    res.send("Server is alive!");
    return;  
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
}); 