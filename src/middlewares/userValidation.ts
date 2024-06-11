import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { CreateUserDTO, LoginUserDTO } from "../interfaces/user.dto";

export const validateNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: CreateUserDTO = req.body;


  const schema = Joi.object<CreateUserDTO>({
    fullname: Joi.string().required().messages({
      "string.base": "Invalid type, please provide a valid string",
      "any.required": "Name is required",
      "string.empty": "Name cannot be empty",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
      "string.empty": "Email cannot be empty",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must not be less than 6 characters",
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
    }),
    username: Joi.string().required().messages({
      "any.required": "Username is required",
      "string.empty": "Username cannot be empty",
      "string.base": "Invalid type, please provide a valid string",
    }),
  });

  try {
    await schema.validateAsync(user, { abortEarly: true });
    next();
  } catch (error: any) {
    return res.status(422).json({
      message: "Validation error",
      error: error.details ? error.details[0].message : error.message,
    });
  }
};

export const validateLoginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user: LoginUserDTO = req.body;

    const schema = Joi.object<LoginUserDTO>({
      email: Joi.string().email().required().messages({
        "string.email": "Please provide a valid email address",
        "any.required": "Email is required",
        "string.empty": "Email cannot be empty",
      }),
      password: Joi.string().required().messages({
        "any.required": "Password is required",
        "string.empty": "Password cannot be empty",
      }),
    });
  
    try {
      await schema.validateAsync(user, { abortEarly: true });
      next();
    } catch (error: any) {
      return res.status(422).json({
        message: "Validation error",
        error: error.details ? error.details[0].message : error.message,
      });
    }
  };
  
