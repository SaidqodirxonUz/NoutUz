/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("categories").del();
  await knex("categories").insert([
    {
      // id: 1,
      category_name: "Programming",
    },
    {
      // id: 2,
      category_name: "Office",
    },
  ]);
};
