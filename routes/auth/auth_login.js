const router = require("express").Router();
const { loginCont } = require("../../controllers/auth/loginController");

router.post("/", loginCont);

module.exports = router;
