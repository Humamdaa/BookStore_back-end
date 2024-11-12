const { Book, validateBook } = require("../../models/book_model");

const editBook = async (req, res) => {
  const bookId = req.params.id;
  const { title, publishYear, content, num_of_pges } = req.body;
  const user = req.user;
  try {
    console.log(bookId);
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    const bookData = {
      title,
      publishYear,
      content,
      num_of_pges,
      author: user._id,
    };

    // Validate the book data using the model's validateBook function
    const { valid, errors } = validateBook(bookData);

    if (!valid) {
      // If validation fails, return the error messages
      const errorMessages = Object.values(errors).map((err) => err.message);
      return res
        .status(400)
        .send({ message: errorMessages.join(", "), status: 400 });
    }

    // Update the book fields with the validated data
    book.title = title || book.title;
    book.publishYear = publishYear || book.publishYear;
    book.content = content || book.content;
    book.num_of_pges = num_of_pges || book.num_of_pges;

    // Save the updated book
    await book.save();

    // Return a success response
    res.status(200).send({ status: 200, message: "Book updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error });
  }
};

module.exports = {
  editBook,
};
