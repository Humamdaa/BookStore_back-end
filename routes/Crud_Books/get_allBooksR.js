const router = require("express").Router();
const { verify_token } = require("../../middleware/verify_token");
const { getAllBooks } = require("../../controllers/CRUDBooks/bookController");

// Define routes for books
router.get("/", verify_token, getAllBooks);

module.exports = router;
