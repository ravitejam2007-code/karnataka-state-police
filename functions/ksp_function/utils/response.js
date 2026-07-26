'use strict';

/**
 * Standard CORS headers to allow cross-origin requests from frontend apps
 */
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, CATALYST-ORG',
  'Content-Type': 'application/json'
};

/**
 * Standardized JSON success response
 * @param {object} res Node.js ServerResponse
 * @param {any} data Response payload
 * @param {number} status HTTP status code (default 200)
 */
function jsonSuccess(res, data, status = 200) {
  if (res.headersSent) return;
  res.writeHead(status, corsHeaders);
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
  res.writeHead(status, corsHeaders);
  res.end(JSON.stringify({
    status: 'error',
    message
  }));
}

module.exports = {
  jsonSuccess,
  jsonError,
  corsHeaders
};
