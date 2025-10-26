import express from "express";
import { pool } from "../db.js";
import getQuote from "../utils/getQuote.js";
import getTimeseries from "../utils/getTimeseries.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import client from "../redis.js";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get("/history", async (req, res) => {
  const symbol = req.query.symbol?.toUpperCase();
  if (!symbol) return res.status(400).json({ error: "Missing ?symbol" });

  const candles = await getTimeseries(symbol);
  res.json(candles);
});

router.get("/risk", async (req, res) => {
  const { company } = req.query;
  if (!company) return res.status(400).json({ error: "Company is required" });

  const key = `ai:risk:${company.toUpperCase()}`;

  try {
    // 1) Check Redis cache first
    const cached = await client.get(key);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return res.json(parsed);
      } catch {
        // continue to regenerate if JSON parse fails
      }
    }

    // 2) Cache miss → generate new response
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Provide a concise investment analysis for ${company}. ` +
                `Use no more than 3 credible news or financial sources dated within the past 30 days. ` +
                `Focus on the company’s key financial, market, regulatory, and operational strengths and weaknesses. ` +
                `Summarize your findings in 3–5 sentences.`,
            },
          ],
        },
      ],
      tools: [{ googleSearch: {} }],
    });

    const text = result.response.text() || "";
    const gm = result.response.candidates?.[0]?.groundingMetadata;
    const sources =
      (gm?.groundingChunks || [])
        .map((c) =>
          c.web ? { title: c.web.title || "", url: c.web.uri || "" } : null
        )
        .filter(Boolean)
        .slice(0, 5) || [];

    const payload = { text, sources };

    // 3) Cache result for 5 minutes (300 seconds)
    await client.setEx(key, 300, JSON.stringify(payload));

    res.json(payload);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

router.get("/details", async (req, res) => {
  const { symbol } = req.query;
  if (!symbol) return res.status(400).json({ error: "Symbol is required" });

  const fields = [
    "symbol",
    "open",
    "high",
    "low",
    "price",
    "volume",
    "latestTradingDay",
    "previousClose",
    "change",
    "changePercent",
  ];

  const data = await getQuote(symbol, fields);
  res.json(data);
});


router.post("/buy", async (req, res) => {
  console.log('\n\n\nBUY ENDPOINT HIT\n\n\n');

  const userId = req.auth.userId;
  console.log(req.auth);
  const { quote, number } = req.body;

  const global = await getQuote(quote, ["price", "change"]);
  console.log('\n\n\n TICKER RESULTS: ', global);
  if (!global || !global.price) throw new Error("Price not available for this symbol");

  const price = global.price;
  const totalCost = price * number;

  await pool.query(
    `
    INSERT INTO portfolios (user_id, symbol, shares)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, symbol)
    DO UPDATE SET
      shares = portfolios.shares + EXCLUDED.shares
    `,
    [userId, quote.toUpperCase(), number]
  );


  res.json({ userId, symbol: quote, shares: number, price, totalCost });
});

router.post("/sell", async (req, res) => {
  const userId = req.auth.userId;
  const { quote, number } = req.body;

  const global = await getQuote(quote, ["price", "change"]);
  if (!global || !global.price) throw new Error("Price not available for this symbol");

  const price = global.price;
  const totalValue = price * number;

  await pool.query(
    `
    UPDATE portfolios
    SET shares = shares - $3
    WHERE user_id = $1 AND symbol = $2
    `,
    [userId, quote.toUpperCase(), number]
  );

  res.json({ userId, symbol: quote, sharesSold: number, price, totalValue });
});


export default router;
