const express = require("express");
const router = express.Router();
const genValidator = require("../shared/validator");
const controllers = require("../controllers/product");
const { isLoggedIn, hasRole } = require("../shared/auth");
const schemas = require("../controllers/product/schemas");

router.get("/products", isLoggedIn, controllers.getProducts);
router.get("/products/:id", isLoggedIn, controllers.showProducts);
router.post(
  "/products",
  isLoggedIn,
  hasRole(["super_admin", "admin"]),
  genValidator(schemas.postProductsSchema),
  controllers.postProducts
);

router.patch(
  "/products/:id",
  isLoggedIn,
  hasRole(["super_admin", "admin"]),
  genValidator(schemas.patchProductsSchema),
  controllers.patchProducts
);
router.delete(
  "/products/:id",
  isLoggedIn,
  hasRole(["super_admin", "admin"]),
  controllers.deleteProducts
);

module.exports = router;
