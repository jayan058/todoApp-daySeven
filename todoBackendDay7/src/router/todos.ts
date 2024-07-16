import express from "express";
import * as todosController from "../controller/todos";
import { authenticate, authorizeUser } from "../middleware/auth";
import { validateBody, validateParams } from "../middleware/validation";
import {
  createTodoSchema,
  updateTodoSchema,
  todoIdSchema,
} from "../schema/todo";

const todoRoute = express();

todoRoute.get("/", authenticate, authorizeUser(), todosController.getAllTodos);

todoRoute.post(
  "/addTodos",
  authenticate,
  authorizeUser(),
  validateBody(createTodoSchema),
  todosController.addTodo
);

todoRoute.put(
  "/updateTodos/:id",
  authenticate,
  authorizeUser(),
  validateParams(todoIdSchema),
  validateBody(updateTodoSchema),
  todosController.updateTodo
);

todoRoute.delete(
  "/deleteTodos/:id",
  authenticate,
  authorizeUser(),
  validateParams(todoIdSchema),
  todosController.deleteTodo
);

export default todoRoute;
