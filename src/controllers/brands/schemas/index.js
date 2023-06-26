const Joi = require("joi");

patchBrandSchema = Joi.object({
  name: Joi.string().required(),
});
postBrandSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  patchBrandSchema,
  postBrandSchema,
};
