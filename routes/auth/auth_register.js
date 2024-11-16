const router = require("express").Router();
const { regiterCon } = require("../../controllers/auth/registerController");

router.post("/", regiterCon);

module.exports = router;
