/**
 * path: /api/messages
 */

const { Router } = require("express");
const { getChat } = require("../controllers/messages.controller");
const { validateJWT } = require("../middlewares/validate-jwt.middleware");

const router = Router();

router.get("/:from", validateJWT, getChat);
module.exports = router;
