import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { TodoDTO, UpdateTodoDTO } from "../interfaces/todo.dto";

export const validateNewTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskDetails: TodoDTO = req.body;

  const schema = Joi.object<TodoDTO>({
    title: Joi.string().required().messages({
      "string.base": "Invalid type, please provide a valid string",
      "any.required": "Title is required",
      "string.empty": "Title cannot be empty",
    }),

    description: Joi.string().required().messages({
      "string.base": "Invalid type, please provide a valid string",
      "any.required": "Description is required",
      "string.empty": "Description cannot be empty",
    }),
  });

  try {
    await schema.validateAsync(taskDetails, { abortEarly: true });
    next();
  } catch (error: any) {
    return res.status(422).json({
      message: "Validation error",
      error: error.details ? error.details[0].message : error.message,
    });
  }
};

export const validateUpateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const task: UpdateTodoDTO = req.body;
  
    const schema = Joi.object<UpdateTodoDTO>({
      title: Joi.string().messages({
        "string.empty": "Title cannot be empty",
      }),
  
      description: Joi.string().messages({
       "string.empty": "Description cannot be empty",
      }),
    });
  
    try {
      await schema.validateAsync(task, { abortEarly: true });
      next();
    } catch (error: any) {
      return res.status(422).json({
        message: "Validation error",
        error: error.details ? error.details[0].message : error.message,
      });
    }
  };