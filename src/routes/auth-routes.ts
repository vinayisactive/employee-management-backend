import { Router } from "express";
import { logIn } from "../controllers/auth-controllers";
 
const authRouter = Router(); 
authRouter.post("/login", logIn)

export default authRouter; 