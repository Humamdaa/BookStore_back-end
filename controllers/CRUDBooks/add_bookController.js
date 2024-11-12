const { Book, validateBook   } = require("../../models/book_model");

const addBook = async (req, res) => {
  const { title, publishYear, content, num_of_pges } = req.body;
  const user = req.user;

  // Validate book data
  const bookData = {
    title: title,
    publishYear: publishYear,
    content: content,
    num_of_pges: num_of_pges,
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
  try {
    // Create a new book object
    const newBook = new Book({
      title,
      author: user._id,
      publishYear,
      content,
      num_of_pges,
      author: req.user, // Assuming `req.user` contains the user ID from the token
    });

    // Save the book to the database
    await newBook.save();

    res.status(201).send({ status: 201, message: "Book added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error });
  }
};

module.exports = {
  addBook,
};
