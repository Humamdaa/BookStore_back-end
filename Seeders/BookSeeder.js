const mongoose = require("mongoose");
const { Book } = require("../models/book_model"); // Adjust the path if necessary
const { User } = require("../models/user_model"); // Assuming you have a User model

const seedBooks = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/yourDatabaseName", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Sample users' IDs (make sure these exist in your User collection)
    const userIds = [
      "671fb51fe92633b20081b508", // Replace with actual user IDs
      "671fb682e92633b20081b50e",
      "671fdbdef590f95b0591830b",
      "671fe07cf590f95b05918320",
    ];

    // Sample book data
    const books = [
      {
        title: "The Great Gatsby",
        author: userIds[0],
        publishYear: 1925,
        content: "A novel written by American author F. Scott Fitzgerald.",
        num_of_pges: 180,
      },
      {
        title: "To Kill a Mockingbird",
        author: userIds[1],
        publishYear: 1960,
        content: "A novel by Harper Lee published in 1960.",
        num_of_pges: 281,
      },
      {
        title: "1984",
        author: userIds[2],
        publishYear: 1949,
        content:
          "A dystopian social science fiction novel by English writer George Orwell.",
        num_of_pges: 328,
      },
      {
        title: "Pride and Prejudice",
        author: userIds[3],
        publishYear: 1813,
        content: "A romantic novel of manners written by Jane Austen.",
        num_of_pges: 279,
      },
    ];

    // Insert books into the database
    await Book.insertMany(books);

    console.log("Books have been added successfully!");
  } catch (error) {
    console.error("Error seeding books:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
};

// Execute the seeder
seedBooks();
