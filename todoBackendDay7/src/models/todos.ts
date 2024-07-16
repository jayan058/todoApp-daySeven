import BaseModel from "./baseModel";
export class TodoModel extends BaseModel {
  static async getTodos(user) {
    let todos = await this.queryBuilder()
      .select("todos.name", "todos.status", "todos.id")
      .from("Users")
      .join("todos", "Users.id", "todos.user_id")
      .where("user_id", user.id);
    return todos;
  }
  static async createTodos(todo, user) {
    const todoToCreate = {
      name: todo.name,
      status: todo.isDone,
      user_id: user.id,
      created_by: user.id,
    };
    await this.queryBuilder().insert(todoToCreate).table("todos");
  }

  static async findTodoFromId(id) {
    let matchingEmail = await this.queryBuilder()
      .select("*")
      .from("todos")
      .where("id", id);

    return matchingEmail;
  }
  static async updateTodo(todo, name, isDone, userId) {
    await this.queryBuilder().from("todos").where({ id: todo[0].id }).update({
      name: name,
      status: isDone,
      updated_by: userId,
    });
  }
  static async deleteTodo(todo) {
    await this.queryBuilder().from("todos").where({ id: todo[0].id }).del();
  }
}
