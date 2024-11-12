// Example backend endpoint for adding a book (Express.js)
const express = require("express");
const { verify_token } = require("../../middleware/verify_token");
const { editBook } = require("../../controllers/CRUDBooks/edit_bookController");
const router = express.Router();

router.put("/:id", verify_token, editBook);

module.exports = router;
