import React from 'react';
import TotalPosition from './TotalPosition';
import PositionList from './PositionList';

const PositionSummary = () => {
    // Example portfolio data
  const positions = [
    { id: 1, name: 'Apple', symbol: 'AAPL', shares: 100.2016, price: 187.50, averagePrice: 150.00 },
    { id: 2, name: 'Microsoft', symbol: 'MSFT', shares: 50, price: 380.00, averagePrice: 320.00 },
    { id: 3, name: 'Google', symbol: 'GOOGL', shares: 25, price: 1450.00, averagePrice: 1200.00 },
    { id: 4, name: 'Tesla', symbol: 'TSLA', shares: 75, price: 210.00, averagePrice: 180.00 },
    { id: 5, name: 'Amazon', symbol: 'AMZN', shares: 40, price: 160.00, averagePrice: 120.00 },
    { id: 6, name: 'NVIDIA', symbol: 'NVDA', shares: 30, price: 650.00, averagePrice: 450.00 },
    { id: 7, name: 'Meta', symbol: 'META', shares: 60, price: 320.00, averagePrice: 250.00 },
    { id: 8, name: 'Netflix', symbol: 'NFLX', shares: 20, price: 490.00, averagePrice: 450.00 },
    { id: 9, name: 'AMD', symbol: 'AMD', shares: 90, price: 130.00, averagePrice: 100.00 },
    { id: 10, name: 'Adobe', symbol: 'ADBE', shares: 15, price: 740.00, averagePrice: 650.00 },
    { id: 11, name: 'Salesforce', symbol: 'CRM', shares: 25, price: 240.00, averagePrice: 220.00 },
    { id: 12, name: 'PayPal', symbol: 'PYPL', shares: 45, price: 70.00, averagePrice: 60.00 },
    { id: 13, name: 'Shopify', symbol: 'SHOP', shares: 35, price: 95.00, averagePrice: 85.00 },
    { id: 14, name: 'Uber', symbol: 'UBER', shares: 100, price: 58.00, averagePrice: 45.00 },
    { id: 15, name: 'Airbnb', symbol: 'ABNB', shares: 40, price: 150.00, averagePrice: 130.00 }
  ];


    // Calculate totals
    const totalCurrentValue = positions.reduce((sum, p) => sum + p.price * p.shares, 0);
    const totalInvested     = positions.reduce((sum, p) => sum + p.averagePrice * p.shares, 0);
    const totalChange       = totalCurrentValue - totalInvested; // == sum((price - averagePrice) * shares)


    return (
        <div className="flex flex-col gap-4 flex-1 min-h-0">
            <TotalPosition 
                totalValue={totalCurrentValue} 
                totalChange={totalChange}
            />
            <PositionList positions={positions} />
        </div>
    );
};

export default PositionSummary;