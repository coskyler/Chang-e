import express from "express";
import { pool } from "../db.js";
import getQuote from "../utils/getQuote.js";
import getName from "../utils/getName.js";

const router = express.Router();

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

export default router;
