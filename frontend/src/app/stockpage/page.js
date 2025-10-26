import StockDetail from "@/components/StockDetail";
import StockGraph from "@/components/StockGraph";

export default function StockPage() {
  const test_stats = {
    symbol: "AAPL",
    currentPrice: 175.32,
    allTimeHigh: 198.23,
    allTimeLow: 0.51,
    open: 172.50,
    close: 175.32,
    volume: 45230000,
    marketCap: 2800000000000,
    peRatio: 28.4,
    dividendYield: 0.006,
    fiftyTwoWeekHigh: 182.94,
    fiftyTwoWeekLow: 129.04,
  };
  
  return (
    <div className="min-h-screen mt-5 px-10 font-sans dark:bg-black">
      <main className="min-h-screen w-full bg-white dark:bg-black">
        <h1 className="text-4xl mb-6 font-semibold text-black dark:text-zinc-50">
          Stock: {test_stats.symbol}
        </h1>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Left 1/2: Graph placeholder */}
          <div className="w-full md:w-1/2">
            <StockGraph ticker={test_stats.symbol} />
          </div>

          {/* Right 1/2: Stock details */}
          <div className="w-full md:w-1/2">
            {/* assuming StockDetail accepts these props and renders the view */}
            <StockDetail {...test_stats} />
          </div>
        </div>
        <div>
          
        </div>
      </main>
    </div>
  );
}