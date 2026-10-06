"use client";

import {
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

export default function PopularInDar() {
  const sliderRef = useRef(null);

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPopularPlaces() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/places/popular",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to load popular places."
        );
      }

      setPlaces(
        Array.isArray(data.places)
          ? data.places
          : []
      );
    } catch (error) {
      console.error(
        "Popular places error:",
        error
      );

      setPlaces([]);

      setError(
        error?.message ||
          "Unable to load popular places."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPopularPlaces();
  }, []);

  function slide(direction) {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left:
        direction === "left"
          ? -390
          : 390,
      behavior: "smooth",
    });
  }

  return (
    <section className="overflow-hidden py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* SECTION HEADER */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-green-600">
              What's popular
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl md:text-4xl">
              Popular in Dar
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Places people are discovering right now.
            </p>
          </div>

          {/* SLIDER CONTROLS */}
          {places.length > 0 && (
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => slide("left")}
                aria-label="Previous places"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-green-300 hover:bg-green-50 hover:text-green-700 sm:h-10 sm:w-10"
              >
                <ChevronLeft size={17} />
              </button>

              <button
                type="button"
                onClick={() => slide("right")}
                aria-label="Next places"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-green-300 hover:bg-green-50 hover:text-green-700 sm:h-10 sm:w-10"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-5 flex gap-4 overflow-hidden sm:gap-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="min-w-[290px] overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-gray-200 sm:min-w-[330px] md:min-w-[360px]"
              >
                <div className="h-52 animate-pulse bg-gray-200" />

                <div className="space-y-3 p-5">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                  <div className="h-10 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="mt-5 rounded-[24px] border border-orange-100 bg-orange-50 px-6 py-8 text-center">
            <p className="text-sm font-bold text-gray-900">
              Unable to load popular places
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={loadPopularPlaces}
              className="mt-4 rounded-xl bg-green-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-green-700"
            >
              Try again
            </button>
          </div>
        )}

        {/* NO DATA */}
        {!loading &&
          !error &&
          places.length === 0 && (
            <div className="mt-5 rounded-[26px] border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <MapPin size={20} />
              </div>

              <h3 className="mt-4 text-base font-black text-gray-900">
                No popular places yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Popular places will appear here as
                people discover, save, book and review
                places on DAR DISCOVER.
              </p>
            </div>
          )}

        {/* PLACES SLIDER */}
        {!loading &&
          !error &&
          places.length > 0 && (
            <>
              <div
                ref={sliderRef}
                className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-5"
              >
                {places.map((place) => (
                  <article
                    key={place.id}
                    className="group min-w-[290px] snap-start overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-[330px] md:min-w-[360px]"
                  >
                    {/* IMAGE */}
                    <div className="relative h-52 overflow-hidden bg-gray-100">
                      {place.image ? (
                        <img
                          src={place.image}
                          alt={place.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-green-100 to-orange-50">
                          <MapPin
                            size={32}
                            className="text-green-600"
                          />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

                      {/* BADGE */}
                      <div className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1.5 text-xs font-black text-white">
                        {place.badge || "Popular"}
                      </div>

                      {/* TITLE */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-black text-white">
                          {place.title}
                        </h3>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={14} />

                        <span className="line-clamp-1">
                          {place.location ||
                            "Dar es Salaam"}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-1.5">
                          <Star
                            size={15}
                            fill="currentColor"
                            className="text-yellow-400"
                          />

                          <span className="text-sm font-black">
                            {Number(
                              place.rating || 0
                            ).toFixed(1)}
                          </span>
                        </div>

                        <span className="font-black text-green-600">
                          {place.price != null
                            ? `TSh ${Number(
                                place.price
                              ).toLocaleString()}`
                            : "Contact provider"}
                        </span>
                      </div>

                      {/* CORRECT USER PLACE ROUTE */}
                      <a
                        href={`/user/places/${place.id}`}
                        className="mt-4 flex items-center gap-2 text-sm font-bold text-gray-600 transition hover:text-green-600"
                      >
                        Explore place
                        <ArrowRight size={15} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              <p className="mt-0.5 text-center text-[11px] text-gray-400">
                Swipe or use the arrows to see more places
              </p>
            </>
          )}
      </div>
    </section>
  );
}
