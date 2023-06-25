const { hashSync } = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      // id: 1,
      first_name: "Saidqodirxon",
      last_name: "Rahimov",
      username: "realcoder",
      role: "super_admin",
      password: hashSync("realcoderuz", 10),
    },
    {
      // id: 2,
      first_name: "Eshmat",
      last_name: "Toshmatov",
      username: "eshmatuz",
      role: "admin",
      password: hashSync("EshmatToshmatov01", 10),
    },
  ]);
};
