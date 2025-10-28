"use client";

import Navbar from "@/components/navbar";
import AnalysisPanel from "@/components/quote/AnalysisPanel";
import StockChart from "@/components/quote/StockChart";
import StockDetail from "@/components/quote/StockDetail";
import TradePanel from "@/components/quote/TradePanel";
import { useAuth } from "@clerk/nextjs";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function StockPage() {
  const { symbol } = useParams();
  const { getToken } = useAuth();

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
      
    const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/stock/details?symbol=${symbol}`,
        { credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          }
        }
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
  }, [symbol, getToken]);

  return (
    <main className="min-h-screen w-full flex flex-col pb-25"> {/* <-- flex column */}
      <Navbar /> {/* stays shrink-0 by default */}

      {/* content area fills remaining height */}
      <div className="p-10 flex-1 flex flex-col min-h-0">
        <h1 className="text-5xl mb-7 font-semibold text-white">{symbol} Overview</h1>

        {/* main row fills remaining height */}
        <div className="flex gap-3 w-full flex-1 min-h-0">
          {/* Left half: chart, must have h-full */}
          <div className="w-full max-w-[50vw] bg-neutral-900/75 rounded-lg p-4 border border-neutral-800 overflow-hidden items-center justify-center">
            <StockChart />
          </div>

          {/* Right half: column, must be flex-1 + min-h-0 to allow inner growth */}
          <div className="flex flex-col w-full gap-2 flex-1 min-h-0">
            {/* Top row: details + trade; let it be auto height */}
            <div className="flex gap-2 w-full">
              <div className="w-1/2 bg-neutral-900/75 rounded-lg p-4 border border-neutral-800">
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

              <div className="w-1/2 bg-neutral-900/75 rounded-lg p-4 border border-neutral-800">
                <TradePanel price={price} symbol={symbol} />
              </div>
            </div>


            {/* Make AnalysisPanel occupy remaining vertical space */}
            <div className="flex-1 min-h-0 bg-neutral-900/75 rounded-lg p-4 border border-neutral-800 overflow-auto">
              <AnalysisPanel />
            </div>
          </div>
        </div>

        <div className="w-full">{/* Company Description / News */}</div>
      </div>
    </main>
  );
}
