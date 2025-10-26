// app/page.js
"use client";

import Plasma from "@/components/Plasma";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignIn,
  SignUp,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

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
        <div className="flex gap-6">
          <a
            href="/sign-in"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
          >
            Get Started
          </a>

        </div>
      </section>
    </main>
  );
}
