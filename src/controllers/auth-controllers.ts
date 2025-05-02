import { Request, Response } from "express";
import db from "../utils/database.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginRequestBody {
  username: string;
  password: string;
}

export const logIn = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        message: "Invalid input, please provide both username and password.",
      });

      return;
    }

    const user = await db.login.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      res.status(401).json({
        message: "Invalid credentials.",
      });

      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(401).json({
        message: "Password is incorrect.",
      });

      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      message: "User logged in successfully.",
      data: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error instanceof Error ? error.message : error,
    });
  }
};
