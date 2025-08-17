import express from "express"
import { createTodo , deleteTodo, fetchAllTodo, updateTodo} from "../controller/todoController.js";

const todoRouter = express.Router();

todoRouter.post("/create", createTodo)
todoRouter.patch("/update/:id", updateTodo)
todoRouter.get("/allTodos", fetchAllTodo)
todoRouter.delete("/deleteTodo/:id", deleteTodo)


export default todoRouter;