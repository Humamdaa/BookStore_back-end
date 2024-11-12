// controllers/userController.js

const { User } = require("../models/user_model"); // Assuming you have a User model

const getUserData = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ name: user.first_name });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserData };
