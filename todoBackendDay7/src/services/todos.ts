import * as todosModels from "./../models/todos";
import { ITodo } from "./../interface/todo";
import * as userModels from "../models/users";
import UnauthorizedError from "../error/unauthorizedError";
import NotFoundError from "../error/notFoundError";
import { NextFunction } from "express";
export async function getAllTodos(user: any) {
  let todos = todosModels.TodoModel.getTodos(user);
  if (todos) {
    return todos;
  } else {
    throw new NotFoundError("Todos Not Found");
  }
}
export async function addTodo(todo: ITodo, headers: any) {
  const userId = headers.id;
  const user = await userModels.UserModel.findById(userId);
  if (!user) {
    throw new NotFoundError("User Not Found");
  }

  let message = todosModels.TodoModel.createTodos(todo, user[0]);
  return message;
}
export async function updateTodo(
  id: string,
  name: string,
  isDone: boolean,
  userId: string,
  next: NextFunction
) {
  const todo = await todosModels.TodoModel.findTodoFromId(id);
  if (todo.length == 0) {
    throw new NotFoundError("Todo with that ID doesn't exist");
  }

  if (todo[0].userId != userId) {
    throw new UnauthorizedError("Cannot update someone else's Todo");
  }
  todosModels.TodoModel.updateTodo(todo, name, isDone,userId);
  return "Success updation of todo";
}
export async function deleteTodo(id: string, userId: string) {
  const todo = await todosModels.TodoModel.findTodoFromId(id);
  if (todo.length == 0) {
    throw new NotFoundError("Todo with that ID doesn't exist");
  }

  if (todo[0].userId != userId) {
    throw new UnauthorizedError("Cannot delete someone else's Todo");
  }
  todosModels.TodoModel.deleteTodo(todo);
  return "Successfully deleted Todo";
}
