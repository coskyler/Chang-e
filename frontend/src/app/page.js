/* eslint-disable @next/next/no-html-link-for-pages */

"use client";

import Plasma from "@/components/Plasma";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      {/* Liquid background ABOVE the black bg, but BELOW content */}
      <div className="absolute inset-0 z-0">
        <Plasma
          color="#4479ff"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={0.8}
          mouseInteractive={false}
        />
      </div>

      {/* Foreground content */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-10 text-7xl md:text-9xl font-extrabold tracking-tight">
          Chang&apos;e
        </h1>
        <p className="mb-12 text-lg text-neutral-300">
          Bridging the information gap in modern finance.
        </p>
        <div className="flex gap-6 mt-4">
          <a
            href="/sign-in"
            className="px-6 py-3 border border-white bg-transparent hover:bg-white/10 text-white font-semibold rounded-xl transition"
          >
            Get Started
          </a>
        </div>
      </section>
    </main>
  );
}
