'use strict';

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ksp_secret_key_2026';

/**
 * Extracts and verifies JWT from Authorization header
 * @param {object} req Incoming request object
 * @returns {object} Decoded user payload
 * @throws {Error} If token is missing, invalid, or expired
 */
function authMiddleware(req) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader || typeof authHeader !== 'string') {
    const error = new Error('Authorization header missing');
    error.statusCode = 401;
    throw error;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    const error = new Error('Invalid Authorization header format. Expected Bearer <token>');
    error.statusCode = 401;
    throw error;
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return {
      id: decoded.sub || decoded.id,
      name: decoded.name || 'Police Officer',
      email: decoded.email,
      role: decoded.role || 'Investigator',
      department: decoded.department || 'Karnataka State Police',
      badgeId: decoded.badgeId || decoded.EmployeeID || 'KSP-001'
    };
  } catch (err) {
    const error = new Error('Invalid or expired authentication token');
    error.statusCode = 401;
    throw error;
  }
}

/**
 * Helper to generate signed JWT for user
 * @param {object} user User payload
 * @returns {string} JWT Token
 */
function generateToken(user) {
  const payload = {
    sub: user.EmployeeID || user.id || '1',
    name: user.EmployeeName || user.fullName || user.name || 'Police Officer',
    email: user.email || 'officer@ksp.gov.in',
    role: user.role || 'Investigator',
    department: user.department || 'Karnataka State Police',
    badgeId: user.badgeId || user.EmployeeID || 'KSP-001'
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

module.exports = {
  authMiddleware,
  generateToken,
  JWT_SECRET
};
