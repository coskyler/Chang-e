# Chang’e

**Chang’e** is a full-stack **paper trading web app** that lets users simulate investing with **real-time stock data** and **AI-driven financial analysis**.  
It integrates **AlphaVantage** for live market data and **Gemini Flash (with grounding)** to retrieve and summarize recent, credible financial news relevant to each portfolio.  
Authentication is handled by **Clerk**, and the entire system is containerized and reverse-proxied for production deployment.

---

## Gallery

<p align="center">
  <img src="/media/dashboard.jpg" width="49%" />
  <img src="/media/tradingview.jpg" width="49%" />
</p>

---

## Features

- **Real-Time Stock Data** from AlphaVantage  
- **Paper Trading Engine** with portfolio tracking  
- **Gemini Flash AI Insights** (grounded, source-linked)  
- **Secure Authentication** via Clerk  
- **Redis Caching** for Gemini API responses  
- **PostgreSQL Database** for trades and holdings  
- **Dockerized Stack** with Nginx reverse proxy  
- **Next.js Frontend** hosted on Vercel  

---

## Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React, Next.js, Tailwind CSS, Clerk |
| **Backend** | Node.js, Express |
| **Database** | PostgreSQL |
| **Caching** | Redis |
| **AI** | Google Gemini Flash (Grounded) |
| **Data Source** | AlphaVantage API |
| **Infrastructure** | Docker, Nginx, Vercel |

---

## System Diagram

<p align="center">
  <img src="/media/system.jpg" width="80%" />
</p>

---
