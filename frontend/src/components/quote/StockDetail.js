

import React from 'react';

const fmtCurrency = (n) => {
  if (typeof n !== 'number' || Number.isNaN(n)) return '-';
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const fmtNumber = (n) => {
  if (typeof n !== 'number' || Number.isNaN(n)) return '-';
  return n.toLocaleString('en-US');
};

const StockDetail = ({
  symbol = '-',
  currentPrice = 0,
  allTimeHigh = 0,
  allTimeLow = 0,
  open = 0,
  close = 0,
  volume = 0,
  marketCap = 0,
  peRatio = null,
  dividendYield = null,
  fiftyTwoWeekHigh = 0,
  fiftyTwoWeekLow = 0,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-blue-200">{symbol}</h2>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>Current Price</div>
        <div className="text-right">${fmtCurrency(currentPrice)}</div>

        <div>Open</div>
        <div className="text-right">${fmtCurrency(open)}</div>

        <div>Close</div>
        <div className="text-right">${fmtCurrency(close)}</div>

        <div>All-time High</div>
        <div className="text-right">${fmtCurrency(allTimeHigh)}</div>

        <div>All-time Low</div>
        <div className="text-right">${fmtCurrency(allTimeLow)}</div>

        <div>52wk High</div>
        <div className="text-right">${fmtCurrency(fiftyTwoWeekHigh)}</div>

        <div>52wk Low</div>
        <div className="text-right">${fmtCurrency(fiftyTwoWeekLow)}</div>

        <div>Volume</div>
        <div className="text-right">{fmtNumber(volume)}</div>

        <div>Market Cap</div>
        <div className="text-right">${fmtNumber(marketCap)}</div>

        <div>P/E Ratio</div>
        <div className="text-right">{peRatio == null ? '-' : String(peRatio)}</div>

        <div>Dividend Yield</div>
        <div className="text-right">{dividendYield == null ? '-' : (dividendYield * 100).toFixed(2) + '%'}</div>
      </div>
    </div>
  );
};

export default StockDetail;