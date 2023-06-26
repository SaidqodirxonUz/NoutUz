/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("models").del();
  await knex("models").insert([
    {
      // id: 1,
      name: "Expertbook",
    },
    {
      // id: 1,
      name: "MACBOOK",
    },
  ]);
};
