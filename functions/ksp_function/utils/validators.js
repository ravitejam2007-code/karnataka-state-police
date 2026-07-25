'use strict';

/**
 * Validates email format
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Parses and sanitizes pagination parameters
 * @param {object} query Parsed URL query params
 * @returns {{ page: number, limit: number, offset: number }}
 */
function parsePagination(query = {}) {
  let page = parseInt(query.page, 10);
  let limit = parseInt(query.limit, 10);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1 || limit > 100) limit = 20;

  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

/**
 * Escapes ZCQL string parameter to prevent query syntax errors / injection
 * @param {string} str
 * @returns {string}
 */
function escapeZCQLString(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/'/g, "\\'");
}

module.exports = {
  isValidEmail,
  parsePagination,
  escapeZCQLString
};
