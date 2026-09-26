"use client";

import {
  Search,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [search, setSearch] = useState("");

  function handleSearch() {
    const section = document.getElementById("near-you");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  return (
    <section className="relative min-h-[520px] overflow-hidden">
      {/* Background - Posta BRT + Dar City Centre */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.dart.go.tz/uploads/gallery/c28640b5d7deacdd3998c677fe28e8e5.jpg')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/80" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center md:px-8">
        {/* Location */}
        

        {/* Heading */}
        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
          Welcome to Dar es Salaam
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
          Discover the best places, experiences, food, events and hidden
          gems around Dar es Salaam.
        </p>

        {/* Search */}
        <div className="mt-9 w-full max-w-3xl rounded-2xl bg-white p-2 shadow-2xl">
          <div className="flex flex-col gap-2 md:flex-row">
            {/* Search input */}
            <div className="flex min-h-[52px] flex-1 items-center gap-3 rounded-xl px-4">
              <Search
                size={21}
                className="shrink-0 text-gray-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                type="text"
                placeholder="Search places, food, events..."
                className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Near You */}
            <button
              type="button"
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gray-100 px-5 text-sm font-semibold text-gray-800 transition hover:bg-gray-200"
            >
              <MapPin size={17} />

              Near You

              <ChevronDown size={15} />
            </button>

            {/* Search button */}
            <button
              type="button"
              onClick={handleSearch}
              className="min-h-[52px] rounded-xl bg-gray-950 px-7 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}