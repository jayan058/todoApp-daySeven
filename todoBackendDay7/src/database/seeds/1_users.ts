import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          name: "jaya",
          email: "jaya@jaya.com",
          password:
            "$2b$10$WRtpcSefdl/Q6UvAiVdMau.wEOAOzw8ldCuO/zVyDft.WqHCtr2cG",
          updated_at:new Date().toISOString(),
          created_by:"1",
          updated_by:"1"
        },
      ]);
    });
}
