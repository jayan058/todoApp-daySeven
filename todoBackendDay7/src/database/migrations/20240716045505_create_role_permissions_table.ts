import { Knex } from "knex";

const TABLE_NAME = "roles_permissions";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table
      .integer("role_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("roles");
    table
      .integer("permission_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("permissions");
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
