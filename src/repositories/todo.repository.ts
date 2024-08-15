import type { NextFunction } from "express";

import { ITodo } from "../types";
import { Todo } from "../models/todo.schema";

const TodoRepositories = {
  getAll: async (next: NextFunction) => {
    try {
      const allTodos = await Todo.find();
      return allTodos;
    } catch (error) {
      next(error);
    }
  },
  getById: async (todoId: string, next: NextFunction) => {
    try {
      const todo = await Todo.findById(todoId).populate("userId");
      return todo;
    } catch (error) {
      next(error);
    }
  },
  create: async (todo: ITodo, next: NextFunction) => {
    try {
      const createTodo = new Todo(todo);

      const newTodo = await createTodo.save();

      return newTodo;
    } catch (error) {
      next(error);
    }
  },
  update: async (todoId: string, updatedData: ITodo, next: NextFunction) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(todoId, updatedData);
      return updatedTodo;
    } catch (error) {
      next(error);
    }
  },
  delete: async (todoId: string, next: NextFunction) => {
    try {
      await Todo.findByIdAndDelete(todoId);
    } catch (error) {
      next(error);
    }
  },
};

export default TodoRepositories;
