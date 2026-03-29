# 🤖 CodeCritic

PHD Project for Generative AI with Large Language Models (MSAI-630-M50)

CodeCritic is a lightweight frontend application for analyzing
code using AI.\
It allows users to paste code, send it to a backend service, and receive
structured feedback including a score, improvements, and
recommendations.

------------------------------------------------------------------------

## Features

-   AI-powered code review (via backend integration)\
-   Code quality score (0--100)\
-   Highlights what to keep\
-   Identifies what to remove\
-   Suggests improvements with fixes\
-   Simple, clean, distraction-free UI

------------------------------------------------------------------------

## Architecture

Frontend (HTML/CSS/JS) ↓ Node.js Server (API Proxy) ↓ Python Backend
(LLM Processing) ↓ LLM (OpenAI / Anthropic / etc.)

The frontend communicates only with the Node.js server.\
The Node server acts as a proxy and forwards requests to the Python backend, which handles
AI processing - needed during development for mitigating CORS errors.

------------------------------------------------------------------------

## Project Structure

digital-architect/ │ ├── public/ │ └── index.html \# Frontend UI │ ├──
src/ │ └── server.js \# Node.js backend proxy │ ├── package.json └──
README.md

------------------------------------------------------------------------

## Prerequisites

Make sure you have installed:

-   Node.js (v16+ recommended)\
-   npm (comes with Node.js)

------------------------------------------------------------------------

## Getting Started

### 1. Clone or download the project

git clone `<your-repo-url>`{=html}\
cd digital-architect

### 2. Install dependencies

npm install

### 3. Start the server

npm start

### 4. Open the app

http://localhost:3000
