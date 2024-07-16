import { User } from "../interface/user";
import BaseModel from "./baseModel";
export type users = {
  id: string;
  name: string;
  password: string;
  email: string;
  todos: string[];
  permission: string[];
};
export let users: users[] = [
  {
    id: "1",
    name: "jayan",
    password: "$2b$10$z/92iZB5uuHVB.5Nwa2DRuV/VCSS8jZMTAnV.IcZzbWm7Jqn7rjMK",
    email: "jayan@jayan.com",
    todos: ["1"],
    permission: ["super admin"],
  },
  {
    id: "2",
    name: "jaya",
    password: "$2b$10$rjCKr1R6cwFFLsr5ohc64u.LbM6SXyzI.I/8fb1Nid5RQQtw2KBUK",
    email: "jaya@jaya.com",
    todos: ["2"],
    permission: [],
  },
];

export class UserModel extends BaseModel {
  static async create(name: string, password: string, email: string) {
    const userToCreate = {
      name: name,
      password: password,
      email: email,
    };
    await this.queryBuilder().insert(userToCreate).table("Users");
    let userId = await this.queryBuilder()
      .select("id")
      .table("Users")
      .where("email", email);

    const role = {
      roles_id: 2,
      user_id: userId[0].id,
    };

    await this.queryBuilder().insert(role).table("users_roles");
  }
  static async findByEmail(email) {
    let matchingEmail = await this.queryBuilder()
      .select("*")
      .from("Users")
      .where("email", email);

    return matchingEmail;
  }
  static async getUsers(filter) {
    const { q, page, size } = filter;

    const query = await this.queryBuilder()
      .select("id", "email", "name")
      .table("users")
      .limit(size)
      .offset((page - 1) * size)
      .whereLike("name", `%${q}%`);

    return query;
  }
  static async updateUser(user, email, password) {}
  static async findById(id) {
    let matchingId = await this.queryBuilder()
      .select("*")
      .from("Users")
      .where("id", id);

    return matchingId;
  }

  static async findUserPermission(email) {
    let permissions = await this.queryBuilder()
      .select("permissions")
      .from("users")
      .join("users_roles", "users.id", "users_roles.user_id")
      .join("roles", "users_roles.roles_id", "roles.id")
      .join("roles_permissions", "roles.id", "roles_permissions.role_id")
      .join("permissions", "roles_permissions.permission_id", "permissions.id")
      .where("email", email);

    return permissions;
  }
}

export function findUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}
export function findUserById(id: string) {
  return users.find((user) => user.id == id);
}

export function deleteUser(user: User) {
  users = users.filter((existingUser) => existingUser.id !== user.id);
}
export function updateUser(user: any, email: string, password: string) {
  user.email = email;
  user.password = password;
  return user;
}
