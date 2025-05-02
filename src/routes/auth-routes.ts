import { Router } from "express";
import { getUserDetails, logIn } from "../controllers/auth-controllers";
import authMiddleware from "../middlewares/auth-middleware";
 
const authRouter = Router(); 

authRouter
.get("/", authMiddleware, getUserDetails)
.post("/login", logIn)


export default authRouter; 