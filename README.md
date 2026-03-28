# Digital Architect Local Project

This is a complete local project based on your uploaded frontend, with a Node.js backend added so the AI review button can work safely.

## What is included

- `public/index.html` — your UI frontend
- `src/server.js` — Express backend
- `.env.example` — environment variable template
- `package.json` — dependencies and scripts

## Open in VS Code

1. Extract the zip.
2. Open the `digital-architect-project` folder in VS Code.
3. Copy `.env.example` to `.env`.
4. Put your Anthropic API key into `.env`.
5. Run the commands below.

## Install

```bash
npm install
```

## Run

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Development mode

```bash
npm run dev
```

## Notes

- The frontend calls `/api/analyze`.
- The backend sends the request to Anthropic using your API key from `.env`.
- Do not put your API key directly into the HTML file.

## Example `.env`

```env
ANTHROPIC_API_KEY=your_real_key_here
PORT=3000
MODEL=claude-sonnet-4-20250514
```

## Common errors

### Missing API key
If you see an error about `ANTHROPIC_API_KEY`, create a `.env` file and add your key.

### Port already in use
Change the port in `.env`, for example:

```env
PORT=3001
```

Then open that port in the browser.
