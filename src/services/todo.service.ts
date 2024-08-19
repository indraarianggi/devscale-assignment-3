import type { NextFunction } from "express";

import TodoRepositories from "../repositories/todo.repository";
import { ITodo } from "../types";
import { createError } from "../utils/error";

const TodoServices = {
  getAll: async () => {
    try {
      const allTodos = await TodoRepositories.getAll();
      return allTodos;
    } catch (error) {
      throw error;
    }
  },
  getById: async (todoId: string) => {
    try {
      const todo = await TodoRepositories.getById(todoId);
      return todo;
    } catch (error) {
      throw error;
    }
  },
  create: async (todo: ITodo) => {
    try {
      // input validation
      if (
        !todo.title ||
        !todo.content ||
        typeof todo.completed === undefined ||
        !todo.userId
      ) {
        throw createError(
          400,
          "title, content, completed, and userId can not be empty"
        );
      }

      const newTodo = await TodoRepositories.create(todo);
      return newTodo;
    } catch (error) {
      throw error;
    }
  },
  update: async (todoId: string, updatedData: ITodo) => {
    try {
      // input validation
      if (
        !updatedData.title ||
        !updatedData.content ||
        typeof updatedData.completed === undefined ||
        !updatedData.userId
      ) {
        throw createError(
          400,
          "title, content, completed, and userId can not be empty"
        );
      }

      const updatedTodo = await TodoRepositories.update(todoId, updatedData);
      return updatedTodo;
    } catch (error) {
      throw error;
    }
  },
  delete: async (todoId: string) => {
    try {
      await TodoRepositories.delete(todoId);
    } catch (error) {
      throw error;
    }
  },
};

export default TodoServices;
