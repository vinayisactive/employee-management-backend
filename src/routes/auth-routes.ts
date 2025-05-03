import { Router } from "express";
import { getUserDetails, logIn, logOut } from "../controllers/auth-controllers";
import authMiddleware from "../middlewares/auth-middleware";
 
const authRouter = Router(); 

authRouter
.get("/", authMiddleware, getUserDetails)
.post("/login", logIn)
.post("/logout", authMiddleware, logOut)


export default authRouter; 