import type { NextFunction } from "express";

import TodoRepositories from "../repositories/todo.repository";
import { ITodo } from "../types";

const TodoServices = {
  getAll: async (next: NextFunction) => {
    try {
      const allTodos = await TodoRepositories.getAll(next);
      return allTodos;
    } catch (error) {
      next(error);
    }
  },
  getById: async (todoId: string, next: NextFunction) => {
    try {
      const todo = await TodoRepositories.getById(todoId, next);
      return todo;
    } catch (error) {
      next(error);
    }
  },
  create: async (todo: ITodo, next: NextFunction) => {
    try {
      // input validation
      if (
        !todo.title ||
        !todo.content ||
        typeof todo.completed === undefined ||
        !todo.userId
      ) {
        throw {
          statusCode: 400,
          error: new Error(
            "title, content, completed, and userId can not be empty"
          ),
        };
      }

      const newTodo = await TodoRepositories.create(todo, next);
      return newTodo;
    } catch (error) {
      next(error);
    }
  },
  update: async (todoId: string, updatedData: ITodo, next: NextFunction) => {
    try {
      // input validation
      if (
        !updatedData.title ||
        !updatedData.content ||
        typeof updatedData.completed === undefined ||
        !updatedData.userId
      ) {
        throw {
          statusCode: 400,
          error: new Error(
            "title, content, completed, and userId can not be empty"
          ),
        };
      }

      const updatedTodo = await TodoRepositories.update(
        todoId,
        updatedData,
        next
      );
      return updatedTodo;
    } catch (error) {
      console.log(`Error in ThreadServices.update: ${error}`);
    }
  },
  delete: async (todoId: string, next: NextFunction) => {
    try {
      await TodoRepositories.delete(todoId, next);
    } catch (error) {
      next(error);
    }
  },
};

export default TodoServices;
