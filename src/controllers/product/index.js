const express = require("express");
const config = require("../../shared/config");
const db = require("../../db");
const { BadRequestError, NotFoundError } = require("../../shared/errors");

const postProducts = async (req, res, next) => {
  try {
    const { name, description, price, brand_id, category_id, model_id } =
      req.body;

    const existing = await db("products")
      .where({ name })
      .select("name")
      .first();

    // if (!existing) {
    //   throw new BadRequestError("bbu mahsulot sizda bor!");
    // }

    // Vaqt yetsa o`zgartiriladi

    const img_url = 11;

    // const img_url = `http://localhost:${config.port}/images/${req.file.filename}`;

    const Product = await db("products")
      .insert({
        name,
        description,
        price,
        brand_id,
        model_id,
        category_id,
        img_id: img_url,
      })
      .returning("*");

    res.status(201).json({ Product });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const {
      q,
      limit = 16,
      offset = 0,
      sort_by = "id",
      sort_order = "DESC",
    } = req.query;

    const existing = db("products")
      .select("id", "name", "price", "description", "img_id")
      .returning("*");

    if (!existing) {
      throw new NotFoundError("Mahsulot Topilmadi !");
    }

    if (q) {
      existing.andWhereILike("name", `%${q}%`);
      existing.orWhereILike("description", `%${q}%`);
    }

    const count = await existing.clone().groupBy("id").count();
    existing.orderBy(sort_by, sort_order);
    existing.limit(limit).offset(offset);

    const result = await existing;

    res.status(200).json({
      noutbook: result,
      noutInfo: {
        noutCount: count.length,
        limit,
        offset,
      },
    });
  } catch (error) {
    next(error);
  }
};

const showProducts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await db("products")
      .leftJoin(
        "brands AS brand_noutbook",
        "brand_noutbook.id",
        "products.brand_id"
      )
      .leftJoin(
        "models AS model_noutbook",
        "model_noutbook.id",
        "products.model_id"
      )
      .leftJoin(
        "categorys AS category_noutbook",
        "category_noutbook.id",
        "products.category_id"
      )
      .select(
        "products.id",
        "products.name",
        "products.price",
        "products.image",
        "products.description",
        db.raw(
          `json_build_object('id', brand_noutbook.id, 'brand', brand_noutbook.name) AS noutbook_brand`
        ),
        db.raw(
          `json_build_object('id', model_noutbook.id, 'model', model_noutbook.name) AS noutbook_model`
        ),
        db.raw(
          `json_build_object('id', category_noutbook.id, 'category', category_noutbook.name) AS noutbook_category`
        )
      )
      .where({ "products.id": id })
      .first();

    if (!result) {
      throw new NotFoundError("Mahsulot Topilmadi !");
    }

    res.status(200).json({ laptop: result });
  } catch (error) {
    next(error);
  }
};

const patchProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...changes } = req.body;

    const existing = await db("products")
      .where({ id })
      .select("id", "name", "description", "img_id")
      .first();

    if (!existing) {
      throw new NotFoundError("Mahsulot Topilmadi !");
    }

    if (req?.file?.filename) {
      changes.image = `http://localhost:${config.port}/images/${req.file.filename}`;
    }

    const updated = await db("products")
      .where({ id })
      .update({ ...changes })
      .returning("*");

    res.status(200).json({ update: updated[0] });
  } catch (error) {
    next(error);
  }
};

const deleteProducts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await db("products")
      .where({ id })
      .select("id", "name", "description", "img_id")
      .first();

    if (!existing) {
      throw new NotFoundError("Mahsulot Topilmadi !");
    }

    const deleted = await db("products")
      .where({ id })
      .delete()
      .returning(["id", "name", "description", "img_id"]);

    res.status(200).json({ deleted: deleted[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  postProducts,
  showProducts,
  patchProducts,
  deleteProducts,
};
