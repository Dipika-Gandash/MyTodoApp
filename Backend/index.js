import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/database.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import todoRouter from "./routes/TodoRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173",
  methods : ["GET", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-type", "Authorization"],
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/todo", todoRouter);
app.use("/user", userRouter);


try {
  await connectDB();
  console.log("Database connected");

  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:3000");
  });
} catch (error) {
  console.error("❌ Failed to start:", error.message);
  process.exit(1);
}
