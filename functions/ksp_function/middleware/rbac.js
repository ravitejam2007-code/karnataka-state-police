'use strict';

/**
 * Creates RBAC middleware function to enforce role permissions
 * @param {Array<string>} allowedRoles List of roles permitted to perform action
 * @returns {function(req: object): boolean}
 */
function rbacMiddleware(allowedRoles = []) {
  return function (req) {
    if (!req.user || !req.user.role) {
      const error = new Error('User context missing or unauthenticated');
      error.statusCode = 401;
      throw error;
    }

    const userRole = req.user.role;

    // Administrator has access to all routes
    if (userRole === 'Administrator') return true;

    if (!allowedRoles.includes(userRole)) {
      const error = new Error(`Access denied. Role '${userRole}' is not authorized for this resource.`);
      error.statusCode = 403;
      throw error;
    }

    return true;
  };
}

module.exports = rbacMiddleware;
