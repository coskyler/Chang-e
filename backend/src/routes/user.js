import express from "express";
import { pool } from "../db.js";
import getQuote from "../utils/getQuote.js";
import getName from "../utils/getName.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import client from "../redis.js";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get("/portfolio", async (req, res) => {
  const userId = req.auth.userId;

  const result = await pool.query(
    `
    SELECT symbol, shares
    FROM portfolios
    WHERE user_id = $1
    `,
    [userId]
  );

  const rows = result.rows;

  const withQuotes = await Promise.all(
    rows.map(async (r) => {
      const { price, change } = await getQuote(r.symbol);
      const name = await getName(r.symbol);
      const shares = parseFloat(r.shares);

      return {
        symbol: r.symbol,
        name,
        shares,
        price,
        change,
        value: shares * price,
      };
    })
  );

  const balance = withQuotes.reduce((sum, r) => sum + r.value, 0);
  const netChange = withQuotes.reduce(
    (sum, r) => sum + r.shares * r.change,
    0
  );

  res.json({
    portfolio: withQuotes,
    balance,
    netChange,
  });
});



router.get("/news", async (req, res) => {
  try {
    const userId = req.auth.userId;

    // 1) Load portfolio with current quotes
    const result = await pool.query(
      `SELECT symbol, shares FROM portfolios WHERE user_id = $1`,
      [userId]
    );

    const rows = result.rows;
    if (!rows?.length) {
      return res.json({ news: [] });
    }

    const withQuotes = await Promise.all(
      rows.map(async (r) => {
        const name = await getName(r.symbol);
        const { price = 0 } = await getQuote(r.symbol, ["price"]);
        const shares = parseFloat(r.shares);
        return {
          symbol: r.symbol,
          name,
          shares,
          price,
          value: shares * price,
        };
      })
    );

    // 2) Top 5 by value (ignore zero-value)
    const top = withQuotes
      .filter((r) => r.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    if (!top.length) {
      return res.json({ news: [] });
    }

    // 3) Gemini setup
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const makePrompt = (company) =>
      `Provide a concise, plain-text investment risk summary for ${company}. ` +
      `Use up to 5 credible and verifiable financial or news sources published within the last 30 days. ` +
      `Focus specifically on major financial, market, regulatory, and operational risks that could affect investors. ` +
      `Avoid any formatting, bullet points, or lists—respond in plain sentences only. ` +
      `Summarize all findings clearly, but briefly in 2-3 sentences.`;

    // 4) For each top symbol: try Redis cache first; if miss, call Gemini and cache 5 min
    const reports = await Promise.all(
      top.map(async ({ symbol, name }) => {
        const key = `ai:news:${symbol.toUpperCase()}`;

        // try cache
        const cached = await client.get(key);
        if (cached) {
          try {
            return JSON.parse(cached);
          } catch {
            // fall through to regenerate if cache parse fails
          }
        }

        // cache miss -> generate
        try {
          const result = await model.generateContent({
            contents: [
              { role: "user", parts: [{ text: makePrompt(name || symbol) }] },
            ],
            tools: [{ googleSearch: {} }],
          });

          const text = result.response.text() || "";
          const gm = result.response.candidates?.[0]?.groundingMetadata;
          const citations =
            (gm?.groundingChunks || [])
              .map((c) =>
                c.web ? { title: c.web.title || "", url: c.web.uri || "" } : null
              )
              .filter(Boolean)
              .slice(0, 5) || [];

          const payload = {
            company: name || symbol,
            symbol,
            text,
            citations,
          };

          // set 5-minute TTL
          await client.setEx(key, 300, JSON.stringify(payload));

          return payload;
        } catch (err) {
          return {
            company: name || symbol,
            symbol,
            text: "",
            citations: [],
            error: "Gemini request failed",
          };
        }
      })
    );

    res.json({ news: reports });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to build news reports" });
  }
});


export default router;
