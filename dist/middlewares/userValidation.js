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
exports.validateLoginUser = exports.validateNewUser = void 0;
const joi_1 = __importDefault(require("joi"));
const validateNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const schema = joi_1.default.object({
        fullname: joi_1.default.string().required().messages({
            "string.base": "Invalid type, please provide a valid string",
            "any.required": "Name is required",
            "string.empty": "Name cannot be empty",
        }),
        email: joi_1.default.string().email().required().messages({
            "string.email": "Please provide a valid email address",
            "any.required": "Email is required",
            "string.empty": "Email cannot be empty",
        }),
        password: joi_1.default.string().min(6).required().messages({
            "string.min": "Password must not be less than 6 characters",
            "any.required": "Password is required",
            "string.empty": "Password cannot be empty",
        }),
        username: joi_1.default.string().required().messages({
            "any.required": "Username is required",
            "string.empty": "Username cannot be empty",
            "string.base": "Invalid type, please provide a valid string",
        }),
    });
    try {
        yield schema.validateAsync(user, { abortEarly: true });
        next();
    }
    catch (error) {
        return res.status(422).json({
            message: "Validation error",
            error: error.details ? error.details[0].message : error.message,
        });
    }
});
exports.validateNewUser = validateNewUser;
const validateLoginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required().messages({
            "string.email": "Please provide a valid email address",
            "any.required": "Email is required",
            "string.empty": "Email cannot be empty",
        }),
        password: joi_1.default.string().required().messages({
            "any.required": "Password is required",
            "string.empty": "Password cannot be empty",
        }),
    });
    try {
        yield schema.validateAsync(user, { abortEarly: true });
        next();
    }
    catch (error) {
        return res.status(422).json({
            message: "Validation error",
            error: error.details ? error.details[0].message : error.message,
        });
    }
});
exports.validateLoginUser = validateLoginUser;
