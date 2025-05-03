import { Router } from "express";
import authRouter from "./auth-routes";
import employeeRouter from "./employee-routes";
import mediaRouter from "./media-routes";

const apiV1Router = Router(); 

apiV1Router.use("/auth", authRouter); 
apiV1Router.use("/employees", employeeRouter)
apiV1Router.use("/media", mediaRouter)

export default apiV1Router; 