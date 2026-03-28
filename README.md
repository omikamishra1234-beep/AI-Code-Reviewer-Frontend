# Digital Architect (Fixed)

## Run locally

```bash
npm install
npm start
```

Then open:

http://localhost:3000

## What was fixed

The earlier version did not serve the frontend from Express, so opening just `http://localhost:3000` showed nothing.
This version:
- serves `public/index.html`
- exposes `/analyze`
- works directly at `http://localhost:3000`
