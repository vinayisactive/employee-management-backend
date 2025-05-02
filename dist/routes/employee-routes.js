"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
const employee_controller_1 = require("../controllers/employee-controller");
const employeeRouter = (0, express_1.Router)();
employeeRouter.use(auth_middleware_1.default);
employeeRouter.get("/", employee_controller_1.getEmployees);
employeeRouter.get("/:id", employee_controller_1.getEmployee);
employeeRouter.post("/", employee_controller_1.createEmployee);
employeeRouter.patch("/:id", employee_controller_1.updateEmployee);
employeeRouter.delete("/:id", employee_controller_1.deleteEmployee);
exports.default = employeeRouter;
