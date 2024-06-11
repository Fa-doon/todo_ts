"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const db_1 = __importDefault(require("./config/db"));
// Importing routes
const todoRoute_1 = __importDefault(require("./routes/todoRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const app = (0, express_1.default)();
const port = env_1.PORT || 3000;
// Middlewares
app.use(express_1.default.json());
app.use("/api/todo", todoRoute_1.default);
app.use("/api/auth", authRoute_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
// Test database connection and sync models
db_1.default
    .authenticate()
    .then(() => {
    console.log("Database connected successfully");
    return db_1.default.sync();
})
    .then(() => {
    console.log("Models synced");
})
    .catch((err) => {
    console.log("An error occured", err);
});
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
