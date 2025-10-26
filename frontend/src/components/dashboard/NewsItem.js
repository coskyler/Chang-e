import React from 'react';

const NewsItem = ({ title, ticker, summary, sentiment }) => {
  const isBearish = sentiment === 'bearish';

  return (
    <div className="border border-neutral-700 rounded-lg py-2 px-4 mb-2 flex">
      {/* Left column: stock name & symbol */}
      <div className="flex flex-col mr-4 min-w-20">
        <span className="text-lg font-semibold">{ticker}</span>
        <span className={`text-sm ${isBearish ? "text-red-400" : "text-green-400"}`}>
          {isBearish ? "Bearish" : "Bullish"}
        </span>
      </div>

      {/* Right column: fills remaining space */}
      <div className="flex flex-col flex-1">
        <span className="font-medium text-blue-200">{title}</span>
        <span className="text-sm text-neutral-300">{summary}</span>
      </div>
    </div>
  );
};

export default NewsItem;
