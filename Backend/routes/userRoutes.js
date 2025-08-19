import express from "express";
import { Login, profile, Register, updateProfile } from "../controller/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.get("/profile",authMiddleware, profile)
userRouter.patch("/update/profile", authMiddleware, updateProfile)

export default userRouter;