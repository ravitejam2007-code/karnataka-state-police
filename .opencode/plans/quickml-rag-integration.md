# QuickML RAG Integration Plan

## Step 1: Set Catalyst Environment Variables

In the Catalyst console, navigate to your project → **Process/Function** → **ksp_function** → **Environment Variables** and add:

| Variable | Description |
|---|---|
| `QUICKML_CLIENT_ID` | Zoho OAuth self-client Client ID (scope: `QuickML.deployment.READ`) |
| `QUICKML_CLIENT_SECRET` | Zoho OAuth self-client Client Secret |
| `QUICKML_REFRESH_TOKEN` | Zoho OAuth refresh token (generated with `access_type=offline`) |

---

## Step 2: Replace `functions/ksp_function/services/quickml.js`

Replace the entire placeholder with:

```js
'use strict';

const ZOHO_OAUTH_TOKEN_URL = 'https://accounts.zoho.in/oauth/v2/token';
const QUICKML_RAG_URL = 'https://api.catalyst.zoho.in/quickml/v1/project/55466000000016001/rag/answer';
const CATALYST_ORG_ID = '60079542184';

let cachedAccessToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  if (cachedAccessToken && Date.now() < tokenExpiresAt) {
    return cachedAccessToken;
  }

  const clientId = process.env.QUICKML_CLIENT_ID;
  const clientSecret = process.env.QUICKML_CLIENT_SECRET;
  const refreshToken = process.env.QUICKML_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'QuickML OAuth credentials not configured. ' +
      'Set QUICKML_CLIENT_ID, QUICKML_CLIENT_SECRET, and QUICKML_REFRESH_TOKEN ' +
      'in Catalyst environment variables.'
    );
  }

  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'refresh_token'
  });

  const response = await fetch(ZOHO_OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  if (!response.ok) {
    const err = await response.text().catch(() => '');
    throw new Error(`Zoho OAuth token refresh failed: ${response.status} ${err}`);
  }

  const data = await response.json();
  cachedAccessToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in_sec || 3600) * 1000 - 60000;
  return cachedAccessToken;
}

async function queryQuickML(app, prompt, context = []) {
  const accessToken = await getAccessToken();

  const enrichedPrompt = context.length > 0
    ? `Context from KSP Crime Database:\n${
        context.map(c => JSON.stringify(c, null, 2)).join('\n\n')
      }\n\nUser Question: ${prompt}`
    : prompt;

  const response = await fetch(QUICKML_RAG_URL, {
    method: 'POST',
    headers: {
      'CATALYST-ORG': CATALYST_ORG_ID,
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: enrichedPrompt })
  });

  if (!response.ok) {
    const err = await response.text().catch(() => '');
    throw new Error(`QuickML RAG API error: ${response.status} ${err}`);
  }

  const data = await response.json();

  return {
    response: data.response || data.answer || data.generated_text || JSON.stringify(data),
    sources: data.citations || data.sources ||
      (data.thought_process
        ? data.thought_process.map(t => t.source || t.document_id).filter(Boolean)
        : [])
  };
}

module.exports = {
  queryQuickML
};
```

---

## Step 3: Optional Enhancement — Update `functions/ksp_function/routes/ai.js`

The current route uses **intent-based routing** (keywords → DB query → static response) with QuickML as a fallback. For a true RAG pipeline, modify it so **all queries** get DB context first, then pass to QuickML RAG:

```js
'use strict';

const { jsonSuccess, jsonError } = require('../utils/response');
const { queryZCQL } = require('../services/datastore');
const { queryQuickML } = require('../services/quickml');

async function chat(app, req, res) {
  const { message } = req.body || {};

  if (!message || typeof message !== 'string') {
    return jsonError(res, 'Message prompt is required', 400);
  }

  try {
    const promptLower = message.toLowerCase();
    let context = [];

    if (promptLower.includes('case') || promptLower.includes('fir') ||
        promptLower.includes('robbery') || promptLower.includes('theft')) {
      const zcql = `SELECT CaseMaster.FIRNumber, CaseMaster.CaseDate, CrimeHead.CrimeHeadName, CaseStatusMaster.StatusName FROM CaseMaster LEFT JOIN CrimeHead ON CaseMaster.CrimeMajorHeadID = CrimeHead.CrimeHeadID LEFT JOIN CaseStatusMaster ON CaseMaster.CaseStatusID = CaseStatusMaster.CaseStatusID ORDER BY CaseMaster.CaseDate DESC LIMIT 10`;
      context = await queryZCQL(app, zcql).catch(() => []);
    } else if (promptLower.includes('ipc') || promptLower.includes('bns') ||
               promptLower.includes('section') || promptLower.includes('act')) {
      const zcql = `SELECT Section.SectionNumber, Section.SectionDescription, Act.ActName FROM Section JOIN Act ON Section.ActCode = Act.ActCode LIMIT 10`;
      context = await queryZCQL(app, zcql).catch(() => []);
    } else if (promptLower.includes('stat') || promptLower.includes('analytics') ||
               promptLower.includes('count') || promptLower.includes('total')) {
      const countRes = await queryZCQL(app, 'SELECT COUNT(CaseMasterID) FROM CaseMaster').catch(() => []);
      const count = (countRes[0] && (countRes[0]['COUNT(CaseMasterID)'] || countRes[0].field_expression_0)) || 'N/A';
      context = [{ metric: 'Total FIR Cases', value: count }];
    }

    const mlResult = await queryQuickML(app, message, context);

    return jsonSuccess(res, {
      response: mlResult.response,
      data: context.length > 0 ? context : null,
      sources: mlResult.sources
    });
  } catch (err) {
    return jsonError(res, err.message || 'AI Chat processing failed', 500);
  }
}

module.exports = {
  chat
};
```

