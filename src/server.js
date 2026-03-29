import express from "express";
import cors from "cors";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// 👉 CHANGE to the port your Python backend runs on
const PYTHON_API = "http://localhost:8000/analyze";

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "..", "public")));

/**
 * ✅ Validate LLM response structure
 */
function validateResponse(data) {
  if (!data) return false;

  return (
    typeof data.score === "number" &&
    Array.isArray(data.keep) &&
    Array.isArray(data.remove) &&
    Array.isArray(data.improve)
  );
}

/**
 * ✅ Fallback response (if LLM fails)
 */
function fallbackResponse() {
  return {
    score: 50,
    summary: "Analysis could not be completed properly.",
    keep: [],
    remove: [],
    improve: [
      {
        title: "Analysis Error",
        description: "LLM did not return a valid response.",
        fix: "Check backend or prompt formatting."
      }
    ]
  };
}

/**
 * 🚀 MAIN ROUTE
 */
app.post("/analyze", async (req, res) => {
  try {
    const { code, language, reviewName } = req.body;

    if (!code || typeof code !== "string") {
      return res.status(400).json({
        error: "Code is required"
      });
    }

    // 🔥 Call Python backend
    const response = await fetch(PYTHON_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code,
        language,
        reviewName
      })
    });

    if (!response.ok) {
      throw new Error("Python backend error");
    }

    let data = await response.json();

    // 🧠 Validate structure
    if (!validateResponse(data)) {
      console.warn("⚠ Invalid LLM response format");
      data = fallbackResponse();
    }

    res.json(data);

  } catch (err) {
    console.error("❌ Error:", err.message);

    res.status(500).json({
      ...fallbackResponse(),
      error: "Failed to process request"
    });
  }
});

/**
 * ✅ Serve frontend
 */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

/**
 * 🚀 START SERVER
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});