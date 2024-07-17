import * as userModels from "../models/users";
import ConflictError from "../error/conflictError";
import bcrypt from "bcrypt";
import NotFoundError from "../error/notFoundError";
import ValidationError from "../error/validationError";

import { BCRYPT_SALT_ROUNDS } from "../constants";

export async function createUser(
  name: string,
  password: string,
  email: string
) {
  if ((await userModels.UserModel.findByEmail(email)).length !== 0) {
    throw new ConflictError("Email already taken");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    let data = await userModels.UserModel.create(name, hashedPassword, email);
    return "User successfully created";
  } catch (error) {
    throw new ValidationError("Error creating user", " ");
  }
}



export async function getUsers(q, page, size) {
  let users = await userModels.UserModel.getUsers({ q, page, size });
  if (!users) {
    throw new NotFoundError("No users created to show");
  }
  return users;
}

export async function deleteUser(id: string) {
  let foundUser = await userModels.UserModel.findById(id);
  if (foundUser.length == 0) {
    throw new NotFoundError("No user with that id");
  }
  console.log(foundUser);

  userModels.UserModel.deleteUser(foundUser);
  return "Successfully deleted user";
}

export async function updateUser(email: string, password: string, id: string) {
  let foundUser = await userModels.UserModel.findById(id);
  if ((await foundUser).length == 0) {
    throw new NotFoundError("No user with that ID");
  }

  const existingUser = await userModels.UserModel.findByEmail(email);
  if (existingUser.length != 0) {
    throw new ConflictError("Email already taken");
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  let data = await userModels.UserModel.updateUser(
    email,
    hashedPassword,
    foundUser
  );
  return data;
}
