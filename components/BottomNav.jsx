"use client";

import {
  Home,
  Compass,
  Map,
  Bookmark,
  UserRound,
} from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 px-3 py-2 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around">

        <button
          type="button"
          className="flex flex-col items-center gap-1 px-3 py-1.5 text-green-600"
        >
          <Home size={19} />

          <span className="text-[10px] font-bold">
            Home
          </span>
        </button>

        <button
          type="button"
          className="flex flex-col items-center gap-1 px-3 py-1.5 text-gray-400"
        >
          <Compass size={19} />

          <span className="text-[10px] font-bold">
            Explore
          </span>
        </button>

        <button
          type="button"
          className="flex flex-col items-center gap-1 px-3 py-1.5 text-gray-400"
        >
          <Map size={19} />

          <span className="text-[10px] font-bold">
            Map
          </span>
        </button>

        <button
          type="button"
          className="flex flex-col items-center gap-1 px-3 py-1.5 text-gray-400"
        >
          <Bookmark size={19} />

          <span className="text-[10px] font-bold">
            Saved
          </span>
        </button>

        <button
          type="button"
          className="flex flex-col items-center gap-1 px-3 py-1.5 text-gray-400"
        >
          <UserRound size={19} />

          <span className="text-[10px] font-bold">
            Profile
          </span>
        </button>

      </div>
    </nav>
  );
}