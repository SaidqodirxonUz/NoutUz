/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("products", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table
            .integer("brand_id")
            .references("id")
            .inTable("brands")
            .onDelete("SET NULL");
        table
            .integer("model_id")
            .references("id")
            .inTable("models")
            .onDelete("SET NULL");
        table
            .integer("category_id")
            .references("id")
            .inTable("categories")
            .onDelete("SET NULL");
        table.text("description").defaultTo(" ");
        table.integer("price").defaultTo(0);
        table
            .integer("img_id")
            .references("id")
            .inTable("images")
            .onDelete("SET NULL");
        table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("products");
};
