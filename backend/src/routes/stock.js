import express from "express";
import { pool } from "../db.js";
import getQuote from "../utils/getQuote.js";

const router = express.Router();

router.get("/history", (req, res) => { });

router.get("/risk", (req, res) => { });

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
