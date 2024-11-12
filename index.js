require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connect_to_DB = require("./db");

//import routes
const loginRoute = require("./routes/auth_login");
const registerRoute = require("./routes/auth_register");

// book routes
const add_book_path = require("./routes/Crud_Books/add_bookR");
const get_book_path = require("./routes/Crud_Books/get_allBooksR");
const del_book_path = require("./routes/Crud_Books/delete_bookR");
const info_book_path = require("./routes/Crud_Books/info_bookR");
const edit_book_path = require("./routes/Crud_Books/edit_bookR");
const user_path = require("./routes/user/UserData");

// database connection
connect_to_DB();

// middleware
app.use(express.json());

app.use(cors());

// AUTH
app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
// CRUD BOOKS
app.use("/get/books", get_book_path);
app.use("/add/book", add_book_path);
app.use("/delete/book", del_book_path);
app.use("/info/book", info_book_path);
app.use("/edit/book", edit_book_path);
// user
app.use("/me", user_path);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`listening on port ${port}...`));
