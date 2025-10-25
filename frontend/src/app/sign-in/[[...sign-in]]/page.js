"use client";

import { SignIn } from '@clerk/nextjs'

import Plasma from '@/components/Plasma'

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Liquid background ABOVE the black bg, but BELOW content */}
      <div className="absolute inset-0 z-0">
        <Plasma
          color="#0048ff"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={0.8}
          mouseInteractive={false}
        />
      </div>

      <div className="flex min-h-screen items-center justify-center">
        <SignIn />
      </div>
    </main>
  )
}