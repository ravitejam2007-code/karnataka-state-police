'use strict';

const { jsonSuccess, jsonError } = require('../utils/response');
const { queryZCQL } = require('../services/datastore');
const { escapeZCQLString } = require('../utils/validators');

/**
 * GET /network/case/:id/graph
 */
async function caseGraph(app, req, res) {
  const caseId = req.params.id;
  if (!caseId) return jsonError(res, 'Case ID is required', 400);

  try {
    const escId = escapeZCQLString(caseId);

    const [accusedRows, victimRows, occurrenceRows, actRows] = await Promise.all([
      queryZCQL(app, `SELECT * FROM Accused WHERE CaseMasterID = '${escId}'`).catch(() => []),
      queryZCQL(app, `SELECT * FROM Victim WHERE CaseMasterID = '${escId}'`).catch(() => []),
      queryZCQL(app, `SELECT * FROM Inv_OccuranceTime WHERE CaseMasterID = '${escId}'`).catch(() => []),
      queryZCQL(app, `SELECT * FROM ActSectionAssociation WHERE CaseMasterID = '${escId}'`).catch(() => [])
    ]);

    const nodes = [];
    const edges = [];

    // Central Case Node
    const caseNodeId = `case-${caseId}`;
    nodes.push({
      id: caseNodeId,
      label: `FIR: ${caseId}`,
      type: 'case'
    });

    // Accused Nodes
    accusedRows.forEach(a => {
      const aId = `accused-${a.AccusedID || a.PersonID}`;
      nodes.push({
        id: aId,
        label: a.AccusedName || 'Suspect',
        type: 'suspect',
        details: { age: a.Age, gender: a.Gender }
      });
      edges.push({
        source: aId,
        target: caseNodeId,
        relation: 'accused_in'
      });
    });

    // Victim Nodes
    victimRows.forEach(v => {
      const vId = `victim-${v.VictimID}`;
      nodes.push({
        id: vId,
        label: v.VictimName || 'Victim',
        type: 'victim',
        details: { age: v.Age, gender: v.Gender }
      });
      edges.push({
        source: vId,
        target: caseNodeId,
        relation: 'victim_in'
      });
    });

    // Location Node
    if (occurrenceRows.length > 0) {
      const loc = occurrenceRows[0];
      const locId = `loc-${caseId}`;
      nodes.push({
        id: locId,
        label: loc.PlaceName || 'Crime Location',
        type: 'location'
      });
      edges.push({
        source: caseNodeId,
        target: locId,
        relation: 'occurred_at'
      });
    }

    // Act/Section Nodes
    actRows.forEach(sec => {
      const secId = `section-${sec.SectionID || sec.ActCode}`;
      nodes.push({
        id: secId,
        label: `Section ${sec.SectionID || sec.ActCode}`,
        type: 'section'
      });
      edges.push({
        source: caseNodeId,
        target: secId,
        relation: 'charged_under'
      });
    });

    return jsonSuccess(res, { nodes, edges });
  } catch (err) {
    return jsonError(res, err.message || 'Failed to generate network graph', 500);
  }
}

module.exports = {
  caseGraph
};
