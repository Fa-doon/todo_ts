import { Router } from "express";
import { createUser, loginUser } from "../controllers/authController";
import { validateLoginUser, validateNewUser } from "../middlewares/userValidation";

const router = Router();

router.post("/register", validateNewUser, createUser);
router.post("/login", validateLoginUser, loginUser);

export default router;
