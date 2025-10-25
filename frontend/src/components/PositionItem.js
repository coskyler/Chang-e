import React from 'react';
// import './PositionItem.css';

const PositionItem = ({ symbol, value, shares, averagePrice }) => {
    const currentPrice = value / shares;
    const priceChange = ((currentPrice - averagePrice) / averagePrice) * 100;
    const isPositiveChange = priceChange >= 0;

    return (
        <div className="position-item">
            <div className="stock-symbol">{symbol}</div>
            <div className="position-value">${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div className="position-shares">{shares} shares</div>
            <div className="position-avg-price">Avg: ${averagePrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div className={`value-change ${isPositiveChange ? 'positive' : 'negative'}`}>
                {isPositiveChange ? '+' : ''}{priceChange.toFixed(2)}%
            </div>
        </div>
    );
};

export default PositionItem;