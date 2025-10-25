import React from 'react';
// import './TotalPosition.css';

const TotalPosition = ({ totalValue = 0, totalChange = 0 }) => {
    const isPositive = totalChange >= 0;
    const changeColor = isPositive ? 'green' : 'red';

    const formattedValue = typeof totalValue === 'number' 
        ? totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : '0.00';
    
    const formattedChange = typeof totalChange === 'number'
        ? Math.abs(totalChange).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : '0.00';

    return (
        <div className="total-position">
            <div className="total-value">
                ${formattedValue}
            </div>
            <div className="total-change" style={{ color: changeColor }}>
                {isPositive ? '+' : ''}-${formattedChange}
            </div>
        </div>
    );
};

export default TotalPosition;