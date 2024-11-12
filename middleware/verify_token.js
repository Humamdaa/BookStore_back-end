const jwt = require("jsonwebtoken");

// Check if a token is sent and if the token is valid
function verify_token(req, res, next) {
  // Check the token in the Authorization header
  const token = req.headers["authorization"]?.split(" ")[1];
  // console.log("headers:", req.headers);
  // console.log("token:", token);
  if (!token) {
    // console.log("good token");
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Try to decode the token
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // Add user information to the request
    req.user = decoded;
    next();
  } catch (error) {
    console.log("error:", error);
    return res.status(401).json({ message: "Invalid token." });
  }
}

module.exports = {
  verify_token,
};
