import BaseModel from "./baseModel";
export class UserModel extends BaseModel {
  static async create(name: string, password: string, email: string, user_id) {
    const userToCreate = {
      name: name,
      password: password,
      email: email,
      created_by: user_id,
      updated_by: user_id,
      updated_at: new Date().toISOString(),
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
    return { name: name, email: email, password: password };
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
  static async updateUser(email, password, userToUpdate, user_id) {
    const updatedUser = await this.queryBuilder()
      .from("users")
      .where({ email: userToUpdate[0].email })
      .update({
        email: email,
        password: password,
        updated_by: user_id,
        updated_at: new Date().toISOString(),
      });

    return { email: email, password: password };
  }
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

  static async deleteUser(user) {
    await this.queryBuilder()
      .from("todos")
      .where({ user_id: user[0].id })
      .del();
    await this.queryBuilder()
      .from("users_roles")
      .where({ user_id: user[0].id })
      .del();
    await this.queryBuilder().from("users").where({ id: user[0].id }).del();
  }
}
