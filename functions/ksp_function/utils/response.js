'use strict';

/**
 * Generates dynamic CORS headers reflecting the requesting origin
 * @param {object} req Node.js IncomingMessage
 * @returns {object} CORS headers map
 */
function getCorsHeaders(req) {
  const requestOrigin = (req && req.headers && (req.headers.origin || req.headers.Origin)) || '*';
  return {
    'Access-Control-Allow-Origin': requestOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, CATALYST-ORG, Accept',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json'
  };
}

/**
 * Standardized JSON success response
 * @param {object} res Node.js ServerResponse
 * @param {any} data Response payload
 * @param {number} status HTTP status code (default 200)
 */
function jsonSuccess(res, data, status = 200) {
  if (res.headersSent) return;
  const headers = getCorsHeaders(res.req);
  res.writeHead(status, headers);
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
  const headers = getCorsHeaders(res.req);
  res.writeHead(status, headers);
  res.end(JSON.stringify({
    status: 'error',
    message
  }));
}

module.exports = {
  jsonSuccess,
  jsonError,
  getCorsHeaders
};
