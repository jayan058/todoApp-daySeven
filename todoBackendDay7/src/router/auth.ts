import express from "express";
import * as authController from "../controller/auth";
import { validateBody } from "../middleware/validation";
import { loginSchema } from "../schema/login";
const authRoute = express();

authRoute.post("/", validateBody(loginSchema), authController.login);

authRoute.post("/token", authController.handleTokenRefresh);

export default authRoute;
