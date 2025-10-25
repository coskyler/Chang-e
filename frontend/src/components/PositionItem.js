import React from 'react';
import '../app/globals.css'

const PositionItem = ({ symbol, value, shares, averagePrice }) => {
    const currentPrice = value / shares;
    const priceChange = ((currentPrice - averagePrice) / averagePrice) * 100;
    const isPositiveChange = priceChange >= 0;

    return (
        <div className="bg-slate-800 py-2 px-4 rounded-lg position-item mb-2" style={{ display: 'flex', flexDirection: 'column', gap: '0px'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="stock-symbol text-xl font-bold">{symbol}</div>
                <div className="position-value">${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div className={`value-change ${isPositiveChange ? 'positive' : 'negative'}`}>
                    {isPositiveChange ? '+' : ''}{priceChange.toFixed(2)}%
                </div>
            </div>
        </div>
    );
};
// Took out shares and average price for now
// <div className="position-shares">{shares} shares</div>
// <div className="position-avg-price">Avg: ${averagePrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>

export default PositionItem;