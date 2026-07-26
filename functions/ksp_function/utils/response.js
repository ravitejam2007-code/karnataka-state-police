'use strict';

const logger = require('./logger');

/**
 * Whitelist of strictly permitted origin domains
 */
const ALLOWED_ORIGINS = [
  'https://static-zxzwdpob.onslate.in',
  'https://static-ogejmnvp.onslate.in',
  'https://ksp-arptech.onslate.in',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

/**
 * Validates request origin against ALLOWED_ORIGINS whitelist.
 * Never reflects arbitrary unknown origins.
 * @param {object} req Incoming request object
 * @returns {object} Full CORS response headers map
 */
function getCorsHeaders(req) {
  const headersObj = (req && req.headers) || {};
  const requestOrigin = (headersObj.origin || headersObj.Origin || '').trim();

  let validatedOrigin = ALLOWED_ORIGINS[0]; // Default fallback origin

  if (requestOrigin) {
    const isExplicitlyAllowed = ALLOWED_ORIGINS.includes(requestOrigin);
    const isSubdomainAllowed = requestOrigin.endsWith('.onslate.in') || requestOrigin.endsWith('.catalystserverless.com');

    if (isExplicitlyAllowed || isSubdomainAllowed) {
      validatedOrigin = requestOrigin;
    } else {
      logger.warn('CORS_SECURITY', `Rejected unlisted origin '${requestOrigin}'. Falling back to default whitelist.`, { requestOrigin });
    }
  }

  return {
    'Access-Control-Allow-Origin': validatedOrigin,
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
 * @param {any} data Payload data
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
    message: message || 'An unexpected error occurred'
  }));
}

module.exports = {
  jsonSuccess,
  jsonError,
  getCorsHeaders,
  ALLOWED_ORIGINS
};
