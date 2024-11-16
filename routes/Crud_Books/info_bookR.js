// Example backend endpoint for adding a book (Express.js)
const express = require("express");
const { verify_token } = require("../../middleware/verify_token");
const { infoBook } = require("../../controllers/CRUDBooks/info_bookController");
const router = express.Router();



router.get("/:id", verify_token, infoBook);

module.exports = router;
