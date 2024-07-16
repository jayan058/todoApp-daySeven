import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6),
});

export const userIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
export const getUserSchema = Joi.object({
q:Joi.string().optional(),
page:Joi.number().optional().messages({
  "number.base":"Page must me a number"
})
.default(1),
size:Joi.number()
.min(1)
.max(10)
.optional()
.messages({
    "number.base":"Page must me a number",
    "number.min":"Size must be greater than zero",
    "number.max":"Size must be less than 10"
})
});

