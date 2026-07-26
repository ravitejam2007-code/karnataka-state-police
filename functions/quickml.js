'use strict';

/**
 * Root delegation wrapper pointing to ksp_function service
 */
const { 
  getAccessToken, 
  refreshAccessToken, 
  queryQuickML, 
  cacheAccessToken, 
  isTokenExpired 
} = require('./ksp_function/services/quickml');

module.exports = {
  getAccessToken,
  refreshAccessToken,
  queryQuickML,
  cacheAccessToken,
  isTokenExpired
};
