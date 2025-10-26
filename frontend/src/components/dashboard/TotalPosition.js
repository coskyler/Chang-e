import React from 'react';

const TotalPosition = ({ totalValue = 0, totalChange = 0 }) => {
  const isPositive = totalChange >= 0;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';

  const formattedValue = typeof totalValue === 'number'
    ? totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '0.00';

  const formattedChange = typeof totalChange === 'number'
    ? Math.abs(totalChange).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '0.00';

  // Compute percentage change safely
  const percentageChange = totalValue
    ? ((totalChange / (totalValue - totalChange)) * 100).toFixed(2)
    : '0.00';

  return (
    <div className="bg-neutral-900/75 rounded-lg p-4 border border-neutral-800">
      <h1 className="text-2xl font-semibold text-blue-400 pb-6">Balance</h1>
      <div className="font-semibold text-4xl mb-2">
        ${formattedValue}
      </div>
      <div className={`${changeColor}`}>
        {isPositive ? '+' : '-'}${formattedChange} ({Math.abs(percentageChange)}%)
      </div>
    </div>
  );
};

export default TotalPosition;
