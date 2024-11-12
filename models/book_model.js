const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {
      type: String, // Change this to a simple string (not an array)
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [30, "Title must be less than 30 characters long"], // Fixed this to be maxlength
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    publishYear: {
      type: Number, // Change this to a single number (not an array)
      required: [true, "Publish year is required"],
      min: [1900, "Publish year must be after 1900"],
      max: [new Date().getFullYear(), "Publish year cannot be in the future"],
    },
    content: {
      type: String, // Change this to a simple string (not an array)
      required: [true, "Content is required"],
      min: [30, "The content of book must be greater than 30"],
      max: [1000, "The content of book must be less than 1000"],
    },
    num_of_pges: {
      type: Number, // Change this to a single number (not an array)
      required: [true, "Number of pages is required"],
      min: [100, "Number of pages must be greater than 100"],
      max: [50000, "Number of pages must be less than 50,000"],
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

const validateBook = (bookData) => {
  const newBook = new Book(bookData);
  const error = newBook.validateSync(); // Trigger the sync validation
  if (error) {
    return { valid: false, errors: error.errors };
  } else {
    return { valid: true, errors: null };
  }
};

module.exports = { Book, validateBook };
