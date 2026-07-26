'use strict';

const catalyst = require('zcatalyst-sdk-node');
const { jsonError, jsonSuccess, getCorsHeaders } = require('./utils/response');
const { authMiddleware } = require('./middleware/auth');
const rbacMiddleware = require('./middleware/rbac');
const logger = require('./utils/logger');
const urlModule = require('url');

// Environment variable validation during server startup
function validateEnvironment() {
  const requiredVars = [
    'QUICKML_CLIENT_ID',
    'QUICKML_CLIENT_SECRET',
    'QUICKML_REFRESH_TOKEN',
    'QUICKML_DEPLOYMENT_ID',
    'CATALYST_ORG_ID'
  ];

  const missing = requiredVars.filter(v => !process.env[v]);
  if (missing.length > 0) {
    logger.warn('ENV_STARTUP_WARN', `Missing Catalyst environment variables: ${missing.join(', ')}. Using default fallback values for local development mode.`);
  } else {
    logger.info('ENV_STARTUP_OK', 'All required Catalyst environment variables are configured.');
  }
}

// Perform initial validation
validateEnvironment();

module.exports = (req, res) => {
  res.req = req;
  const headers = getCorsHeaders(req);
  const httpMethod = (req.method || (req.getMethod && req.getMethod()) || '').toUpperCase();

  // Set CORS Headers on response object upfront
  Object.keys(headers).forEach(key => {
    try {
      res.setHeader(key, headers[key]);
    } catch (e) {}
  });

  // Handle OPTIONS preflight request explicitly before authentication or body stream reading
  if (httpMethod === 'OPTIONS') {
    try {
      res.writeHead(200, headers);
    } catch (e) {}
    res.end();
    return;
  }

  // Parse URL & Query parameters
  const parsedUrl = urlModule.parse(req.url, true);
  let pathname = parsedUrl.pathname || '/';

  // Strip Catalyst context prefix if present (e.g. /app/ksp_function/...)
  if (pathname.includes('/ksp_function')) {
    pathname = pathname.substring(pathname.indexOf('/ksp_function') + '/ksp_function'.length);
  }
  if (!pathname || pathname === '') pathname = '/';

  req.query = parsedUrl.query || {};

  // Accumulate request body for POST/PUT/PATCH
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      if (body) {
        try {
          req.body = JSON.parse(body);
        } catch (e) {
          req.body = {};
        }
      } else {
        req.body = {};
      }

      let app;
      try {
        app = catalyst.initialize(req);
      } catch (catErr) {
        // Fallback for local unit testing / non-Catalyst node execution
        app = {
          zcql: () => ({ executeZCQLQuery: async () => [] }),
          datastore: () => ({
            getTable: () => ({
              insertRow: async (d) => d,
              updateRow: async (d) => d,
              deleteRow: async () => true,
              getRow: async () => ({})
            })
          })
        };
      }
      await routeRequest(app, req, res, httpMethod, pathname);
    } catch (err) {
      const statusCode = err.statusCode || 500;
      logger.error('SERVER_ERROR', `Unhandled request failure on ${httpMethod} ${pathname}: ${err.message}`, err);
      jsonError(res, err.message || 'Internal Server Error', statusCode);
    }
  });
};

/**
 * Request Router
 */
async function routeRequest(app, req, res, method, path) {
  const authRoutes = require('./routes/auth');
  const caseRoutes = require('./routes/cases');
  const analyticsRoutes = require('./routes/analytics');
  const mapRoutes = require('./routes/map');
  const networkRoutes = require('./routes/network');
  const aiRoutes = require('./routes/ai');
  const forecastRoutes = require('./routes/forecast');
  const searchRoutes = require('./routes/search');

  // --- Public Routes (No Authentication Required) ---
  if (method === 'POST' && path === '/auth/login') return authRoutes.login(app, req, res);
  if (method === 'POST' && path === '/auth/register') return authRoutes.register(app, req, res);
  if (method === 'POST' && path === '/auth/verify-otp') return authRoutes.verifyOtp(app, req, res);
  if (method === 'GET' && path === '/') return jsonSuccess(res, { status: 'active', message: 'KSP Catalyst API Service' });

  // --- Authenticated Middleware Verification ---
  let user;
  try {
    user = authMiddleware(req);
  } catch (err) {
    logger.warn('AUTH_DENIED', `Unauthorized access attempt on ${method} ${path}: ${err.message}`);
    return jsonError(res, err.message || 'Unauthorized access', 401);
  }
  req.user = user;

  // --- Protected Auth Routes ---
  if (method === 'GET' && path === '/auth/profile') return authRoutes.getProfile(app, req, res);
  if (method === 'PUT' && path === '/auth/profile') return authRoutes.updateProfile(app, req, res);

  // --- Case Routes ---
  if (method === 'GET' && path === '/cases') return caseRoutes.list(app, req, res);
  if (method === 'POST' && path === '/cases') return caseRoutes.create(app, req, res);

  const caseIdMatch = path.match(/^\/cases\/([^/]+)$/);
  if (caseIdMatch) {
    req.params = { id: caseIdMatch[1] };
    if (method === 'GET') return caseRoutes.getById(app, req, res);
    if (method === 'PUT') return caseRoutes.update(app, req, res);
    if (method === 'DELETE') {
      rbacMiddleware(['Administrator', 'Supervisor'])(req);
      return caseRoutes.remove(app, req, res);
    }
  }

  // --- Analytics Routes ---
  if (method === 'GET' && path === '/analytics/kpi-summary') return analyticsRoutes.kpiSummary(app, req, res);
  if (method === 'GET' && path === '/analytics/crime-types') return analyticsRoutes.crimeTypes(app, req, res);
  if (method === 'GET' && path === '/analytics/district') return analyticsRoutes.districtStats(app, req, res);
  if (method === 'GET' && path === '/analytics/demographics') return analyticsRoutes.demographics(app, req, res);
  if (method === 'GET' && path === '/analytics/seasonality') return analyticsRoutes.seasonality(app, req, res);
  if (method === 'GET' && path === '/analytics/behavior') return analyticsRoutes.behavior(app, req, res);

  // --- Geospatial Map Route ---
  if (method === 'GET' && path === '/map/crime-points') return mapRoutes.crimePoints(app, req, res);

  // --- Criminal Network Graph Route ---
  const networkMatch = path.match(/^\/network\/case\/([^/]+)\/graph$/);
  if (networkMatch && method === 'GET') {
    req.params = { id: networkMatch[1] };
    return networkRoutes.caseGraph(app, req, res);
  }

  // --- AI Copilot Chat Route ---
  if (method === 'POST' && path === '/ai/chat') return aiRoutes.chat(app, req, res);

  // --- Forecast Route ---
  if (method === 'GET' && path === '/forecast') return forecastRoutes.forecast(app, req, res);

  // --- Search Route ---
  if (method === 'GET' && path === '/search') return searchRoutes.globalSearch(app, req, res);

  // Endpoint 404 Fallback
  logger.warn('NOT_FOUND', `Route '${method} ${path}' not found.`);
  return jsonError(res, `Route '${method} ${path}' not found`, 404);
}
