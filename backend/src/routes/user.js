import express from "express";
import { pool } from "../db.js";

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

  res.json(result.rows);
});


export default router;
