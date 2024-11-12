const router = require("express").Router();
const Joi = require("joi");
const { User, validate_login } = require("../models/user_model");
const bcrypt = require("bcrypt"); // Corrected the typo

router.post("/", async (req, res) => {
  try {
    // Validate input using Joi
    const { error } = validate_login(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    console.log("User fetched:", user);

    // If the user does not exist, return an error response
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // If password is invalid, return an error response
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // If login is successful, generate and return the authentication token
    const token = user.generateAuthToken();
    return res
      .status(200)
      .send({ data: token, message: "Login successfully", status: 200 });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
