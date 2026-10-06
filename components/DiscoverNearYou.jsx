"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  LocateFixed,
  MapPin,
  Search,
  Star,
} from "lucide-react";

import { getCurrentLocation } from "@/lib/location";

const CATEGORY_OPTIONS = [
  "All",
  "Beaches",
  "Food",
  "Events",
  "Experiences",
  "Stays",
  "Sports",
  "Gaming",
  "Nightlife",
];

export default function DiscoverNearYou() {
  const [places, setPlaces] = useState([]);
  const [location, setLocation] = useState(null);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  async function loadNearbyPlaces(
    currentLocation,
    category = "All"
  ) {
    try {
      setStatus("loading");
      setError("");

      const params = new URLSearchParams();

      params.set(
        "latitude",
        String(currentLocation.latitude)
      );

      params.set(
        "longitude",
        String(currentLocation.longitude)
      );

      params.set("radius", "20");

      if (category !== "All") {
        params.set("category", category);
      }

      const response = await fetch(
        `/api/places/nearby?${params.toString()}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to load nearby places."
        );
      }

      setPlaces(
        Array.isArray(data.places)
          ? data.places
          : []
      );

      setCurrentIndex(0);
      setStatus("success");
    } catch (err) {
      console.error(
        "Nearby places error:",
        err
      );

      setPlaces([]);
      setStatus("error");

      setError(
        err?.message ||
          "Unable to load nearby places."
      );
    }
  }

  async function handleGetLocation() {
    try {
      setStatus("loading");
      setError("");

      const currentLocation =
        await getCurrentLocation();

      setLocation(currentLocation);

      await loadNearbyPlaces(
        currentLocation,
        selectedCategory
      );
    } catch (err) {
      console.error(
        "Location error:",
        err
      );

      setPlaces([]);
      setStatus("error");

      setError(
        err?.message ||
          "Unable to determine your location."
      );
    }
  }

  useEffect(() => {
    handleGetLocation();
  }, []);

  async function handleCategoryChange(
    category
  ) {
    setSelectedCategory(category);

    if (!location) {
      return;
    }

    await loadNearbyPlaces(
      location,
      category
    );
  }

  const visiblePlaces = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return places;
    }

    return places.filter((place) => {
      const title =
        place.title?.toLowerCase() || "";

      const category =
        place.category?.toLowerCase() || "";

      const locationName =
        place.location?.toLowerCase() || "";

      const description =
        place.description?.toLowerCase() || "";

      return (
        title.includes(query) ||
        category.includes(query) ||
        locationName.includes(query) ||
        description.includes(query)
      );
    });
  }, [places, search]);

  function handlePrevious() {
    if (visiblePlaces.length === 0) {
      return;
    }

    setCurrentIndex((current) => {
      if (current <= 0) {
        return visiblePlaces.length - 1;
      }

      return current - 1;
    });
  }

  function handleNext() {
    if (visiblePlaces.length === 0) {
      return;
    }

    setCurrentIndex((current) => {
      if (current >= visiblePlaces.length - 1) {
        return 0;
      }

      return current + 1;
    });
  }

  function formatPrice(price) {
    if (
      price === null ||
      price === undefined
    ) {
      return "Price on request";
    }

    return `TSh ${Number(
      price
    ).toLocaleString("en-TZ")}`;
  }

  function openPlace(place) {
    if (!place?.id) {
      return;
    }

    window.location.href =
      `/places/${place.id}`;
  }

  return (
    <section
      id="near-you"
      className="overflow-hidden bg-[#f7f8f6] py-10 sm:py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-green-600">
              Near You
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl md:text-4xl">
              Discover near you
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Discover real places and experiences
              around your current location.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={status === "loading"}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-black text-gray-800 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LocateFixed
                size={15}
                className={
                  status === "loading"
                    ? "animate-pulse"
                    : ""
                }
              />

              {status === "loading"
                ? "Finding you..."
                : "Near me"}
            </button>

            <div className="relative">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search places"
                className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs font-medium text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 sm:w-48"
              />
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="mt-6 overflow-x-auto pb-1">
          <div className="flex min-w-max gap-2">
            {CATEGORY_OPTIONS.map(
              (category) => {
                const active =
                  selectedCategory ===
                  category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      handleCategoryChange(
                        category
                      )
                    }
                    className={`rounded-full px-4 py-2.5 text-xs font-black transition ${
                      active
                        ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                    }`}
                  >
                    {category}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* LOCATION INFO */}
        {location && (
          <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
            <MapPin
              size={14}
              className="text-green-600"
            />

            <span>
              Showing places within 20 km
              of your current location
            </span>
          </div>
        )}

        {/* ERROR */}
        {status === "error" && (
          <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black text-gray-900">
                  Unable to load nearby places
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-600">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={handleGetLocation}
                className="w-fit rounded-xl bg-gray-950 px-4 py-2.5 text-xs font-black text-white transition hover:bg-green-600"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* LOADING */}
        {status === "loading" && (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-gray-100"
              >
                <div className="h-48 animate-pulse bg-gray-200" />

                <div className="space-y-3 p-4">
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />

                  <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200" />

                  <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {status === "success" &&
          visiblePlaces.length === 0 && (
            <div className="mt-7 rounded-[28px] border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <MapPin size={22} />
              </div>

              <h3 className="mt-4 text-lg font-black text-gray-950">
                No places found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                There are currently no active
                places matching this search or
                category within 20 km of your
                location.
              </p>
            </div>
          )}

        {/* REAL DATABASE RESULTS */}
        {status === "success" &&
          visiblePlaces.length > 0 && (
            <div className="relative mt-7">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {visiblePlaces
                  .slice(0, 8)
                  .map((place) => (
                    <article
                      key={place.id}
                      className="group overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        {place.image ? (
                          <img
                            src={place.image}
                            alt={place.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-green-50 to-gray-100">
                            <MapPin
                              size={28}
                              className="text-green-500"
                            />
                          </div>
                        )}

                        <div className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1.5 text-[10px] font-black text-gray-800 shadow-sm backdrop-blur">
                          {place.category}
                        </div>

                        <div className="absolute bottom-3 left-3 rounded-full bg-gray-950/90 px-2.5 py-1.5 text-[10px] font-black text-white backdrop-blur">
                          {place.distance} km away
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="line-clamp-1 text-base font-black text-gray-950">
                          {place.title}
                        </h3>

                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                          <MapPin
                            size={13}
                            className="shrink-0 text-green-600"
                          />

                          <span className="line-clamp-1">
                            {place.location}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-1">
                            <Star
                              size={14}
                              className="fill-yellow-400 text-yellow-400"
                            />

                            <span className="text-xs font-black text-gray-800">
                              {Number(
                                place.rating || 0
                              ).toFixed(1)}
                            </span>

                            <span className="text-[10px] text-gray-400">
                              (
                              {
                                place.reviewCount
                              }
                              )
                            </span>
                          </div>

                          <span className="text-xs font-black text-green-700">
                            {formatPrice(
                              place.price
                            )}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            openPlace(
                              place
                            )
                          }
                          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-xs font-black text-white transition hover:bg-green-600"
                        >
                          Explore
                          <ArrowRight
                            size={14}
                          />
                        </button>
                      </div>
                    </article>
                  ))}
              </div>

              {/* NAVIGATION */}
              {visiblePlaces.length > 4 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={
                      handlePrevious
                    }
                    aria-label="Previous places"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                  >
                    <ArrowLeft
                      size={16}
                    />
                  </button>

                  <span className="px-3 text-xs font-bold text-gray-500">
                    {Math.min(
                      currentIndex + 1,
                      visiblePlaces.length
                    )}{" "}
                    /{" "}
                    {
                      visiblePlaces.length
                    }
                  </span>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next places"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                  >
                    <ArrowRight
                      size={16}
                    />
                  </button>
                </div>
              )}
            </div>
          )}

        {/* NO LOCATION YET */}
        {status === "idle" &&
          !location && (
            <div className="mt-7 rounded-[28px] bg-white p-8 text-center shadow-sm ring-1 ring-gray-100">
              <LocateFixed
                size={26}
                className="mx-auto text-green-600"
              />

              <p className="mt-3 text-sm font-black text-gray-900">
                Finding places near you...
              </p>
            </div>
          )}
      </div>
    </section>
  );
}