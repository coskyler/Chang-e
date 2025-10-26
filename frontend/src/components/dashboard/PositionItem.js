import React from "react";

const PositionItem = ({ name, symbol, price = 0, change = 0, shares = 0, value = 0 }) => {
  const priceChange = price ? (change / price) * 100 : 0;
  const isPositiveChange = priceChange >= 0;

  return (
    <div className="border border-neutral-700 rounded-lg py-2 px-4 mb-2 grid grid-cols-4 gap-4">
      {/* Column 1: Name + Symbol */}
      <div className="flex flex-col">
        <span className="text-md font-semibold">{name || "—"}</span>
        <span className="text-sm text-blue-300">{symbol || ""}</span>
      </div>

      {/* Column 2: Price + % Change */}
      <div className="flex flex-col">
        <span className="font-medium">
          ${Number(price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
        <span className={isPositiveChange ? "text-green-400" : "text-red-400"}>
          {isPositiveChange ? "+" : ""}
          {priceChange.toFixed(2)}%
        </span>
      </div>

      {/* Column 3: Shares */}
      <div className="flex flex-col">
        <span className="text-sm text-neutral-400">Shares</span>
        <span className="font-medium">{shares.toFixed(3)}</span>
      </div>

      {/* Column 4: Total Value */}
      <div className="flex flex-col">
        <span className="text-sm text-neutral-400">Value</span>
        <span className="font-medium">
          ${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

export default PositionItem;
