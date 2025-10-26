"use client";

import Navbar from "@/components/navbar";
import AnalysisPanel from "@/components/quote/AnalysisPanel";
import StockChart from "@/components/quote/StockChart";
import StockDetail from "@/components/quote/StockDetail";
import StockGraph from "@/components/quote/StockGraph";
import TradePanel from "@/components/quote/TradePanel";

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
  
  return (
    <main className="min-h-screen w-full">
      <Navbar/>
      <div className="p-10">
        <h1 className="text-5xl mb-7 font-semibold text-blue-200">
          {test_stats.symbol} Overview
        </h1>

        <div className="flex gap-3 w-full">
          {/* Left 1/2: Graph placeholder */}
          <div className="w-full bg-neutral-900/75 rounded-lg p-4 border border-neutral-800 max-w-[50vw] overflow-hidden">
            <StockChart />
          </div>

          {/* Right 1/2: Stock details */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex gap-2 w-full">
              <div className="w-full bg-neutral-900/75 rounded-lg p-4 border border-neutral-800">
                {/* assuming StockDetail accepts these props and renders the view */}
                <StockDetail {...test_stats} />
              </div>

              <TradePanel/>
            </div>
            <AnalysisPanel/>
          </div>
        </div>
        <div className="w-full">
          {/* Company Description */}
          {/* Gemini News Synopsis */}
        </div>
      </div>
    </main>
  );
}