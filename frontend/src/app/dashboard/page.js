"use client";

import PositionSummary from "@/components/dashboard/PositionSummary";
import MyNews from "@/components/dashboard/MyNews";
import Navbar from "@/components/navbar";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <main className="h-screen flex flex-col min-h-0">
      <Navbar />

      <div className="max-h-screen w-full p-10 flex flex-col flex-1 min-h-0">
        <h1 className="text-5xl mb-7 font-semibold text-white">Dashboard</h1>

        {/* Wait for Clerk to load before mounting data-fetching children */}
        {!isLoaded ? (
          <p className="text-neutral-400"></p>
        ) : !isSignedIn ? (
          <p className="text-neutral-400">Please sign in.</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 w-full flex-1 min-h-0">
            {/* Left column - Position Summary (1/2) */}
            <div className="w-1/2 flex flex-col flex-1 min-h-0">
              <PositionSummary key={`ps-${user.id}`} />
            </div>

            {/* Right column - News (1/2) */}
            <div className="w-1/2 bg-neutral-900/75 rounded-lg p-4 border border-neutral-800 flex flex-col min-h-0">
              <MyNews key={`news-${user.id}`} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
