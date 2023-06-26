/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("models", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table
            .integer("img_id")
            .references("id")
            .inTable("images")
            .onDelete("SET NULL");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("models");
};
