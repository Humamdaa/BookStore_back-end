// routes/routesConfig.js
const {
  loginRateLimiter,
  registerRateLimiter,
} = require("../utils/RateLimit/authRateLimiter");
// Import routes
const loginRoute = require("./auth/auth_login");
const registerRoute = require("./auth/auth_register");
const add_book_path = require("./Crud_Books/add_bookR");
const get_book_path = require("./Crud_Books/get_allBooksR");
const del_book_path = require("./Crud_Books/delete_bookR");
const info_book_path = require("./Crud_Books/info_bookR");
const edit_book_path = require("./Crud_Books/edit_bookR");
const user_path = require("./user/UserData");

module.exports = (app) => {
  // AUTH Routes with rate limiters
  app.use("/api/login", loginRateLimiter, loginRoute);
  app.use("/api/register", registerRateLimiter, registerRoute);

  // CRUD BOOKS Routes
  app.use("/get/books", get_book_path);
  app.use("/add/book", add_book_path);
  app.use("/delete/book", del_book_path);
  app.use("/info/book", info_book_path);
  app.use("/edit/book", edit_book_path);

  // User Route
  app.use("/me", user_path);
};
