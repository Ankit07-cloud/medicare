// Helper functions for common operations
const bcryptjs = require('bcryptjs');

/**
 * Hash a password using bcryptjs
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Hashed password
 */
const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

/**
 * Compare plain password with hashed password
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} - True if passwords match
 */
const comparePassword = async (password, hash) => {
  return await bcryptjs.compare(password, hash);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 * @param {string} phone - Phone to validate
 * @returns {boolean} - True if valid phone
 */
const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Paginate array results
 * @param {array} items - Array of items
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Items per page
 * @returns {object} - Paginated results with metadata
 */
const paginate = (items, page = 1, limit = 10) => {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const paginatedItems = items.slice(startIndex, startIndex + limit);

  return {
    items: paginatedItems,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
};

/**
 * Generate random string
 * @param {number} length - Length of string
 * @returns {string} - Random string
 */
const generateRandomString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Standard success response format
 * @param {*} data - Response data
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code
 * @returns {object} - Formatted response
 */
const successResponse = (data, message = 'Success', statusCode = 200) => {
  return {
    success: true,
    status: statusCode,
    message,
    data
  };
};

/**
 * Standard error response format
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {*} errors - Additional error details
 * @returns {object} - Formatted response
 */
const errorResponse = (message = 'Error', statusCode = 500, errors = null) => {
  return {
    success: false,
    status: statusCode,
    message,
    ...(errors && { errors })
  };
};

/**
 * Calculate date difference in days
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {number} - Difference in days
 */
const getDaysDifference = (date1, date2) => {
  const timeInMs = Math.abs(date2 - date1);
  const days = Math.ceil(timeInMs / (1000 * 60 * 60 * 24));
  return days;
};

/**
 * Format currency to display format
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} - Formatted currency string
 */
const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

module.exports = {
  hashPassword,
  comparePassword,
  isValidEmail,
  isValidPhone,
  paginate,
  generateRandomString,
  successResponse,
  errorResponse,
  getDaysDifference,
  formatCurrency
};
