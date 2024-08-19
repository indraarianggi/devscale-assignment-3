import { ITodo } from "../types";
import { Todo } from "../models/todo.schema";

const TodoRepositories = {
  getAll: async () => {
    try {
      const allTodos = await Todo.find();
      return allTodos;
    } catch (error) {
      throw error;
    }
  },
  getById: async (todoId: string) => {
    try {
      const todo = await Todo.findById(todoId).populate("userId");
      return todo;
    } catch (error) {
      throw error;
    }
  },
  create: async (todo: ITodo) => {
    try {
      const createTodo = new Todo(todo);

      const newTodo = await createTodo.save();

      return newTodo;
    } catch (error) {
      throw error;
    }
  },
  update: async (todoId: string, updatedData: ITodo) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(todoId, updatedData);
      return updatedTodo;
    } catch (error) {
      throw error;
    }
  },
  delete: async (todoId: string) => {
    try {
      await Todo.findByIdAndDelete(todoId);
    } catch (error) {
      throw error;
    }
  },
};

export default TodoRepositories;
