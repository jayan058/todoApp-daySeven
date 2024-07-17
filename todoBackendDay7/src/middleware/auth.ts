import { Request, Response, NextFunction } from "express";
import { verify, TokenExpiredError } from "jsonwebtoken";
import config from "../config";
import UnauthorizedError from "../error/unauthorizedError";
import ForbiddenError from "../error/forbiddenError";
export interface AuthenticatedRequest extends Request {
  user?: { id: string; name: string; email: string; permissions: string[] };
}
export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { headers } = req;
  if (!headers.authorization) {
    next(new UnauthorizedError("Unauthenticated"));
    return;
  }
  const token = headers.authorization.split(" ");
  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthorizedError("Unauthenticated"));
    return;
  }
  try {
    const decoded = verify(token[1], config.jwt.jwt_secret!) as {
      id: string;
      name: string;
      email: string;
      permissions: string[];
    };

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(new UnauthorizedError("Token Expired"));
      return;
    }
    next(new UnauthorizedError("Unauthenticated"));
    return;
  }
}
export function authorize() {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user!;
    if (
      !user.permissions.includes("users.get") ||
      !user.permissions.includes("users.post") ||
      !user.permissions.includes("users.put") ||
      !user.permissions.includes("users.delete")
    ) {
      next(new ForbiddenError("Forbidden"));
      return;
    }
    next();
  };
}

export function authorizeUser() {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user!;
    if (
      !user.permissions.includes("todos.get") ||
      !user.permissions.includes("todos.post") ||
      !user.permissions.includes("todos.put") ||
      !user.permissions.includes("todos.delete")
    ) {
      next(new ForbiddenError("Forbidden"));
      return;
    }
    next();
  };
}
