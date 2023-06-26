const db = require("../../db");
const { BadRequestError } = require("../../shared/errors");

const getModels = async (req, res, next) => {
  try {
    const models = await db("models").select("id", "name");
    return res.status(200).json({
      message: "success",
      data: models,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      status: 503,
      errMessage: `Serverda xato ${error}`,
    });
  }
};

const showModels = async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await db("models").where({ id }).first();

    if (!model) {
      return res.status(404).json({
        error: `${id} - bunday model yo'q`,
      });
    }

    return res.status(200).json({
      message: "success",
      data: model,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      status: 503,
      errMessage: `Serverda xato ${error}`,
    });
  }
};

const patchModels = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...changes } = req.body;

    const existing = await db("models").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} bunday model yo'q`,
      });
    }

    const updated = await db("models")
      .where({ id })
      .update({ ...changes })
      .returning(["id", "name"]);

    return res.status(200).json({
      updated: updated[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      status: 503,
      errMessage: `Serverda xato ${error}`,
    });
  }
};

const postModels = async (req, res, next) => {
  try {
    const { name } = req.body;

    const model = await db("models").insert({ name }).returning(["id", "name"]);

    return res.status(200).json({
      data: model,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      status: 503,
      errMessage: `Serverda xato ${error}`,
    });
  }
};

const deleteModels = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("models").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} bunday model yo'q`,
      });
    }

    const deleted = await db("models")
      .where({ id })
      .del()
      .returning(["id", "name"]);

    return res.status(200).json({
      deleted: deleted[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      status: 503,
      errMessage: `Serverda xato ${error}`,
    });
  }
};

module.exports = {
  getModels,
  postModels,
  showModels,
  patchModels,
  deleteModels,
};
