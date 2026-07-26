'use strict';

const { jsonSuccess, jsonError } = require('../utils/response');
const { queryZCQL } = require('../services/datastore');
const { queryQuickML } = require('../services/quickml');

/**
 * POST /ai/chat
 * Flow:
 * 1. User message
 * 2. Query Catalyst Data Store using ZCQL
 * 3. Build database context
 * 4. Append context to prompt
 * 5. Call queryQuickML()
 * 6. Return AI response with citations, sources, and thought process
 */
async function chat(app, req, res) {
  const { message } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return jsonError(res, 'Message prompt is required', 400);
  }

  try {
    // Step 1: Query Catalyst Data Store using ZCQL to build database context
    let dbContextLines = [];
    let dbRecords = [];

    try {
      // Query recent FIR cases from CaseMaster
      const zcqlCases = `SELECT CaseMaster.FIRNumber, CaseMaster.CaseDate, CrimeHead.CrimeHeadName, CaseStatusMaster.StatusName FROM CaseMaster LEFT JOIN CrimeHead ON CaseMaster.CrimeMajorHeadID = CrimeHead.CrimeHeadID LEFT JOIN CaseStatusMaster ON CaseMaster.CaseStatusID = CaseStatusMaster.CaseStatusID ORDER BY CaseMaster.CaseDate DESC LIMIT 5`;
      const cases = await queryZCQL(app, zcqlCases).catch(() => []);

      if (cases && cases.length > 0) {
        dbRecords = cases;
        dbContextLines.push('Recent Registered FIR Cases:');
        cases.forEach((c) => {
          dbContextLines.push(`• FIR: ${c.FIRNumber || 'N/A'} | Date: ${c.CaseDate || 'N/A'} | Offence: ${c.CrimeHeadName || 'General'} | Status: ${c.StatusName || 'Under Investigation'}`);
        });
      }

      // Query relevant statutory sections
      const zcqlSections = `SELECT Section.SectionNumber, Section.SectionDescription, Act.ActName FROM Section JOIN Act ON Section.ActCode = Act.ActCode LIMIT 5`;
      const sections = await queryZCQL(app, zcqlSections).catch(() => []);

      if (sections && sections.length > 0) {
        dbContextLines.push('\nRelevant Statutory Sections:');
        sections.forEach((s) => {
          dbContextLines.push(`• ${s.ActName || 'Act'} Section ${s.SectionNumber || ''}: ${s.SectionDescription || 'Penal provision'}`);
        });
      }
    } catch (dbErr) {
      console.warn('ZCQL Context Retrieval Warning:', dbErr.message);
    }

    const dbContext = dbContextLines.length > 0
      ? dbContextLines.join('\n')
      : 'Statewide Karnataka State Police CCTNS Database Context Active';

    // Step 2: Build prompt combining User Question and Database Context
    const prompt = `
Question:
${message.trim()}

Database Context:
${dbContext}
    `.trim();

    // Step 3: Query QuickML RAG model
    const answer = await queryQuickML(app, prompt);

    // Step 4: Return AI response payload
    return jsonSuccess(res, {
      response: answer.response,
      citations: answer.citations || [],
      sources: answer.sources || [],
      thought_process: answer.thought_process || '',
      data: dbRecords
    });
  } catch (err) {
    console.error('AI Chat Processing Error:', err);
    return jsonError(res, err.message || 'AI Chat processing failed', 500);
  }
}

module.exports = {
  chat
};
