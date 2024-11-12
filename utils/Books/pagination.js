// utils/pagination.js

/**
 * Helper function to calculate the total number of pages
 * @param {number} totalItems - Total number of items in the collection
 * @param {number} limit - Number of items per page
 * @returns {number} - Total number of pages
 */
const handlePagination = (totalItems, limit) => {
  return Math.ceil(totalItems / limit);
};

module.exports = {
  handlePagination,
};
