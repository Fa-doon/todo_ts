"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const userValidation_1 = require("../middlewares/userValidation");
const router = (0, express_1.Router)();
router.post("/register", userValidation_1.validateNewUser, authController_1.createUser);
router.post("/login", userValidation_1.validateLoginUser, authController_1.loginUser);
exports.default = router;
