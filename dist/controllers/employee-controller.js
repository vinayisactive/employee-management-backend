"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployee = exports.getEmployees = void 0;
const database_config_1 = __importDefault(require("../utils/database.config"));
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield database_config_1.default.employee.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json({
            message: "Employees retrieved successfully",
            data: employees,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong.",
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getEmployees = getEmployees;
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Employee ID is required" });
            return;
        }
        const employee = yield database_config_1.default.employee.findUnique({
            where: { id },
        });
        if (!employee) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }
        res.status(200).json({
            message: "Employee retrieved successfully",
            data: employee,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getEmployee = getEmployee;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, mobile, designation, gender, course, image } = req.body;
        const missingInputs = [
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            image,
        ].filter((val) => !val);
        if (missingInputs.length > 0) {
            res.status(400).json({
                message: "Invalid input, all fileds are required",
            });
            return;
        }
        const isEmployeExists = yield database_config_1.default.employee.findUnique({
            where: {
                email,
            },
        });
        if (isEmployeExists) {
            res.status(409).json({
                message: "Employee with this email already exists",
            });
            return;
        }
        const employee = yield database_config_1.default.employee.create({
            data: {
                name,
                email,
                mobile,
                designation,
                gender,
                course,
                image,
            },
        });
        res.status(201).json({
            message: "Employee created successfully",
            data: employee,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.createEmployee = createEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Employee ID is required" });
            return;
        }
        const updateData = Object.fromEntries(Object.entries(req.body).filter(([, value]) => value !== undefined));
        if (Object.keys(updateData).length === 0) {
            res.status(400).json({ message: "No fields to update" });
            return;
        }
        const updated = yield database_config_1.default.employee.update({
            where: { id },
            data: updateData,
        });
        res.status(200).json({
            message: "Updated employee successfully",
            data: updated,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Employee ID is required" });
            return;
        }
        yield database_config_1.default.employee.delete({
            where: { id },
        });
        res.status(200).json({
            message: "Employee deleted successfully",
        });
    }
    catch (error) {
        if (error instanceof Error && error.message.includes("RecordNotFound")) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }
        res.status(500).json({
            message: "Something went wrong",
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.deleteEmployee = deleteEmployee;
