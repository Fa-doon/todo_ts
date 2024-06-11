import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  updateTodo,
} from "../controllers/todoController";
import { isUser } from "../middlewares/authCheck";
import {
  validateNewTask,
  validateUpateTask,
} from "../middlewares/todoValidation";

const router = Router();

router.use(isUser);

router.post("/", validateNewTask, createTodo);
router.get("/", getAllTodos);
router.get("/:id", getTodo);
router.put("/:id", validateUpateTask, updateTodo);
router.delete("/:id", deleteTodo);

export default router;
