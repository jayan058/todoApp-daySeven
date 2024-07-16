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

  if ((await userModels.UserModel.findByEmail(email)).length!==0) {
    throw new ConflictError("Email already taken");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    let data =await  userModels.UserModel.create(name,hashedPassword,email)
    return "User successfully created";
  } catch (error) {
    throw new ValidationError("Error creating user", " ");
  }
}

export async function findUserById(id: string) {
  let foundUser = userModels.findUserById(id);
  if (!foundUser) {
    throw new NotFoundError("No user with that id");
  }
  return foundUser;
}

export async function getUsers(q,page,size) {
  let users =await  userModels.UserModel.getUsers({q,page,size});
;
  
  if (!users) {
    throw new NotFoundError("No users created to show");
  }
  return users;
}

export async function deleteUser(id: string) {
  let foundUser = userModels.findUserById(id);
  if (!foundUser) {
    throw new NotFoundError("No user with that id");
  }
  userModels.deleteUser(foundUser);
  return "Successfully deleted user";
}

export async function updateUser(email: string, password: string, id: string) {
  let foundUser = userModels.UserModel.findById(id);
  if (!foundUser) {
    throw new NotFoundError("No user with that ID");
  }

  const existingUser = await userModels.UserModel.findByEmail(email);
  if (existingUser && existingUser[0].id !== foundUser[0].id) {
    throw new ConflictError("Email already taken");
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  let data = userModels.UserModel.updateUser(foundUser, email, hashedPassword);
  return data;
}

export function add(a, b) {
  return a + b;
}
