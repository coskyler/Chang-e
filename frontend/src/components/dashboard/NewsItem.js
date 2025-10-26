import React from "react";

const NewsItem = ({ company, symbol, text, citations = [] }) => {
  return (
    <div className="border border-neutral-700 rounded-lg py-2 px-4 mb-2 flex flex-col">
      {/* Header: company + symbol */}
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-white">{company}</span>
          <span className="text-sm text-blue-300">{symbol}</span>
        </div>
      </div>

      {/* Body: generated text */}
      <p className="text-sm text-neutral-300">{text}</p>

      {/* Citations row */}
      {citations.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {citations.slice(0, 5).map((c, i) => (
            <a
              key={i}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-neutral-800 hover:bg-neutral-700 text-blue-300 border border-neutral-700 rounded px-2 py-1 truncate max-w-[14rem]"
              title={c.title}
            >
              {c.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsItem;
