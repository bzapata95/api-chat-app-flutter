/**
 * path: /api/sessions
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { createSession, renewToken } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validate-fields.middleware");
const { validateJWT } = require("../middlewares/validate-jwt.middleware");

const router = Router();

router.post(
  "/",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields,
  ],
  createSession
);
router.get("/renew", validateJWT, renewToken);

module.exports = router;
