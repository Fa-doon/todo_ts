import { Request, Response, RequestHandler } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { CreateUserDTO, LoginUserDTO } from "../interfaces/user.dto";
import dotenv from "dotenv";
dotenv.config();


// Register a new user
export const createUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { fullname, username, email, password } = req.body as CreateUserDTO;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const createdUser = await User.create({
      fullname,
      username,
      email,
      password,
    });

    const { password: _, ...userDetails } = createdUser.get({ plain: true });

    return res.status(201).json({
      message: "Registration successful",
      user: userDetails,
    });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Login a user
export const loginUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body as LoginUserDTO;
  

    // find user in the db
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // check password match
    const isValidPassword = await user.isMatch(password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.log("Error logging in user", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
