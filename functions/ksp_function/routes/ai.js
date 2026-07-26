'use strict';

const { jsonSuccess, jsonError } = require('../utils/response');
const { queryZCQL } = require('../services/datastore');
const { queryQuickML } = require('../services/quickml');
const logger = require('../utils/logger');

/**
 * POST /ai/chat
 * Processing Pipeline:
 * User Message -> Catalyst Data Store (ZCQL) -> Database Context -> QuickML RAG -> Grounded AI Response
 */
async function chat(app, req, res) {
  const { message } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return jsonError(res, 'Message prompt is required', 400);
  }

  logger.info('AI_CHAT_REQUEST', `Received AI prompt query from user.`, { promptLength: message.length });

  try {
    // Step 1: Query Catalyst Data Store using ZCQL to build database context
    let dbContextLines = [];
    let dbRecords = [];

    try {
      // Query recent FIR cases from CaseMaster
      const zcqlCases = `SELECT CaseMaster.FIRNumber, CaseMaster.CaseDate, CrimeHead.CrimeHeadName, CaseStatusMaster.StatusName FROM CaseMaster LEFT JOIN CrimeHead ON CaseMaster.CrimeMajorHeadID = CrimeHead.CrimeHeadID LEFT JOIN CaseStatusMaster ON CaseMaster.CaseStatusID = CaseStatusMaster.CaseStatusID ORDER BY CaseMaster.CaseDate DESC LIMIT 5`;
      const cases = await queryZCQL(app, zcqlCases).catch((err) => {
        logger.warn('ZCQL_CASES_WARN', `CaseMaster query fallback: ${err.message}`);
        return [];
      });

      if (cases && cases.length > 0) {
        dbRecords = cases;
        dbContextLines.push('Recent Registered FIR Cases in Database:');
        cases.forEach((c) => {
          dbContextLines.push(`• FIR: ${c.FIRNumber || 'N/A'} | Date: ${c.CaseDate || 'N/A'} | Offence: ${c.CrimeHeadName || 'General'} | Status: ${c.StatusName || 'Under Investigation'}`);
        });
      }

      // Query statutory sections from Section & Act
      const zcqlSections = `SELECT Section.SectionNumber, Section.SectionDescription, Act.ActName FROM Section JOIN Act ON Section.ActCode = Act.ActCode LIMIT 5`;
      const sections = await queryZCQL(app, zcqlSections).catch((err) => {
        logger.warn('ZCQL_SECTIONS_WARN', `Section query fallback: ${err.message}`);
        return [];
      });

      if (sections && sections.length > 0) {
        dbContextLines.push('\nRelevant Statutory Sections:');
        sections.forEach((s) => {
          dbContextLines.push(`• ${s.ActName || 'Act'} Section ${s.SectionNumber || ''}: ${s.SectionDescription || 'Penal provision'}`);
        });
      }
    } catch (dbErr) {
      logger.warn('ZCQL_CONTEXT_WARNING', `Database context extraction fallback: ${dbErr.message}`);
    }

    const dbContext = dbContextLines.length > 0
      ? dbContextLines.join('\n')
      : 'Statewide Karnataka State Police CCTNS Database Context Active (Standard Store)';

    // Step 2: Build combined prompt with Database Context
    const combinedPrompt = `
Question:
${message.trim()}

Database Context:
${dbContext}
    `.trim();

    // Step 3: Dispatch to QuickML RAG engine
    const answer = await queryQuickML(app, combinedPrompt);

    logger.info('AI_CHAT_SUCCESS', 'AI response successfully generated.');

    // Step 4: Return response with citations, sources, and thought process
    return jsonSuccess(res, {
      response: answer.response || 'Intelligence processing completed.',
      citations: answer.citations || [],
      sources: answer.sources || [],
      thought_process: answer.thought_process || '',
      data: dbRecords
    });
  } catch (err) {
    logger.error('AI_CHAT_ERROR', 'AI Chat route handler failed', err);
    return jsonError(res, err.message || 'AI Assistant service unavailable', 500);
  }
}

module.exports = {
  chat
};
