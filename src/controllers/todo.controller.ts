import type { NextFunction, Request, Response } from "express";

import TodoServices from "../services/todo.service";

const TodoControllers = {
  handleGetAllTodos: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allTodos = await TodoServices.getAll(next);

      res
        .status(200)
        .json({ message: "Successfully get all todos", data: allTodos });
    } catch (error) {
      next(error);
    }
  },
  handleGetTodoById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const todo = await TodoServices.getById(req.params.id, next);

      if (!todo) {
        throw {
          statusCode: 404,
          error: new Error("todo not found"),
        };
      }

      return res.status(200).json({
        message: "Successfully get todo",
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  },
  handleCreateTodo: async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, completed, userId } = req.body;

    try {
      const newTodo = await TodoServices.create(
        { title, content, completed, userId },
        next
      );

      if (!newTodo) {
        throw {
          statusCode: 400,
          error: new Error("failed to create todo"),
        };
      }

      res
        .status(201)
        .json({ message: "Successfully create todo", data: newTodo });
    } catch (error) {
      next(error);
    }
  },
  handleUpdateTodo: async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, completed, userId } = req.body;

    try {
      const updatedTodo = await TodoServices.update(
        req.params.id,
        {
          title,
          content,
          completed,
          userId,
        },
        next
      );

      return res.status(200).json({
        message: "Successfully update todo",
        data: updatedTodo,
      });
    } catch (error) {
      next(error);
    }
  },
  handleDeleteTodo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TodoServices.delete(req.params.id, next);

      return res.status(200).json({ message: "Successfully delete todo" });
    } catch (error) {
      next(error);
    }
  },
};

export default TodoControllers;
