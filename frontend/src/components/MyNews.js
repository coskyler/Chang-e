import React from 'react';
import NewsItem from './NewsItem';

const MyNews = () => {
    // Example news data
    const newsItems = [
        {
            id: 1,
            title: "Market Rally Continues",
            summary: "Major indices reach new heights as tech sector leads the charge",
            sentiment: "bullish"
        },
        {
            id: 2,
            title: "Interest Rates Hold Steady",
            summary: "Federal Reserve maintains current rates citing economic stability",
            sentiment: "bullish"
        },
        {
            id: 3,
            title: "Supply Chain Disruptions Impact Tech Industry",
            summary: "Global semiconductor shortage affects manufacturing output",
            sentiment: "bearish"
        },
        {
            id: 4,
            title: "Emerging Markets Show Promise",
            summary: "Developing economies display strong growth indicators",
            sentiment: "bullish"
        }
    ];

    return (
        <div className="news-container full-width">
            {newsItems.map((item) => (
                <NewsItem
                    key={item.id}
                    title={item.title}
                    summary={item.summary}
                    sentiment={item.sentiment}
                />
            ))}
        </div>
    );
};

export default MyNews;
