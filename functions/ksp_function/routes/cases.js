'use strict';

const { jsonSuccess, jsonError } = require('../utils/response');
const { queryZCQL, insertRow, updateRow, deleteRow } = require('../services/datastore');
const { parsePagination, escapeZCQLString } = require('../utils/validators');

/**
 * GET /cases (Paginated FIR list with search & filters)
 */
async function list(app, req, res) {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const { status, district, from, to, search, crimeType, officer } = req.query || {};

    let zcql = `SELECT CaseMaster.ROWID, CaseMaster.CaseMasterID, CaseMaster.FIRNumber, CaseMaster.CaseDate, CaseMaster.BeatArea, CaseMaster.PlaceType, CaseMaster.PropertyValue, Employee.EmployeeName, Unit.UnitName, CaseCategory.CategoryName, CaseStatusMaster.StatusName, CrimeHead.CrimeHeadName FROM CaseMaster LEFT JOIN Employee ON CaseMaster.PolicePersonID = Employee.EmployeeID LEFT JOIN Unit ON CaseMaster.PoliceStationID = Unit.UnitID LEFT JOIN CaseCategory ON CaseMaster.CaseCategoryID = CaseCategory.CaseCategoryID LEFT JOIN CaseStatusMaster ON CaseMaster.CaseStatusID = CaseStatusMaster.CaseStatusID LEFT JOIN CrimeHead ON CaseMaster.CrimeMajorHeadID = CrimeHead.CrimeHeadID`;

    const conditions = [];

    if (status) conditions.push(`CaseStatusMaster.StatusName = '${escapeZCQLString(status)}'`);
    if (district) conditions.push(`Unit.DistrictID = '${escapeZCQLString(district)}'`);
    if (crimeType) conditions.push(`CrimeHead.CrimeHeadName = '${escapeZCQLString(crimeType)}'`);
    if (officer) conditions.push(`Employee.EmployeeName LIKE '%${escapeZCQLString(officer)}%'`);
    if (search) {
      const escSearch = escapeZCQLString(search);
      conditions.push(`(CaseMaster.FIRNumber LIKE '%${escSearch}%' OR CaseMaster.BeatArea LIKE '%${escSearch}%')`);
    }

    if (conditions.length > 0) {
      zcql += ` WHERE ${conditions.join(' AND ')}`;
    }

    zcql += ` ORDER BY CaseMaster.CaseDate DESC LIMIT ${offset + 1}, ${limit}`;

    const rows = await queryZCQL(app, zcql).catch(() => []);

    // Get total count query
    let countZcql = `SELECT COUNT(CaseMasterID) FROM CaseMaster`;
    if (conditions.length > 0) {
      countZcql += ` WHERE ${conditions.join(' AND ')}`;
    }
    const countRes = await queryZCQL(app, countZcql).catch(() => []);
    const total = (countRes[0] && (countRes[0]['COUNT(CaseMasterID)'] || countRes[0].field_expression_0)) || rows.length;

    return jsonSuccess(res, {
      data: rows,
      total: Number(total),
      page,
      limit
    });
  } catch (err) {
    return jsonError(res, err.message || 'Failed to fetch cases', 500);
  }
}

/**
 * GET /cases/:id (Compound detail view for single case)
 */
async function getById(app, req, res) {
  const caseId = req.params.id;
  if (!caseId) return jsonError(res, 'Case ID is required', 400);

  try {
    const escId = escapeZCQLString(caseId);

    // Fetch CaseMaster record
    const masterZcql = `SELECT * FROM CaseMaster WHERE CaseMasterID = '${escId}' OR FIRNumber = '${escId}'`;
    const masterRows = await queryZCQL(app, masterZcql);

    if (!masterRows || masterRows.length === 0) {
      return jsonError(res, `Case with ID '${caseId}' not found`, 404);
    }

    const caseMaster = masterRows[0];
    const actualCaseMasterID = caseMaster.CaseMasterID;

    // Parallel fetch child entities
    const [complainant, victims, accused, arrestLogs, chargesheet, occurrence, sections] = await Promise.all([
      queryZCQL(app, `SELECT * FROM ComplainantDetails WHERE CaseMasterID = '${actualCaseMasterID}'`).catch(() => []),
      queryZCQL(app, `SELECT * FROM Victim WHERE CaseMasterID = '${actualCaseMasterID}'`).catch(() => []),
      queryZCQL(app, `SELECT * FROM Accused WHERE CaseMasterID = '${actualCaseMasterID}'`).catch(() => []),
      queryZCQL(app, `SELECT * FROM ArrestSurrender WHERE CaseMasterID = '${actualCaseMasterID}'`).catch(() => []),
      queryZCQL(app, `SELECT * FROM ChargesheetDetails WHERE CaseMasterID = '${actualCaseMasterID}'`).catch(() => []),
      queryZCQL(app, `SELECT * FROM Inv_OccuranceTime WHERE CaseMasterID = '${actualCaseMasterID}'`).catch(() => []),
      queryZCQL(app, `SELECT * FROM ActSectionAssociation WHERE CaseMasterID = '${actualCaseMasterID}'`).catch(() => [])
    ]);

    return jsonSuccess(res, {
      caseMaster,
      complainant: complainant[0] || null,
      victims,
      accused,
      arrestLogs,
      chargesheet: chargesheet[0] || null,
      occurrence: occurrence[0] || null,
      sections
    });
  } catch (err) {
    return jsonError(res, err.message || 'Failed to fetch case detail', 500);
  }
}

/**
 * POST /cases (Create new case)
 */
async function create(app, req, res) {
  const caseData = req.body || {};

  if (!caseData.FIRNumber || !caseData.PoliceStationID) {
    return jsonError(res, 'FIRNumber and PoliceStationID are required', 400);
  }

  try {
    const caseMasterID = caseData.CaseMasterID || `CASE-${Date.now()}`;
    const newCaseMaster = Object.assign({}, caseData, { CaseMasterID: caseMasterID });

    const insertedMaster = await insertRow(app, 'CaseMaster', newCaseMaster);

    return jsonSuccess(res, {
      message: 'Case created successfully',
      caseMasterID,
      record: insertedMaster
    }, 201);
  } catch (err) {
    return jsonError(res, err.message || 'Failed to create case', 500);
  }
}

/**
 * PUT /cases/:id (Update case)
 */
async function update(app, req, res) {
  const caseId = req.params.id;
  const updateData = req.body || {};

  if (!caseId) return jsonError(res, 'Case ID is required', 400);

  try {
    const updated = await updateRow(app, 'CaseMaster', caseId, updateData);
    return jsonSuccess(res, { message: 'Case updated successfully', record: updated });
  } catch (err) {
    return jsonError(res, err.message || 'Failed to update case', 500);
  }
}

/**
 * DELETE /cases/:id (Delete case)
 */
async function remove(app, req, res) {
  const caseId = req.params.id;
  if (!caseId) return jsonError(res, 'Case ID is required', 400);

  try {
    await deleteRow(app, 'CaseMaster', caseId);
    return jsonSuccess(res, { message: 'Case deleted successfully', caseId });
  } catch (err) {
    return jsonError(res, err.message || 'Failed to delete case', 500);
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove
};
