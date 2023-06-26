const express = require("express");
const genValidator = require("../shared/validator");
const controllers = require("../controllers/models");
const { isLoggedIn, hasRole } = require("../shared/auth");
const schemas = require("../controllers/models/schemas");

const router = express.Router();

router.get("/models", isLoggedIn, controllers.getModels);
router.get("/models/:id", isLoggedIn, controllers.showModels);
router.post(
  "/models",
  isLoggedIn,
  hasRole(["super_admin", "admin"]),
  genValidator(schemas.postModelSchema),
  controllers.postModels
);
router.patch(
  "/models/:id",
  isLoggedIn,
  hasRole(["super_admin", "admin"]),
  genValidator(schemas.patchModel),
  controllers.patchModels
);
router.delete(
  "/models/:id",
  isLoggedIn,
  hasRole(["super_admin", "admin"]),
  controllers.deleteModels
);

module.exports = router;
