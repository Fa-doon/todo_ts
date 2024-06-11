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
exports.validateUpateTask = exports.validateNewTask = void 0;
const joi_1 = __importDefault(require("joi"));
const validateNewTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskDetails = req.body;
    const schema = joi_1.default.object({
        title: joi_1.default.string().required().messages({
            "string.base": "Invalid type, please provide a valid string",
            "any.required": "Title is required",
            "string.empty": "Title cannot be empty",
        }),
        description: joi_1.default.string().required().messages({
            "string.base": "Invalid type, please provide a valid string",
            "any.required": "Description is required",
            "string.empty": "Description cannot be empty",
        }),
    });
    try {
        yield schema.validateAsync(taskDetails, { abortEarly: true });
        next();
    }
    catch (error) {
        return res.status(422).json({
            message: "Validation error",
            error: error.details ? error.details[0].message : error.message,
        });
    }
});
exports.validateNewTask = validateNewTask;
const validateUpateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = req.body;
    const schema = joi_1.default.object({
        title: joi_1.default.string().messages({
            "string.empty": "Title cannot be empty",
        }),
        description: joi_1.default.string().messages({
            "string.empty": "Description cannot be empty",
        }),
    });
    try {
        yield schema.validateAsync(task, { abortEarly: true });
        next();
    }
    catch (error) {
        return res.status(422).json({
            message: "Validation error",
            error: error.details ? error.details[0].message : error.message,
        });
    }
});
exports.validateUpateTask = validateUpateTask;
