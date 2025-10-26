"use client";
import { useState } from "react";
import { SignOutButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const { user } = useUser();

  return (
    <nav className="relative w-full bg-black text-white px-10 py-4 flex items-center border-b border-neutral-800">
      {/* Title */}
      <h1 className="text-2xl font-bold text-blue-400 mr-10">Chang&apos;e</h1>

        {/* Search bar */}
        <div className="w-150">
        <input
            type="text"
            placeholder="Search..."
            className="w-full bg-neutral-900 text-white rounded-lg px-4 py-2 outline-none border border-neutral-700 focus:border-blue-400"
            onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
                window.location.href = `/quote/${e.target.value.trim().toUpperCase()}`;
            }
            }}
        />
        </div>


      <div className="flex-1" />

      {/* Profile circle */}
      <div
        className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700 cursor-pointer relative"
        onClick={() => setShowLogout((prev) => !prev)}
      >
        <span className="text-sm font-semibold text-blue-400">{user?.firstName?.[0] || "?"}</span>

        {/* Logout popup */}
        {showLogout && (
          <div className="w-25 absolute top-12 right-0 bg-neutral-900 border border-neutral-700 rounded-lg p-1 shadow-lg">
            <SignOutButton>
              <button className="w-full text-center px-3 py-1 text-sm text-white hover:bg-neutral-800 rounded-md">
                Log out
              </button>
            </SignOutButton>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
