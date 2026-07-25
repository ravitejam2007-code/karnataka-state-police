'use strict';

const { jsonSuccess, jsonError } = require('../utils/response');
const { queryZCQL } = require('../services/datastore');
const { escapeZCQLString } = require('../utils/validators');

/**
 * GET /map/crime-points (Returns GeoJSON FeatureCollection)
 */
async function crimePoints(app, req, res) {
  try {
    const { district, crimeType, status } = req.query || {};

    let zcql = `SELECT Inv_OccuranceTime.CaseMasterID, Inv_OccuranceTime.Latitude, Inv_OccuranceTime.Longitude, Inv_OccuranceTime.PlaceName, CaseMaster.FIRNumber, CaseMaster.CaseDate, CrimeHead.CrimeHeadName FROM Inv_OccuranceTime JOIN CaseMaster ON Inv_OccuranceTime.CaseMasterID = CaseMaster.CaseMasterID LEFT JOIN CrimeHead ON CaseMaster.CrimeMajorHeadID = CrimeHead.CrimeHeadID`;

    const conditions = [];
    if (district) conditions.push(`Inv_OccuranceTime.DistrictID = '${escapeZCQLString(district)}'`);
    if (crimeType) conditions.push(`CrimeHead.CrimeHeadName = '${escapeZCQLString(crimeType)}'`);

    if (conditions.length > 0) {
      zcql += ` WHERE ${conditions.join(' AND ')}`;
    }

    zcql += ` LIMIT 500`;

    const rows = await queryZCQL(app, zcql).catch(() => []);

    const features = rows
      .filter(r => r.Latitude && r.Longitude && !isNaN(Number(r.Latitude)) && !isNaN(Number(r.Longitude)))
      .map(r => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [Number(r.Longitude), Number(r.Latitude)]
        },
        properties: {
          caseMasterId: r.CaseMasterID,
          firNumber: r.FIRNumber || r.CaseMasterID,
          caseDate: r.CaseDate,
          crimeHead: r.CrimeHeadName || 'General Crime',
          placeName: r.PlaceName || 'Karnataka'
        }
      }));

    return jsonSuccess(res, {
      type: 'FeatureCollection',
      features
    });
  } catch (err) {
    return jsonError(res, err.message || 'Failed to fetch map crime points', 500);
  }
}

module.exports = {
  crimePoints
};
