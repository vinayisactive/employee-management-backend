import express, { Request, Response } from 'express'; 
import apiV1Router from './routes';
import logger from './middlewares/logger';
import cors from 'cors'

const app = express(); 
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded()); 

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
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