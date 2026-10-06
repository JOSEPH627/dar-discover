"use client";

import {
  Search,
  MapPin,
  ChevronDown,
  Loader2,
} from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { getCurrentLocation } from "@/lib/location";

export default function Hero() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  function handleSearch() {
    const query = search.trim();

    // Usipeleke user popote kama search iko tupu
    if (!query) {
      return;
    }

    setLocationError("");

    router.push(
      `/user/places?search=${encodeURIComponent(query)}`
    );
  }

  async function handleNearYou() {
    if (locationLoading) {
      return;
    }

    setLocationError("");
    setLocationLoading(true);

    try {
      const location = await getCurrentLocation();

      const params = new URLSearchParams();

      params.set("near", "true");
      params.set("lat", String(location.latitude));
      params.set("lng", String(location.longitude));

      const query = search.trim();

      if (query) {
        params.set("search", query);
      }

      router.push(`/user/places?${params.toString()}`);
    } catch (error) {
      setLocationError(
        error?.message ||
          "Unable to determine your location."
      );
    } finally {
      setLocationLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  }

  return (
    <section className="relative min-h-[520px] overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.dart.go.tz/uploads/gallery/c28640b5d7deacdd3998c677fe28e8e5.jpg')",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/80" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center md:px-8">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-green-300">
          Discover Dar es Salaam
        </p>

        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
          Welcome to Dar es Salaam
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
          Discover the best places, experiences, food, events
          and hidden gems around Dar es Salaam.
        </p>

        {/* SEARCH BOX */}
        <div className="mt-9 w-full max-w-3xl">
          <div className="rounded-2xl bg-white p-2 shadow-2xl">
            <div className="flex flex-col gap-2 md:flex-row">
              {/* SEARCH INPUT */}
              <div className="flex min-h-[52px] flex-1 items-center gap-3 rounded-xl px-4">
                <Search
                  size={21}
                  className="shrink-0 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  type="text"
                  placeholder="Search places, food, events..."
                  className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
                />
              </div>

              {/* NEAR YOU */}
              <button
                type="button"
                onClick={handleNearYou}
                disabled={locationLoading}
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gray-100 px-5 text-sm font-semibold text-gray-800 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {locationLoading ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <MapPin size={17} />
                )}

                {locationLoading
                  ? "Finding you..."
                  : "Near You"}

                {!locationLoading && (
                  <ChevronDown size={15} />
                )}
              </button>

              {/* SEARCH BUTTON */}
              <button
                type="button"
                onClick={handleSearch}
                disabled={!search.trim()}
                className="min-h-[52px] rounded-xl bg-gray-950 px-7 text-sm font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Search
              </button>
            </div>
          </div>

          {/* LOCATION ERROR */}
          {locationError && (
            <div className="mx-auto mt-3 max-w-xl rounded-xl bg-black/60 px-4 py-3 text-sm font-medium text-white backdrop-blur-md">
              {locationError}
            </div>
          )}
        </div>

        {/* SMALL HELP TEXT */}
        <p className="mt-4 text-xs font-medium text-white/60">
          Search freely or discover experiences near your
          location.
        </p>
      </div>
    </section>
  );
}