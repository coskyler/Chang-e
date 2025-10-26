// src/utils/getTimeseries.js
import client from "../redis.js";

export default async function getTimeseries(symbol) {
  const sym = symbol.toUpperCase();
  const key = `timeseries:daily:${sym}`;
  const cached = await client.get(key);
  if (cached) return JSON.parse(cached);

  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${encodeURIComponent(
    sym
  )}&outputsize=compact&apikey=${process.env.VANTAGE_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.Note) throw new Error("Rate limit: " + data.Note);
  if (data["Error Message"]) throw new Error("Error: " + data["Error Message"]);

  const series = data["Time Series (Daily)"];
  if (!series) throw new Error("Invalid data from API");

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);

  const candles = Object.entries(series)
    .filter(([date]) => new Date(date) >= cutoff)
    .map(([date, ohlc]) => ({
      t: date,
      o: parseFloat(ohlc["1. open"]),
      h: parseFloat(ohlc["2. high"]),
      l: parseFloat(ohlc["3. low"]),
      c: parseFloat(ohlc["4. close"]),
      v: parseInt(ohlc["5. volume"], 10),
    }))
    .sort((a, b) => a.t.localeCompare(b.t));

  await client.setEx(key, 900, JSON.stringify(candles));
  return candles;
}
