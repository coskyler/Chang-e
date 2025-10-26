// src/utils/getName.js
import client from "../redis.js";

export default async function getName(symbol) {
  const key = `name:${symbol.toUpperCase()}`;
  const cached = await client.get(key);
  if (cached) return cached;

  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(
    symbol
  )}&apikey=${process.env.VANTAGE_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  const matches = data?.bestMatches || [];

  const match =
    matches.find(
      (m) => (m["1. symbol"] || "").toUpperCase() === symbol.toUpperCase()
    ) || matches[0];

  const name = match?.["2. name"] || "";

  // cache for 24 hours
  await client.setEx(key, 86400, name);

  return name;
}
