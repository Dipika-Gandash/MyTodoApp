import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Dipika!");
});

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
