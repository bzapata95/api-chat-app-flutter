/**
 * path: /api/users
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, getUsers } = require("../controllers/users.controller");
const { validateFields } = require("../middlewares/validate-fields.middleware");
const { validateJWT } = require("../middlewares/validate-jwt.middleware");

const router = Router();

router.get("/", validateJWT, getUsers);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields,
  ],
  createUser
);

module.exports = router;
