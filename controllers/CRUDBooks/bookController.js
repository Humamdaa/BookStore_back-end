const { Book } = require("../../models/book_model");
const { User } = require("../../models/user_model");
const { handlePagination } = require("../../utils/Books/pagination");
const { addSameUserFlag } = require("../../utils/Books/addSmaeUserFlag");

const getAllBooks = async (req, res) => {
  const userId = req.user;
  const page = parseInt(req.query.page, 10);
  const limit = parseInt(req.query.limit, 10);

  try {
    const user = await User.findById(userId).select("email first_name");
    const books = await Book.find()
      .skip((page - 1) * limit)
      .populate("author", "first_name last_name email")
      .limit(limit);

    const totalBooks = await Book.countDocuments();
    
    if (!books.length) {
      return res.status(404).send({
        name: user.first_name,
        message: "No books found",
        status: 404,
      });
    }

    // Using the pagination utility to calculate the total number of pages
    const totalPages = handlePagination(totalBooks, limit);

    const updatedBooks = addSameUserFlag(books, user);
    res.status(200).send({
      name: user.first_name,
      books: updatedBooks,
      totalPages: totalPages,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", status: 500 });
  }
};

module.exports = {
  getAllBooks,
};
