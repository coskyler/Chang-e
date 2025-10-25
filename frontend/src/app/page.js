// app/page.js
"use client";

import Plasma from "@/components/Plasma";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Liquid background ABOVE the black bg, but BELOW content */}
      <div className="absolute inset-0 z-0">
        <Plasma 
          color="#5900ff"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={0.8}
          mouseInteractive={false}
        />
      </div>

      {/* Foreground content */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-10 text-7xl md:text-8xl font-extrabold tracking-tight">Chang&apos;e</h1>
        <div className="flex gap-6">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl transition text-lg font-semibold shadow-lg shadow-blue-900/40">
            Log In
          </button>
          <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-2xl transition text-lg font-semibold shadow-lg shadow-black/40">
            Log In with Google
          </button>
        </div>
      </section>
    </main>
  );
}
