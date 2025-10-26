"use client";

import { useState } from "react";

export default function TradePanel() {
  const [tradeType, setTradeType] = useState("buy");
  const [method, setMethod] = useState("shares");

  return (
    <div className="w-full bg-neutral-900/75 rounded-lg p-4 border border-neutral-800 flex flex-col space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-blue-200">Trade</h2>
        <div className="text-neutral-300 text-sm mt-1">
          Market Price: <span className="text-white font-semibold">$123.45</span>
        </div>
      </div>

      {/* Buy/Sell buttons */}
      <div className="flex bg-neutral-800 rounded-lg overflow-hidden border border-neutral-700">
        <button
          onClick={() => setTradeType("buy")}
          className={`w-1/2 py-2 font-medium transition ${
            tradeType === "buy"
              ? "bg-green-500 text-white"
              : "text-green-400 hover:bg-neutral-700"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setTradeType("sell")}
          className={`w-1/2 py-2 font-medium transition ${
            tradeType === "sell"
              ? "bg-red-500 text-white"
              : "text-red-400 hover:bg-neutral-700"
          }`}
        >
          Sell
        </button>
      </div>

      {/* Shares/Price buttons */}
      <div>
        <label className="text-sm text-neutral-400 mb-1 block">
          Order
        </label>
        <div className="flex bg-neutral-800 rounded-lg overflow-hidden border border-neutral-700">
          <button
            onClick={() => setMethod("shares")}
            className={`w-1/2 py-2 font-medium transition ${
              method === "shares"
                ? "bg-blue-500 text-white"
                : "text-blue-400 hover:bg-neutral-700"
            }`}
          >
            Shares
          </button>
          <button
            onClick={() => setMethod("price")}
            className={`w-1/2 py-2 font-medium transition ${
              method === "price"
                ? "bg-blue-500 text-white"
                : "text-blue-400 hover:bg-neutral-700"
            }`}
          >
            Price
          </button>
        </div>
      </div>

      {/* Input box */}
      <input
        type="number"
        placeholder={`Enter ${method}`}
        className="w-full bg-neutral-800 text-white rounded-md px-3 py-2 outline-none border border-neutral-700 focus:border-blue-400"
      />

      {/* Complete transaction button */}
      <div className="flex justify-center mt-auto">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-10 rounded-md transition">
          Trade
        </button>
      </div>
    </div>
  );
}
