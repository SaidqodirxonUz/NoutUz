/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("images").del();
  await knex("images").insert([
    {
      img_url: "https://realcoder.uz/rc.png",
    },
    {
      img_url: "https://saidqodirxon.uz/srx.png",
    },
  ]);
};
