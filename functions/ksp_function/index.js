'use strict';

const catalyst = require('zcatalyst-sdk-node');
const { jsonError } = require('./utils/response');
const { authMiddleware } = require('./middleware/auth');
const rbacMiddleware = require('./middleware/rbac');
const urlModule = require('url');

module.exports = (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
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

  // Accumulate request body for POST/PUT
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
      await routeRequest(app, req, res, req.method, pathname);
    } catch (err) {
      const statusCode = err.statusCode || 500;
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
  if (method === 'GET' && path === '/') return res.end(JSON.stringify({ status: 'active', message: 'KSP Catalyst API Service' }));

  // --- Authenticated Middleware Verification ---
  let user;
  try {
    user = authMiddleware(req);
  } catch (err) {
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
  return jsonError(res, `Route '${method} ${path}' not found`, 404);
}
