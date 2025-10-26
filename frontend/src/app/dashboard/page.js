import PositionSummary from "@/components/dashboard/PositionSummary";
import MyNews from "@/components/dashboard/MyNews";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="h-screen flex flex-col min-h-0">
      <Navbar/>
      <div className="max-h-screen w-full p-10 flex flex-col flex-1 min-h-0">
        <h1 className="text-5xl mb-7 font-semibold text-blue-200">Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-6 w-full flex-1 min-h-0">
          {/* Left column - Position Summary (1/3) */}
          <div className="w-full md:w-1/3 flex flex-col flex-1 min-h-0">
            <PositionSummary />
          </div>

          {/* Right column - News (2/3) */}
          <div className="w-full md:w-2/3 bg-neutral-900/75 rounded-lg p-4 border border-neutral-800 flex flex-col min-h-0">
            <MyNews />
          </div>
        </div>
      </div>
    </main>
  );
}
