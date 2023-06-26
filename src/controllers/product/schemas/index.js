const Joi = require("joi");

const postProductsSchema = Joi.object({
  name: Joi.string().required(),
  brand_id: Joi.number().required(),
  model_id: Joi.number().required(),
  category_id: Joi.number().required(),
  img_id: Joi.number(),
  description: Joi.string().required(),
  price: Joi.number().integer().positive().required(),
  created_at: Joi.date().timestamp(),
});
const patchProductsSchema = Joi.object({
  name: Joi.string(),
  brand_id: Joi.number(),
  model_id: Joi.number(),
  category_id: Joi.number(),
  img_id: Joi.number(),
  description: Joi.string(),
  price: Joi.number().integer().positive(),
  created_at: Joi.date().timestamp(),
});
module.exports = {
  postProductsSchema,
  patchProductsSchema,
};
