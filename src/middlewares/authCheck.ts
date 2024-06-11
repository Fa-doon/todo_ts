import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export const isUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized, no token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      email: string;
    };

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (error) {
    console.log("Authentication error", error);
    res.status(403).json({
      message: "Forbidden, invalid or expired token",
    });
  }
};
