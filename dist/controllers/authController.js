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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Register a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, username, email, password } = req.body;
        const existingUser = yield user_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const existingUsername = yield user_1.default.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(409).json({ message: "Username already exists" });
        }
        const createdUser = yield user_1.default.create({
            fullname,
            username,
            email,
            password,
        });
        const _a = createdUser.get({ plain: true }), { password: _ } = _a, userDetails = __rest(_a, ["password"]);
        return res.status(201).json({
            message: "Registration successful",
            user: userDetails,
        });
    }
    catch (error) {
        console.log("Error registering user", error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});
exports.createUser = createUser;
// Login a user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // find user in the db
        const user = yield user_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        // check password match
        const isValidPassword = yield user.isMatch(password);
        if (!isValidPassword) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        // generate token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({
            message: "Login successful",
            token: token,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});
exports.loginUser = loginUser;
