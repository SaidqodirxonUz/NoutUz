const express = require("express");
const genValidator = require("../shared/validator");
const controllers = require("../controllers/categories");
const { isLoggedIn, hasRole } = require("../shared/auth");
const schemas = require("../controllers/categories/schemas");

const router = express.Router();

router.get("/categories", isLoggedIn, controllers.getCategories);
router.get("/categories/:id", isLoggedIn, controllers.showCategories);
router.post(
  "/categories",
  isLoggedIn,
  hasRole(["super_admin", "admin"]),
  genValidator(schemas.postCategoriesSchema),
  controllers.postCategories
);
router.patch(
  "/categories/:id",
  isLoggedIn,
  hasRole(["super_admin", "admin"]),
  genValidator(schemas.patchCategoriesSchema),
  controllers.patchCategories
);
router.delete(
  "/categories/:id",
  isLoggedIn,
  hasRole(["super_admin", "admin"]),
  controllers.deleteCategories
);

module.exports = router;
