const { BadRequestError } = require("../../shared/errors");
const db = require("../../db");

const getCategories = async (req, res, next) => {
  try {
    const categories = await db
      .select("id", "category_name")
      .from("categories");
    res.status(200).json({
      message: "success",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      status: 503,
      errMessage: `Serverda xato: ${error}`,
    });
  }
};

const showCategories = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await db("categories").where({ id }).first();
    if (!category) {
      return res.status(400).json({
        error: `${id} - bunday kategoriya yo'q`,
      });
    }
    res.status(200).json({
      message: "success",
      data: category,
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      status: 503,
      errMessage: `Serverda xato: ${error}`,
    });
  }
};

const patchCategories = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...changes } = req.body;
    const existing = await db("categories").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} - bunday kategoriya yo'q`,
      });
    }

    await db("categories")
      .where({ id })
      .update({ ...changes });

    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      status: 503,
      errMessage: `Serverda xato: ${error}`,
    });
  }
};

const postCategories = async (req, res, next) => {
  try {
    const { category_name } = req.body;
    const category = await db("categories").insert({ category_name });
    const ms = "categoriya qoshildi";
    res.status(200).json({
      message: "success",
      // data: category,
      ms,
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      status: 503,
      errMessage: `Serverda xato: ${error}`,
    });
  }
};

const deleteCategories = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("categories").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} - bunday kategoriya yo'q`,
      });
    }

    await db("categories").where({ id }).del();

    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      status: 503,
      errMessage: `Serverda xato: ${error}`,
    });
  }
};

module.exports = {
  getCategories,
  postCategories,
  showCategories,
  patchCategories,
  deleteCategories,
};
