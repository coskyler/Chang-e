import React from 'react';
import PositionItem from './PositionItem';

const PositionList = ({ positions }) => {
    return (
        <div className="position-list">
            <h2 className='text-3xl'>Your Positions</h2>
            <div className="position-grid">
                {positions && positions.map((position) => (
                    <PositionItem
                        key={position.symbol}
                        symbol={position.symbol}
                        value={position.value}
                        shares={position.shares}
                        averagePrice={position.averagePrice}
                    />
                ))}
            </div>
        </div>
    );
};

export default PositionList;