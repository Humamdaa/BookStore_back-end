const { Book } = require("../../models/book_model");

const delBook = async (req, res) => {
  try {
    // Find the book by ID
    const book = await Book.findById(req.params.id);

    // Check if the book exists
    if (!book) {
      return res.status(404).send({ message: "Book not found." });
    }

    // Delete the book
    await book.deleteOne();


    // Send success response
    return res
      .status(200)
      .send({ message: "Book deleted successfully", status: 200 });
  } catch (err) {
    // Handle errors
    return res.status(500).send({ message: "Error deleting book." });
  }
};

module.exports = {
  delBook,
};
