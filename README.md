Digital Architect — AI Code Review Frontend

Digital Architect is a lightweight frontend application for analyzing code using AI.
It allows users to paste code, send it to a backend service, and receive structured feedback including a score, improvements, and recommendations.

Features
AI-powered code review (via backend integration)
Code quality score (0–100)
Highlights what to keep
Identifies what to remove
Suggests improvements with fixes
Simple, clean, distraction-free UI

Architecture
Frontend (HTML/CSS/JS)
        ↓
Node.js Server (API Proxy)
        ↓
Python Backend (LLM Processing)
        ↓
LLM (OpenAI / Anthropic / etc.)

The frontend communicates only with the Node.js server.
The Node server forwards requests to the Python backend, which handles AI processing.

Project Structure
digital-architect/
│
├── public/
│   └── index.html        # Frontend UI
│
├── src/
│   └── server.js         # Node.js backend proxy
│
├── package.json
└── README.md
Prerequisites

Make sure you have installed:

Node.js (v16+ recommended)
npm (comes with Node.js)

Optional (for full functionality):

Python backend running on http://localhost:5000
Getting Started
1. Clone or download the project
  git clone <your-repo-url>
  cd digital-architect
2. Install dependencies
  npm install
3. Start the server
  npm start
4. Open the app
  http://localhost:3000
