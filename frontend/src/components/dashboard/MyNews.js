"use client";

import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import { useAuth } from "@clerk/nextjs";

const MyNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    async function fetchNews() {
      const token = await getToken();

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/user/news`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          }
        });
        const data = await res.json();
        setNews(data.news || []);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return <p className="text-neutral-400">Loading news...</p>;
  }

  if (!news.length) {
    return <p className="text-neutral-400">No recent news available.</p>;
  }

  return (
    <div className="flex flex-col min-h-0 flex-1">
      <h1 className="text-2xl font-semibold text-blue-400 mb-4">News, picked for you</h1>

      <div className="flex flex-col flex-1 overflow-y-auto pr-2 min-h-0">
        {news.map((item) => (
          <NewsItem
            key={item.symbol}
            company={item.company}
            symbol={item.symbol}
            text={item.text}
            citations={item.citations}
          />
        ))}
      </div>
    </div>
  );
};

export default MyNews;
