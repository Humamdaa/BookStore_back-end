// Example backend endpoint for adding a book (Express.js)
const express = require("express");
const { verify_token } = require("../../middleware/verify_token");
const { addBook } = require("../../controllers/CRUDBooks/add_bookController");
const router = express.Router();

router.post("/", verify_token, addBook);

module.exports = router;
