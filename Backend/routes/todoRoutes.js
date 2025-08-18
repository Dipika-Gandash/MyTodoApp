import express from "express"
import { createTodo , deleteTodo, fetchAllTodo, updateTodo, updateTodoStatus} from "../controller/todoController.js";

const todoRouter = express.Router();

todoRouter.post("/create", createTodo)
todoRouter.patch("/update/:id", updateTodo)
todoRouter.get("/todos", fetchAllTodo)
todoRouter.delete("/deleteTodo/:id", deleteTodo)
todoRouter.patch("/update/status/:id", updateTodoStatus)


export default todoRouter;