**Key change**: Instead of building static response text for each intent, all paths gather DB context and pass it to QuickML RAG. The LLM synthesizes the final answer using both your Knowledge Base documents AND live database records.

---

## Step 4: Connect Frontend to Live API

### 4a. Update `frontend/src/types/api.ts`

Update `AIChatResponse` to include the response breakdown:

```ts
export interface AIChatResponse {
  response: string;
  data?: unknown;
  sources?: string[];
  thought_process?: Array<{ source: string; content: string; document_id: string }>;
}
```

### 4b. Update `frontend/src/features/ai-assistant/AIAssistantPage.tsx`

In the `handleSend` function, replace the mock data logic with the live API call:

```tsx
// 1. Import the hook at the top
import { useAIChat } from "./hooks/useAIChat";

// 2. Inside the component, add:
const aiChat = useAIChat();

// 3. Replace the handleSend function:
const handleSend = (textToSend?: string) => {
  const query = textToSend || inputQuery;
  if (!query.trim() || isThinking) return;

  const userMsg: ChatMessage = {
    id: `user-${Date.now()}`,
    sender: "user",
    text: query,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  setMessages(prev => [...prev, userMsg]);
  setInputQuery("");
  setIsThinking(true);

  aiChat.mutate(
    { message: query },
    {
      onSuccess: (data) => {
        setIsThinking(false);
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          report: data.data ? extractReport(data) : null
        };
        setMessages(prev => [...prev, aiMsg]);
      },
      onError: (err) => {
        setIsThinking(false);
        toast.error(err instanceof Error ? err.message : "AI request failed");
      }
    }
  );
};

// Helper to extract IntelligenceResponse from API data if applicable
function extractReport(data: AIChatResponse): IntelligenceResponse | null {
  if (!data.data || !Array.isArray(data.data)) return null;
  return {
    items: data.data.map((d: Record<string, unknown>) => ({
      type: "ExecutiveSummary" as const,
      content: JSON.stringify(d)
    })),
    confidence_score: 0.85,
    sources: data.sources || []
  };
}
```

---

## Step 5: Upload Documents to QuickML Knowledge Base

1. Navigate to QuickML → **Generative AI** → **Knowledge Base**
2. Upload relevant police/crime documents (PDF, DOCX, TXT, max 500KB each):
   - IPC/BNS legal sections reference
   - Crime reporting SOPs
   - FIR templates and guidelines
   - District crime statistics summaries
   - Repeat offender profiles
3. Copy Document IDs for selective RAG queries

---

## Prerequisites Summary

| # | Task | Where |
|---|---|---|
| 1 | Create Zoho OAuth self-client app with scope `QuickML.deployment.READ` | [Zoho Accounts Console](https://accounts.zoho.in) |
| 2 | Generate refresh token with `access_type=offline` | OAuth playground or API |
| 3 | Set 3 env vars in Catalyst console | Catalyst → ksp_function → Env Variables |
| 4 | Upload crime documents to Knowledge Base | QuickML → Generative AI → Knowledge Base |
| 5 | Verify request body format in "View API" popup | QuickML → RAG → View API |

---

## Architecture Flow

```
User Query (Frontend)
    ↓ POST /ai/chat
Backend (routes/ai.js)
    ↓
1. Query Catalyst Data Store (ZCQL) → retrieve relevant case/legal/stat data
2. Pass question + DB context → queryQuickML()
    ↓
QuickML RAG Service (services/quickml.js)
    ├─ Refresh/use cached OAuth token
    ├─ POST to RAG endpoint with enriched prompt
    └─ Return AI response + citations
    ↓
Frontend renders response + sources + optional intelligence report
```
