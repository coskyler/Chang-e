import React from 'react';
import NewsItem from './NewsItem';

const MyNews = () => {
    // Example news data
    const newsItems = [
    {
        id: 1,
        related_ticker: "AAPL",
        title: "Apple Surges After Record-Breaking Quarter",
        summary:
        "Apple reported its strongest quarter in company history, with iPhone sales exceeding expectations and its services segment posting double-digit growth. Analysts credit supply chain efficiency and strong demand for the iPhone 16 Pro as key factors driving revenue gains. The company also announced an expanded share buyback program and a dividend increase, signaling confidence in future performance.",
        sentiment: "bullish",
    },
    {
        id: 2,
        related_ticker: "TSLA",
        title: "Tesla Faces Mounting Pressure Amid Global EV Competition",
        summary:
        "Tesla’s market share dipped for the second consecutive quarter as new entrants from China and Europe intensified competition in the electric vehicle space. Production delays at Gigafactory Mexico and a slowdown in Model Y deliveries have raised concerns among investors. Elon Musk reaffirmed Tesla’s commitment to cost reduction and automation, but analysts warn that margins could remain under pressure throughout 2025.",
        sentiment: "bearish",
    },
    {
        id: 3,
        related_ticker: "GOOGL",
        title: "Alphabet Expands AI Offerings with Gemini 2 Launch",
        summary:
        "Alphabet unveiled its next-generation AI platform, Gemini 2, featuring advanced multimodal capabilities that integrate text, image, and real-time reasoning. The announcement was met with positive market response as Google positions itself to compete with OpenAI and Anthropic in enterprise AI solutions. However, regulatory scrutiny over data privacy and antitrust issues continues to shadow the company’s growth outlook.",
        sentiment: "bullish",
    },
    {
        id: 4,
        related_ticker: "MSFT",
        title: "Microsoft Strengthens Cloud Dominance with Azure AI Suite",
        summary:
        "Microsoft announced the Azure AI Suite, a comprehensive set of developer tools aimed at simplifying large-scale AI deployment for businesses. CEO Satya Nadella emphasized the company’s vision of embedding AI across every productivity workflow. Early adoption by Fortune 500 clients has already boosted Azure revenue projections, solidifying Microsoft’s leadership position in cloud infrastructure and enterprise AI integration.",
        sentiment: "bullish",
    },
    {
        id: 5,
        related_ticker: "AMZN",
        title: "Amazon Expands Logistics Network Amid Rising E-Commerce Demand",
        summary:
        "Amazon is investing $10 billion to expand its logistics infrastructure in North America, introducing new AI-driven distribution centers designed to reduce delivery times. The company’s same-day delivery service now covers 80% of major U.S. metropolitan areas. Analysts say this move could tighten Amazon’s grip on the e-commerce sector while squeezing margins for smaller retailers struggling to compete on speed and price.",
        sentiment: "bullish",
    },
    {
        id: 6,
        related_ticker: "NVDA",
        title: "NVIDIA Cautions on Chip Supply Constraints Despite Strong Demand",
        summary:
        "NVIDIA’s CEO Jensen Huang warned investors that ongoing supply limitations for advanced GPUs could restrict near-term revenue growth, even as demand for AI chips remains unprecedented. The company continues to expand its partnerships with cloud providers and autonomous vehicle manufacturers. Market analysts maintain a positive long-term outlook, citing NVIDIA’s unmatched position in high-performance computing and AI infrastructure.",
        sentiment: "neutral",
    },
    ];


    return (
    <div className="flex flex-col min-h-0 flex-1">
        <h1 className="text-2xl font-semibold text-blue-200 mb-4">Relevant News</h1>
        <div className="flex flex-col lex-1 overflow-y-auto pr-2 min-h-0">
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
    </div>
    );

};

export default MyNews;
