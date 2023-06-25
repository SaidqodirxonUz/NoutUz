const Joi = require("joi");

exports.patchUsersSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  role: Joi.string().valid("super_admin", "admin"),
  username: Joi.string().min(5).max(10),
  password: Joi.string().min(5),
});
