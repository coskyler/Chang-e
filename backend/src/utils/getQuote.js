// src/utils/getQuote.js
import client from "../redis.js";

const FIELD_MAPPING = {
  symbol: "01. symbol",
  open: "02. open",
  high: "03. high",
  low: "04. low",
  price: "05. price",
  volume: "06. volume",
  latestTradingDay: "07. latest trading day",
  previousClose: "08. previous close",
  change: "09. change",
  changePercent: "10. change percent",
};

export default async function getQuote(quote, fields = ["price", "change"]) {
  const key = `quote:${quote.toUpperCase()}`;
  const cachedRaw = await client.get(key);
  const cached = cachedRaw ? JSON.parse(cachedRaw) : null;

  // if cache exists and contains all requested fields, return it
  if (cached && fields.every((f) => f in cached)) {
    const subset = {};
    for (const f of fields) subset[f] = cached[f];
    return subset;
  }

  // otherwise, fetch new data
  const res = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${quote}&apikey=${process.env.VANTAGE_API_KEY}`
  );
  const q = (await res.json())["Global Quote"];
  const result = {};

  for (const f of fields) {
    const val = q?.[FIELD_MAPPING[f]];
    result[f] = val ? parseFloat(val.replace("%", "")) : null;
  }

  // merge with any cached fields and store updated entry for 1 minute
  const updated = { ...(cached || {}), ...result };
  await client.setEx(key, 60, JSON.stringify(updated));

  return result;
}
