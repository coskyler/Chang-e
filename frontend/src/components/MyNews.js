import React from 'react';
import NewsItem from './NewsItem';

const MyNews = () => {
    // Example news data
    const newsItems = [
        {
            id: 1,
            related_ticker: "AAPL",
            title: "Market Rally Continues",
            summary: "Major indices reach new heights as tech sector leads the charge",
            sentiment: "bullish"
        },
        {
            id: 2,
            related_ticker: "TSLA",
            title: "Interest Rates Hold Steady",
            summary: "Federal Reserve maintains current rates citing economic stability",
            sentiment: "bullish"
        },
        {
            id: 3,
            related_ticker: "GOOGL",
            title: "Supply Chain Disruptions Impact Tech Industry",
            summary: "Global semiconductor shortage affects manufacturing output",
            sentiment: "bearish"
        },
        {
            id: 4,
            related_ticker: "MSFT",
            title: "Emerging Markets Show Promise",
            summary: "Developing economies display strong growth indicators",
            sentiment: "bullish"
        }
    ];

    return (
        <div className="news-container full-width bg-stone-900 rounded-lg py-4 px-4">
            <h1 className='text-3xl'>Latest News</h1>
            {newsItems.map((item) => (
                <NewsItem
                    key={item.id}
                    title={item.title}
                    ticker={item.related_ticker}
                    summary={item.summary}
                    sentiment={item.sentiment}
                />
            ))}
        </div>
    );
};

export default MyNews;
