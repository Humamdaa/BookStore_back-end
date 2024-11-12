const express = require("express");
const router = express.Router();
const { verify_token } = require("../../middleware/verify_token");
const { getUserData } = require("../../controllers/user_dataController");

router.get("/", verify_token, getUserData);

module.exports = router;
