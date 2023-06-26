const Joi = require("joi");

exports.patchModelSchema = Joi.object({
  name: Joi.string().required(),
});
exports.postModelSchema = Joi.object({
  name: Joi.string().required(),
});
