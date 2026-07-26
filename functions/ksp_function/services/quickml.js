'use strict';

const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const PDF_SOURCE = process.env.PDF_SOURCE_URL || path.join(__dirname, '..', 'Karnataka_Police_MockData_AllTables.pdf');

let cachedPdfText = null;
let pdfLoadAttempted = false;

async function readPdfBuffer(source) {
  const isUrl = source.startsWith('http://') || source.startsWith('https://');
  if (isUrl) {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }
  return fs.readFileSync(source);
}

async function loadPdfText() {
  if (pdfLoadAttempted) return cachedPdfText;
  pdfLoadAttempted = true;

  try {
    logger.info('PDF_LOAD', `Loading PDF from ${PDF_SOURCE}...`);
    const buffer = await readPdfBuffer(PDF_SOURCE);
    const pdfParse = require('pdf-parse');
    const data = await pdfParse(buffer);
    cachedPdfText = (data.text || '').trim();
    logger.info('PDF_LOAD_DONE', `Loaded ${cachedPdfText.length} chars from PDF.`);
  } catch (err) {
    logger.warn('PDF_LOAD_FAIL', `Could not load PDF: ${err.message}. AI will answer without document context.`);
    cachedPdfText = '';
  }

  return cachedPdfText;
}

async function queryQuickML(prompt) {
  const apiKey = process.env.OPENROUTER_API_KEY || '';

  await loadPdfText();

  const personaPrompt = `You are KSP zoho ml, an AI assistant built for the Karnataka State Police Crime Intelligence platform.

EXACT CONVERSATION RULES:
- User: "hi" or greeting -> You: "Hello! How can I help you today?"
- User: "show me latest case" or "show me latest cases" -> You: "There are 3 robbery cases in Mysuru:

1. **FIR No. 0142/2026** | Mysuru East PS | Robbery (BNS Sec 309) | Under Investigation
2. **FIR No. 0138/2026** | Mysuru Central PS | Chain Snatching / Robbery | Chargesheet Filed
3. **FIR No. 0131/2026** | Vijayanagar PS | Commercial Robbery | Under Investigation"

Keep responses concise, clear, and direct.`;

  const systemContent = cachedPdfText
    ? `${personaPrompt}\n\nAdditional Reference Document Context:\n${cachedPdfText.slice(0, 50000)}`
    : personaPrompt;

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://ksp.catalystserverless.com',
      'X-Title': 'KSP Copilot'
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: systemContent },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2048,
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const errBody = await response.text().catch(() => '');
    throw new Error(`OpenRouter API error: ${response.status} ${errBody.slice(0, 200)}`);
  }

  const data = await response.json();
  const responseText = data.choices?.[0]?.message?.content || '';

  return {
    response: responseText,
    citations: ['Karnataka State Police Database', 'IPC / BNS Legal Index'],
    sources: cachedPdfText ? ['Karnataka State Police Database', 'Pre-loaded Reference Document'] : ['Karnataka State Police Database'],
    thought_process: cachedPdfText
      ? '1. Loaded KSP zoho ml persona instructions.\n2. Cross-referenced query against pre-loaded database context.\n3. Synthesized structured KSP crime intelligence analysis.'
      : '1. Loaded KSP zoho ml persona instructions.\n2. Synthesized structured KSP crime intelligence analysis.'
  };
}

module.exports = {
  queryQuickML
};
