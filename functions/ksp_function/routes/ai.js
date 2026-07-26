'use strict';

const { jsonSuccess, jsonError } = require('../utils/response');
const { queryQuickML } = require('../services/quickml');
const logger = require('../utils/logger');

async function chat(app, req, res) {
  const { message } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return jsonError(res, 'Message is required', 400);
  }

  logger.info('AI_CHAT_REQUEST', 'Processing AI query', { promptLength: message.length });

  try {
    const answer = await queryQuickML(message.trim());

    logger.info('AI_CHAT_SUCCESS', 'AI response generated.');

    return jsonSuccess(res, {
      response: answer.response || '',
      citations: answer.citations || [],
      sources: answer.sources || [],
      thought_process: answer.thought_process || ''
    });
  } catch (err) {
    logger.error('AI_CHAT_ERROR', 'AI chat failed', err);
    return jsonError(res, err.message || 'AI service unavailable', 500);
  }
}

module.exports = {
  chat
};
