import React from 'react';
import PositionItem from './PositionItem';

const PositionList = ({ positions }) => {
  return (
    <div className="bg-neutral-900/75 rounded-lg p-4 border border-neutral-800 flex flex-col min-h-0">
      <h2 className="text-2xl font-semibold text-blue-200 pb-6">Your Positions</h2>
      <div className="flex-1 overflow-y-auto pr-2 min-h-0">
        {positions &&
          positions.map((position) => (
            <PositionItem
            key={position.symbol}
            name={position.name}
            symbol={position.symbol}
            price={position.price}
            averagePrice={position.averagePrice}
            shares={position.shares}
            />
          ))}
      </div>
    </div>
  );
};

export default PositionList;
