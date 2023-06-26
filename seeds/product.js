const { hashSync } = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("products").del();
  await knex("products").insert([
    {
      // id: 1,
      name: "ASUS Expertbook 15",
      brand_id: 1,
      model_id: 1,
      category_id: 1,
      description: "Zo`r Noteebook",
      price: 6666000,
    },
    {
      // id: 2,
      name: "MACBOOK Air M1 12",
      brand_id: 2,
      model_id: 2,
      category_id: 1,
      img_id: 11,
      description: "Qimmat boganidan keyin zo`r boladida ",
      price: 16666000,
    },
  ]);
};
