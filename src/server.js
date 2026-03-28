import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "..", "public");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(publicDir));

function buildDummyAnalysis(code, language = "javascript") {
  const issues = [];
  let health = 92;

  if (code.includes("var ")) {
    issues.push({
      title: "Use let/const instead of var",
      description: "var is function-scoped and can create confusing behavior. Prefer let or const.",
      fix: code.replace(/\bvar\b/g, "let")
    });
    health -= 10;
  }

  if (/<=\s*\w+\.length/.test(code)) {
    issues.push({
      title: "Possible off-by-one loop",
      description: "Using <= with .length can read one item past the end of an array.",
      fix: "Change <= items.length to < items.length"
    });
    health -= 12;
  }

  if (language === "sql" && /select\s+\*+/i.test(code)) {
    issues.push({
      title: "Avoid SELECT *",
      description: "Selecting all columns can hurt performance and make queries harder to maintain.",
      fix: "Select only the columns you need."
    });
    health -= 8;
  }

  if (!issues.length) {
    return {
      summary: "No obvious issues were detected in this local demo analysis.",
      health,
      issues: []
    };
  }

  return {
    summary: `Found ${issues.length} potential issue${issues.length === 1 ? "" : "s"} in this code.`,
    health: Math.max(40, health),
    issues
  };
}

app.post("/analyze", (req, res) => {
  try {
    const { code, language } = req.body || {};
    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Code is required." });
    }

    const result = buildDummyAnalysis(code, language);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Server error" });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Digital Architect running on http://localhost:${PORT}`);
});
