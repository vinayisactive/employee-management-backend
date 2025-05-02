import { Request, Response } from "express";
import db from "../utils/database.config";

const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await db.employee.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      message: "Employees retrieved successfully",
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const getEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Employee ID is required" });
      return;
    }

    const employee = await db.employee.findUnique({
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
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, email, mobile, designation, gender, course, image } =
      req.body;

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

    const isEmployeExists = await db.employee.findUnique({
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

    const employee = await db.employee.create({
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
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Employee ID is required" });
      return;
    }

    const updateData = Object.fromEntries(
      Object.entries(req.body).filter(([, value]) => value !== undefined)
    );

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ message: "No fields to update" });
      return;
    }

    const updated = await db.employee.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json({
      message: "Updated employee successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Employee ID is required" });
      return;
    }

    await db.employee.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("RecordNotFound")) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
