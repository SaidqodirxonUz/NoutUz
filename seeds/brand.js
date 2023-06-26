/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("brands").del();
  await knex("brands").insert([
    {
      // id: 1,
      name: "ASUS",
    },
    {
      // id: 1,
      name: "APPLE",
    },
  ]);
};
