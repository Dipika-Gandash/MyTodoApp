import express from "express";
import { Login, profile, Register } from "../controller/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const userRouter = express.Router();

userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.get("/profile",authMiddleware, profile)

export default userRouter;