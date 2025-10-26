import React from 'react';
import TotalPosition from './TotalPosition';
import PositionList from './PositionList';

const PositionSummary = () => {
    // Example portfolio data
    const positions = [
        {
            id: 1,
            symbol: 'AAPL',
            shares: 100,
            value: 18750.00,
            averagePrice: 150.00
        },
        {
            id: 2,
            symbol: 'MSFT',
            shares: 50,
            value: 19000.00,
            averagePrice: 320.00
        },
        {
            id: 3,
            symbol: 'GOOGL',
            shares: 25,
            value: 32500.00,
            averagePrice: 1200.00
        },
        {
            id: 4,
            symbol: 'TSLA',
            shares: 75,
            value: 15750.00,
            averagePrice: 180.00
        }
    ];

    // Calculate total value and change
    const totalValue = positions.reduce((sum, position) => sum + position.value, 0);
    const totalInvested = positions.reduce((sum, position) => 
        sum + (position.averagePrice * position.shares), 0);
    const totalChange = totalValue - totalInvested;

    return (
        <div className="position-summary bg-gray-900 rounded-lg py-4 px-4">
            <h1 className='text-3xl'>Portfolio Balance</h1>
            <TotalPosition 
                totalValue={totalValue} 
                totalChange={totalChange}
            />
            <PositionList positions={positions} />
        </div>
    );
};

export default PositionSummary;