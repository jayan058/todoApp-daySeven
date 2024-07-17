import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import * as userServices from "../services/user";
export async function createUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, password, email } = req.body;
    const message = await userServices.createUser(
      name,
      password,
      email,
      req.user.id!
    );
    res.json(message);
  } catch (error) {
    next(error);
  }
}

export async function getUsers(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { q, page, size } = req.query;

    const message = await userServices.getUsers(q, page, size);
    res.json(message);
  } catch (error) {
    next(error);
  }
}
export async function deleteUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const message = await userServices.deleteUser(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
}
export async function updateUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const { email, password } = req.body;
    const message = await userServices.updateUser(
      email,
      password,
      id,
      req.user.id
    );
    res.json(message);
  } catch (error) {
    next(error);
  }
}
