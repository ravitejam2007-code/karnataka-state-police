'use strict';

/**
 * List of explicitly allowed origins including development & production Slate URLs
 */
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://static-ogejmnvp.onslate.in',
  'https://ksp-arptech.onslate.in'
];

/**
 * Generates dynamic CORS headers reflecting the requesting origin
 * @param {object} req Node.js IncomingMessage
 * @returns {object} CORS headers map
 */
function getCorsHeaders(req) {
  const requestOrigin = (req && req.headers && (req.headers.origin || req.headers.Origin)) || '';

  let allowOrigin = '*';
  if (requestOrigin) {
    if (ALLOWED_ORIGINS.includes(requestOrigin) || requestOrigin.endsWith('.onslate.in') || requestOrigin.endsWith('.catalystserverless.com')) {
      allowOrigin = requestOrigin;
    } else {
      allowOrigin = requestOrigin;
    }
  }

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, CATALYST-ORG, Accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
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
  getCorsHeaders,
  ALLOWED_ORIGINS
};
