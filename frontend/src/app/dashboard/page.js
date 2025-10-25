import PositionSummary from "@/components/PositionSummary";
import MyNews from "@/components/MyNews";

export default function Home() {
  return (
    <div className="min-h-screen mt-5 px-10 bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full bg-white dark:bg-black">
        <h1 className="text-4xl mb-10 font-semibold text-black dark:text-zinc-50">
          Portfolio Dashboard</h1>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Left column - Position Summary (1/3) */}
            <div className="w-full md:w-1/3">
              <PositionSummary />
            </div>

            {/* Right column - News (2/3) */}
            <div className="w-full md:w-2/3 border border-red-300">
              <MyNews />
            </div>
          </div>
      </main>
    </div>
  );
}
