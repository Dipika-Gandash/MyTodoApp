import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/database.js";
import bcrypt from "bcrypt";
import todoRouter from "./routes/TodoRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/todo", todoRouter);

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
