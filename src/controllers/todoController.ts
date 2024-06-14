import { Request, Response, RequestHandler } from "express";
import Todo from "../models/todo";
import { TodoDTO } from "../interfaces/todo.dto";

interface AuthRequest extends Request {
  user?: any;
}

// Create todo task
export const createTodo: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const { title, description }: TodoDTO = req.body;
  const userId = req.user?.id as number;

  try {
    const createdTodo = await Todo.create({
      title,
      description,
      userId,
    });

    return res.status(201).json({
      message: "Task created successfully",
      todo: createdTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Get all todo tasks
export const getAllTodos: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tasks = await Todo.findAll({
      where: { userId },
      attributes: { exclude: ["userId"] },
    });
    res.status(200).json({
      message: "Tasks retrieved successfully",
      todos: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Get a single task
export const getTodo: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const id = req.params.id;
  const userId = req.user?.id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const task = await Todo.findOne({
      where: { id, userId },
      attributes: { exclude: ["userId"] },
    });
    if (!task) {
      return res.status(200).json({
        message: "Task not found",
      });
    } else {
      res.status(200).json({
        message: "Task retrieved successfuly",
        todo: task,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Update a task
export const updateTodo: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const userId = req.user?.id;

  try {
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const todo = await Todo.findOne({ where: { id, userId } });
    if (!todo) {
      return res.status(401).json({
        message: "Task not found or you are not authorized to update this task",
      });
    }

    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;

    await todo.save();
    return res.status(200).json({
      message: "Task updated successfully",
      updatedTodo: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Delete a task
export const deleteTodo: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const id = req.params.id;
  const userId = req.user?.id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const todo = await Todo.findOne({ where: { id, userId } });
    if (!todo) {
      return res
        .status(404)
        .json({
          message:
            "Task not found or you are not authorized to delete this task",
        });
    }

    await todo?.destroy();

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
