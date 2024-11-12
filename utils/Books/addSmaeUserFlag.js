const addSameUserFlag = (books, user) => {
    return books.map((book) => {
      const isSameUser = book.author.email === user.email;
      return {
        ...book.toObject(), // Convert book to plain object (to add new properties)
        same_user: isSameUser, // Add `same_user` flag
      };
    });
  };
  
  module.exports = { addSameUserFlag };