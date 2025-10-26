import express from "express";
import { pool } from "../db.js";

const router = express.Router();

async function getQuote(quote) {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${quote}&apikey=${process.env.VANTAGE_API_KEY}`
  );
  const data = await res.json();
  const q = data["Global Quote"];
  return {
    price: parseFloat(q["05. price"]),
    change: parseFloat(q["09. change"]),
  };
}


async function getOverview(quote) {

}

router.get("/info", (req, res) => { });

router.get("/risk", (req, res) => { });

router.get("/overview", async (req, res) => { });


router.post("/buy", async (req, res) => {
  console.log('\n\n\nBUY ENDPOINT HIT\n\n\n');

  const userId = req.auth.userId;
  console.log(req.auth);
  const { quote, number } = req.body;

  const global = await getQuote(quote);
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

  const global = await getQuote(quote);
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
