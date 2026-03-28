import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MODEL = process.env.MODEL || 'claude-sonnet-4-20250514';
const API_KEY = process.env.ANTHROPIC_API_KEY;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(publicDir));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, model: MODEL, hasApiKey: Boolean(API_KEY) });
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { system, lang, context, code, userMsg } = req.body ?? {};

    if (!API_KEY) {
      return res.status(500).json({ error: 'Missing ANTHROPIC_API_KEY in .env file.' });
    }

    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({ error: 'Code is required.' });
    }

    const requestBody = {
      model: MODEL,
      max_tokens: 1200,
      system:
        typeof system === 'string' && system.trim()
          ? system
          : 'You are an expert AI code reviewer. Return only valid JSON.',
      messages: [
        {
          role: 'user',
          content:
            typeof userMsg === 'string' && userMsg.trim()
              ? userMsg
              : `Language: ${lang || 'unknown'}\n${context ? `Context: ${context}\n` : ''}\n\n${code}`
        }
      ]
    };

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.error?.message || 'Anthropic request failed.';
      return res.status(response.status).json({ error: errorMessage, raw: data });
    }

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Unexpected server error.' });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Digital Architect running at http://localhost:${PORT}`);
});
