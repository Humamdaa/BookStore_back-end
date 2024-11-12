const express = require("express");
const { verify_token } = require("../../middleware/verify_token");
const { delBook } = require("../../controllers/CRUDBooks/del_bookController");
const router = express.Router();

router.delete("/:id", verify_token, delBook);

module.exports = router;
