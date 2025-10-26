"use client";

import Navbar from "@/components/navbar";
import AnalysisPanel from "@/components/quote/AnalysisPanel";
import StockChart from "@/components/quote/StockChart";
import StockDetail from "@/components/quote/StockDetail";
import StockGraph from "@/components/quote/StockGraph";
import TradePanel from "@/components/quote/TradePanel";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function StockPage() {
  const { symbol } = useParams();

  const [open, setOpen] = useState(0);
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [price, setPrice] = useState(0);
  const [volume, setVolume] = useState(0);
  const [latestTradingDay, setLatestTradingDay] = useState("");
  const [previousClose, setPreviousClose] = useState(0);
  const [change, setChange] = useState(0);
  const [changePercent, setChangePercent] = useState(0);

  useEffect(() => {
    async function fetchDetails() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/stock/details?symbol=${symbol}`,
        { credentials: "include" }
      );
      const data = await res.json();

      setOpen(data.open || 0);
      setHigh(data.high || 0);
      setLow(data.low || 0);
      setPrice(data.price || 0);
      setVolume(data.volume || 0);
      setLatestTradingDay(data.latestTradingDay || "");
      setPreviousClose(data.previousClose || 0);
      setChange(data.change || 0);
      setChangePercent(data.changePercent || 0);
    }

    fetchDetails();
  }, [symbol]);

  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <div className="p-10">
        <h1 className="text-5xl mb-7 font-semibold text-white">
          {symbol} Overview
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
                <StockDetail
                  symbol={symbol}
                  price={price}
                  open={open}
                  high={high}
                  low={low}
                  volume={volume}
                  latestTradingDay={latestTradingDay}
                  previousClose={previousClose}
                  change={change}
                  changePercent={changePercent}
                />
              </div>

              <TradePanel price={price} symbol={symbol} />
            </div>
            <AnalysisPanel />
          </div>
        </div>
        <div className="w-full">{/* Company Description / News */}</div>
      </div>
    </main>
  );
}
