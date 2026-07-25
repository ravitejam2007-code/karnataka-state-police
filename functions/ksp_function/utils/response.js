'use strict';

/**
 * Standardized JSON success response
 * @param {object} res Node.js ServerResponse
 * @param {any} data Response payload
 * @param {number} status HTTP status code (default 200)
 */
function jsonSuccess(res, data, status = 200) {
  if (res.headersSent) return;
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'success',
    data
  }));
}

/**
 * Standardized JSON error response
 * @param {object} res Node.js ServerResponse
 * @param {string} message Error description
 * @param {number} status HTTP status code (default 400)
 */
function jsonError(res, message, status = 400) {
  if (res.headersSent) return;
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'error',
    message
  }));
}

module.exports = {
  jsonSuccess,
  jsonError
};
