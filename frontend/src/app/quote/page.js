"use client";

import MyNews from "@/components/MyNews";
import StockChart from "@/components/StockChart";
import StockDetail from "@/components/StockDetail";
import StockGraph from "@/components/StockGraph";
import { useState, useEffect } from "react";
import { getData } from "@/utils/stockData";

export default function StockPage() {
  const test_stats = {
    symbol: "AAPL",
    currentPrice: 175.32,
    allTimeHigh: 198.23,
    allTimeLow: 0.51,
    open: 172.50,
    close: 175.32,
    volume: 45230000,
    marketCap: 2800000000000,
    peRatio: 28.4,
    dividendYield: 0.006,
    fiftyTwoWeekHigh: 182.94,
    fiftyTwoWeekLow: 129.04,
  };

  
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const chartData = await getData();
      setData(chartData);
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading stock data...</div>;
  }
  
  
  return (
    <div className="min-h-screen mt-5 px-10 font-sans dark:bg-black">
      <main className="min-h-screen w-full bg-white dark:bg-black">
        <h1 className="text-4xl mb-6 font-semibold text-black dark:text-zinc-50">
          Stock1: {test_stats.symbol}
        </h1>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Left 1/2: Graph placeholder */}
          <div className="w-full md:w-1/2">
            <StockChart data={data} width={800} />
          </div>

          {/* Right 1/2: Stock details */}
          <div className="w-full md:w-1/2">
            {/* assuming StockDetail accepts these props and renders the view */}
            <StockDetail {...test_stats} />
          </div>
        </div>
        <div className="w-full">
          {/* Company Description */}
          {/* Gemini News Synopsis */}
        </div>
      </main>
    </div>
  );
}