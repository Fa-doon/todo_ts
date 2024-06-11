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
exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.getAllTodos = exports.createTodo = void 0;
const todo_1 = __importDefault(require("../models/todo"));
// Create todo task
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const createdTodo = yield todo_1.default.create({
            title,
            description,
            userId,
        });
        return res.status(201).json({
            message: "Task created successfully",
            todo: createdTodo,
        });
    }
    catch (error) {
        console.log("Error creating task", error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});
exports.createTodo = createTodo;
// Get all todo tasks
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const tasks = yield todo_1.default.findAll({
            where: { userId },
            attributes: { exclude: ["userId"] },
        });
        res.status(200).json({
            message: "Tasks retrieved successfully",
            todos: tasks,
        });
    }
    catch (error) {
        console.log("Error retrieving tasks", error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});
exports.getAllTodos = getAllTodos;
// Get a single task
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = req.params.id;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const task = yield todo_1.default.findOne({
            where: { id, userId },
            attributes: { exclude: ["userId"] },
        });
        if (!task) {
            return res.status(200).json({
                message: "Task not found",
            });
        }
        else {
            res.status(200).json({
                message: "Task retrieved successfuly",
                todo: task,
            });
        }
    }
    catch (error) {
        console.log("Error retrieving task", error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});
exports.getTodo = getTodo;
// Update a task
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const id = req.params.id;
    const { title, description } = req.body;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
    try {
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const todo = yield todo_1.default.findOne({ where: { id, userId } });
        if (!todo) {
            return res.status(401).json({
                message: "Task not found or you are not authorized to update this task",
            });
        }
        todo.title = title !== null && title !== void 0 ? title : todo.title;
        todo.description = description !== null && description !== void 0 ? description : todo.description;
        yield todo.save();
        return res.status(200).json({
            message: "Task updated successfully",
            updatedTodo: todo,
        });
    }
    catch (error) {
        console.log("Error updating task", error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});
exports.updateTodo = updateTodo;
// Delete a task
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const id = req.params.id;
    const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const todo = yield todo_1.default.findOne({ where: { id, userId } });
        if (!todo) {
            return res
                .status(404)
                .json({
                message: "Task not found or you are not authorized to delete this task",
            });
        }
        yield (todo === null || todo === void 0 ? void 0 : todo.destroy());
        return res.status(200).json({
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        console.log("Error deleting task", error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});
exports.deleteTodo = deleteTodo;
