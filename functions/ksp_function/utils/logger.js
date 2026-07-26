'use strict';

/**
 * Structured Logger for KSP Catalyst Backend
 * Ensures all log messages sanitize sensitive credentials before output.
 */

// List of sensitive keys to redact from logs
const SENSITIVE_KEYS = [
  'client_secret',
  'clientsecret',
  'refresh_token',
  'refreshtoken',
  'access_token',
  'accesstoken',
  'jwt_secret',
  'jwtsecret',
  'password',
  'pin',
  'authorization',
  'secret'
];

/**
 * Recursively sanitizes objects to prevent secret exposure
 */
function sanitizeData(data) {
  if (!data) return data;

  if (typeof data === 'string') {
    // Mask raw token strings
    if (data.startsWith('1000.') && data.length > 20) {
      return `${data.slice(0, 7)}...[REDACTED]`;
    }
    return data;
  }

  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      return data.map(sanitizeData);
    }

    const sanitized = {};
    for (const key of Object.keys(data)) {
      const lowerKey = key.toLowerCase();
      if (SENSITIVE_KEYS.some(k => lowerKey.includes(k))) {
        sanitized[key] = '[REDACTED_SECRET]';
      } else {
        sanitized[key] = sanitizeData(data[key]);
      }
    }
    return sanitized;
  }

  return data;
}

function info(category, message, details = null) {
  const payload = {
    timestamp: new Date().toISOString(),
    level: 'INFO',
    category,
    message
  };
  if (details) payload.details = sanitizeData(details);
  console.log(`[KSP-LOG:INFO][${category}] ${message}`, details ? JSON.stringify(sanitizeData(details)) : '');
}

function warn(category, message, details = null) {
  const payload = {
    timestamp: new Date().toISOString(),
    level: 'WARN',
    category,
    message
  };
  if (details) payload.details = sanitizeData(details);
  console.warn(`[KSP-LOG:WARN][${category}] ${message}`, details ? JSON.stringify(sanitizeData(details)) : '');
}

function error(category, message, err = null) {
  const payload = {
    timestamp: new Date().toISOString(),
    level: 'ERROR',
    category,
    message
  };
  if (err) {
    payload.error = {
      message: err.message || String(err),
      stack: err.stack ? err.stack.split('\n')[1]?.trim() : undefined
    };
  }
  console.error(`[KSP-LOG:ERROR][${category}] ${message}`, err ? (err.message || String(err)) : '');
}

module.exports = {
  info,
  warn,
  error,
  sanitizeData
};
