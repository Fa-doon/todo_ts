"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const env_1 = require("./env");
const todo_1 = __importDefault(require("../models/todo"));
const user_1 = __importDefault(require("../models/user"));
const sequelize = new sequelize_typescript_1.Sequelize({
    database: env_1.DB_NAME,
    username: env_1.DB_USER,
    password: env_1.DB_PASSWORD,
    host: env_1.DB_HOST,
    dialect: "mysql",
    logging: false,
    models: [todo_1.default, user_1.default],
});
exports.default = sequelize;
