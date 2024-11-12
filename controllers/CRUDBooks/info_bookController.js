const { Book } = require("../../models/book_model");

const infoBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "author",
      "first_name last_name email"
    );
    // Check if the book exists
    if (!book) {
      return res.status(404).send({ message: "Book not found.", status: 404 });
    }
    res.status(200).send({ book: book, status: 200 });
  } catch (err) {
    console.log(err);
    // Handle errors
    return res.status(500).send({ message: "Error geting deatail of  book." });
  }
};

module.exports = {
  infoBook,
};
