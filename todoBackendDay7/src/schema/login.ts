import Joi from "joi";


export const loginSchema = Joi.object({
    email: Joi.string(),
    password: Joi.string(),
  });