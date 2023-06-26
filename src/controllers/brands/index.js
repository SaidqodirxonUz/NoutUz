const { default: knex } = require("knex");
const db = require("../../db");
const { BadRequestErr, NotFoundErr } = require("../../shared/errors");

const getBrands = async (req, res, next) => {
  try {
    const brands = await db("brands").select("id", "name");
    return res.status(200).json({
      message: "success",
      data: brands,
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      status: 503,
      errMessage: `Serverda xato: ${error}`,
    });
  }
};

const showBrands = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await db("brands").where({ id }).first();
    if (!brand) {
      return res.status(404).json({
        error: `${id} - bunday brand yo'q`,
      });
    }
    return res.status(200).json({
      message: "success",
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

const patchBrands = async (req, res, next) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;
    const existing = await db("brands").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-bunday brand yo'q`,
      });
    }

    const updated = await db("brands")
      .where({ id })
      .update({ ...changes })
      .returning(["id", "name"]);

    res.status(200).json({
      updated: updated[0],
    });
  } catch (error) {
    next(error);
  }
};

const postBrands = async (req, res, next) => {
  try {
    const { brand_name } = req.body;
    const brand = await db("brands").insert({ name: brand_name });

    res.status(200).json({
      // data: brand,
      ms: "Brand Muvvaqiyatli qoshildi ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Brend Qoshilmadi`,
    });
  }
};

const deleteBrands = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("brands").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-bunday brand yo'q`,
      });
    }

    const del = await db("brands").where({ id }).del();

    res.status(200).json({
      deleted: del,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBrands,
  postBrands,
  showBrands,
  patchBrands,
  deleteBrands,
};
