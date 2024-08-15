import express from "express";

import TodoControllers from "../controllers/todo.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";

export const todoRouter = express.Router();

todoRouter.get("/", verifyAccessToken, TodoControllers.handleGetAllTodos);
todoRouter.get("/:id", verifyAccessToken, TodoControllers.handleGetTodoById);
todoRouter.post("/", verifyAccessToken, TodoControllers.handleCreateTodo);
todoRouter.put("/:id", verifyAccessToken, TodoControllers.handleUpdateTodo);
todoRouter.delete("/:id", verifyAccessToken, TodoControllers.handleDeleteTodo);
