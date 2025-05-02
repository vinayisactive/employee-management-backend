import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employee-controller";

const employeeRouter = Router();
employeeRouter.use(authMiddleware);

employeeRouter.get("/", getEmployees);
employeeRouter.get("/:id", getEmployee);
employeeRouter.post("/", createEmployee);
employeeRouter.patch("/:id", updateEmployee);
employeeRouter.delete("/:id", deleteEmployee);

export default employeeRouter;
