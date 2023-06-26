const express = require("express");
const genValidator = require("../shared/validator");
const controllers = require("../controllers/brands");
const { isLoggedIn, hasRole } = require("../shared/auth");
const schemas = require("../controllers/brands/schemas");

const router = express.Router();

router.get("/brands", isLoggedIn, controllers.getBrands);
router.get("/brands/:id", isLoggedIn, controllers.showBrands);
router.post(
  "/brands",
  isLoggedIn,
  hasRole(["super_admin", "admin"]),
  genValidator(schemas.postBrandSchema),
  controllers.postBrands
);
router.patch(
  "/brands/:id",
  isLoggedIn,
  hasRole(["super_admin", "admin"]),
  genValidator(schemas.patchBrandSchema),
  controllers.patchBrands
);
router.delete(
  "/brands/:id",
  isLoggedIn,
  hasRole(["super_admin", "admin"]),
  controllers.deleteBrands
);

module.exports = router;
