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
  price = 0,
  open = 0,
  high = 0,
  low = 0,
  volume = 0,
  latestTradingDay = '-',
  previousClose = 0,
  change = 0,
  changePercent = 0, // numeric (e.g., 0.59 for 0.59%)
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-blue-400">{symbol}</h2>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>Price</div>
        <div className="text-right">${fmtCurrency(price)}</div>

        <div>Open</div>
        <div className="text-right">${fmtCurrency(open)}</div>

        <div>Previous Close</div>
        <div className="text-right">${fmtCurrency(previousClose)}</div>

        <div>Day High</div>
        <div className="text-right">${fmtCurrency(high)}</div>

        <div>Day Low</div>
        <div className="text-right">${fmtCurrency(low)}</div>

        <div>Change</div>
        <div className="text-right">${fmtCurrency(change)}</div>

        <div>Change %</div>
        <div className="text-right">
          {typeof changePercent === 'number' && !Number.isNaN(changePercent)
            ? `${changePercent.toFixed(2)}%`
            : '-'}
        </div>

        <div>Latest Trading Day</div>
        <div className="text-right">{latestTradingDay || '-'}</div>

        <div>Volume</div>
        <div className="text-right">{fmtNumber(volume)}</div>
      </div>
    </div>
  );
};

export default StockDetail;
