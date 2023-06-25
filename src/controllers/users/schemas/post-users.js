const Joi = require("joi");

exports.postUsersSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  role: Joi.string().valid("super_admin", "admin").required(),
  username: Joi.string().required().min(5).max(10),
  password: Joi.string().required().min(5),
});
