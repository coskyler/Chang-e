"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function TradePanel({price, symbol}) {
  const [tradeType, setTradeType] = useState("buy");
  const [method, setMethod] = useState("shares");
  const [amount, setAmount] = useState("");
  const [btnText, setBtnText] = useState("Trade");
  const [submitting, setSubmitting] = useState(false);
  const { getToken } = useAuth();

  const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

  async function handleTrade() {
    if (!API_DOMAIN) return;
    const numeric = Number(amount);
    if (!numeric || numeric <= 0) return;

    // quantity in shares
    const quantity = method === "price" ? numeric / Number(price) : numeric;

    try {
      const token = await getToken();
      setSubmitting(true);
      setBtnText("Loading...");
        const res = await fetch(`${API_DOMAIN}/stock/${tradeType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        body: JSON.stringify({
            quote: symbol,
            number: quantity
        }),
        });

      if (!res.ok) throw new Error("Failed");
      setBtnText("Success");
      setTimeout(() => setBtnText("Trade"), 3000);
    } catch (e) {
      setBtnText("Trade"); // keep original text on error
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-blue-400">Trade {symbol}</h2>
        <div className="text-neutral-300 text-sm mt-1">
          Market Price: <span className="text-white font-semibold">${price.toFixed(2)}</span>
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
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full bg-neutral-800 text-white rounded-md px-3 py-2 outline-none border border-neutral-700 focus:border-blue-400"
      />

      {/* Complete transaction button */}
      <div className="flex justify-center mt-auto">
        <button
          onClick={handleTrade}
          disabled={submitting}
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2 px-10 rounded-md transition"
        >
          {btnText}
        </button>
      </div>
    </div>
  );
}
