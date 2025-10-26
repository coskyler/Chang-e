export async function getDailyTimeSeries(symbol) {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
  );
  const data = await res.json();
  const timeSeries = data["Daily Time Series"];
  if (!timeSeries) return [];
  
  const parsedData = Object.entries(timeSeries)
    .map(([date, values]) => ({
      date: new Date(date),
      open: parseFloat(values["1. open"]),
      high: parseFloat(values["2. high"]),
      low: parseFloat(values["3. low"]),
      close: parseFloat(values["4. close"]),
      volume: parseInt(values["5. volume"], 10),
    }))
    .sort((a, b) => a.date - b.date);

  return parsedData;
}
