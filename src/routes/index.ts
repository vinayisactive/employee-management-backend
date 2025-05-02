import { Router } from "express";
import authRouter from "./auth-routes";
import employeeRouter from "./employee-routes";

const apiV1Router = Router(); 

apiV1Router.use("/auth", authRouter); 
apiV1Router.use("/employees", employeeRouter)

export default apiV1Router; 