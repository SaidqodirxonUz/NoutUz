/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = async function (knex) {
    await knex.schema.createTable("brands", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.integer("image_id").unsigned();
        table
            .foreign("image_id")
            .references("id")
            .inTable("images")
            .onDelete("SET NULL");
    });
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.down = async function (knex) {
    await knex.schema.dropTable("brands");
};
