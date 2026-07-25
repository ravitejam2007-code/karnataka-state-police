'use strict';

const { jsonSuccess, jsonError } = require('../utils/response');
const { queryZCQL } = require('../services/datastore');
const { escapeZCQLString } = require('../utils/validators');

/**
 * GET /search?q=&type=cases|criminals|officers|all
 */
async function globalSearch(app, req, res) {
  const query = req.query.q || '';
  const searchType = (req.query.type || 'all').toLowerCase();

  if (!query || query.trim().length === 0) {
    return jsonSuccess(res, { cases: [], criminals: [], officers: [], total: 0 });
  }

  const escQuery = escapeZCQLString(query.trim());

  try {
    const results = {
      cases: [],
      criminals: [],
      officers: [],
      total: 0
    };

    const promises = [];

    if (searchType === 'all' || searchType === 'cases') {
      const caseZcql = `SELECT CaseMasterID, FIRNumber, CaseDate, BeatArea FROM CaseMaster WHERE FIRNumber LIKE '%${escQuery}%' OR BeatArea LIKE '%${escQuery}%' LIMIT 10`;
      promises.push(
        queryZCQL(app, caseZcql)
          .then(rows => { results.cases = rows.map(r => ({ ...r, type: 'case' })); })
          .catch(() => {})
      );
    }

    if (searchType === 'all' || searchType === 'criminals') {
      const accusedZcql = `SELECT AccusedID, AccusedName, PersonID, Gender, Age FROM Accused WHERE AccusedName LIKE '%${escQuery}%' OR PersonID LIKE '%${escQuery}%' LIMIT 10`;
      promises.push(
        queryZCQL(app, accusedZcql)
          .then(rows => { results.criminals = rows.map(r => ({ ...r, type: 'criminal' })); })
          .catch(() => {})
      );
    }

    if (searchType === 'all' || searchType === 'officers') {
      const empZcql = `SELECT EmployeeID, EmployeeName FROM Employee WHERE EmployeeName LIKE '%${escQuery}%' OR EmployeeID LIKE '%${escQuery}%' LIMIT 10`;
      promises.push(
        queryZCQL(app, empZcql)
          .then(rows => { results.officers = rows.map(r => ({ ...r, type: 'officer' })); })
          .catch(() => {})
      );
    }

    await Promise.all(promises);

    results.total = results.cases.length + results.criminals.length + results.officers.length;

    return jsonSuccess(res, results);
  } catch (err) {
    return jsonError(res, err.message || 'Global search failed', 500);
  }
}

module.exports = {
  globalSearch
};
