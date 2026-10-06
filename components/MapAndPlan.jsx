"use client";

import { useEffect, useState } from "react";
import {
  Map,
  MapPin,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  Clock3,
  Coffee,
  Sunset,
  LocateFixed,
} from "lucide-react";

import RealMap from "@/components/RealMap";
import { getCurrentLocation } from "@/lib/location";

export default function MapAndPlan() {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);

  const [locationStatus, setLocationStatus] =
    useState("idle");

  const [locationError, setLocationError] =
    useState("");

  async function loadNearbyPlaces(
    currentLocation
  ) {
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
  }

  async function handleGetLocation() {
    try {
      setLocationStatus("loading");
      setLocationError("");

      const currentLocation =
        await getCurrentLocation();

      setLocation(currentLocation);

      await loadNearbyPlaces(
        currentLocation
      );

      setLocationStatus("success");
    } catch (error) {
      console.error(
        "Map location error:",
        error
      );

      setPlaces([]);
      setLocationStatus("error");

      setLocationError(
        error?.message ||
          "Unable to get your current location."
      );
    }
  }

  useEffect(() => {
    handleGetLocation();
  }, []);

  return (
    <section className="overflow-hidden bg-[#f7f8f6] py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* HEADER */}
        <div className="mb-5">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-green-600">
            Explore the city
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl md:text-4xl">
            Explore Dar on the map
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Move around the city and discover places
            and experiences near you.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">

          {/* MAP */}
          <div className="relative h-[330px] overflow-hidden rounded-[28px] bg-gray-200 shadow-lg ring-1 ring-gray-200 sm:h-[370px] md:h-[400px]">

            {location ? (
              <RealMap
                latitude={location.latitude}
                longitude={location.longitude}
                places={places}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100">
                <div className="px-6 text-center">

                  {locationStatus === "loading" && (
                    <>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                        <LocateFixed
                          size={22}
                          className="animate-pulse"
                        />
                      </div>

                      <p className="mt-3 text-sm font-bold text-gray-900">
                        Getting your location...
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Please allow location access
                        in your browser.
                      </p>
                    </>
                  )}

                  {locationStatus === "error" && (
                    <>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                        <MapPin size={22} />
                      </div>

                      <p className="mt-3 text-sm font-bold text-gray-900">
                        Location unavailable
                      </p>

                      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-gray-500">
                        {locationError}
                      </p>

                      <button
                        type="button"
                        onClick={
                          handleGetLocation
                        }
                        className="mt-4 rounded-xl bg-green-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-green-700"
                      >
                        Try again
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* LOCATION LABEL */}
            <div className="absolute left-3 top-3 rounded-2xl border border-white/50 bg-white/95 px-3 py-2.5 shadow-lg backdrop-blur-xl sm:left-4 sm:top-4 sm:px-4">
              <div className="flex items-center gap-2.5">

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <MapPin size={15} />
                </div>

                <div>
                  <p className="text-xs font-black text-gray-950">
                    {location
                      ? "Your current location"
                      : "Finding your location"}
                  </p>

                  <p className="text-[10px] text-gray-500">
                    {location
                      ? "Location detected"
                      : "Location access required"}
                  </p>
                </div>

              </div>
            </div>

            {/* ZOOM CONTROLS */}
            <div className="absolute right-3 top-3 rounded-xl bg-white/95 p-1 shadow-lg backdrop-blur-xl sm:right-4 sm:top-4">

              <button
                type="button"
                aria-label="Zoom in"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent(
                      "dar-discover-map-zoom-in"
                    )
                  );
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>

              <button
                type="button"
                aria-label="Zoom out"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent(
                      "dar-discover-map-zoom-out"
                    )
                  );
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>

            </div>

            {/* LOCATE ME */}
            <button
              type="button"
              onClick={handleGetLocation}
              aria-label="Use my current location"
              className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-gray-900 shadow-xl backdrop-blur-xl transition hover:bg-green-50 hover:text-green-600 sm:bottom-4 sm:left-4"
            >
              <LocateFixed size={16} />
            </button>

            {/* OPEN MAP */}
            {location ? (
              <a
                href={`https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=15/${location.latitude}/${location.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl bg-gray-950 px-3.5 py-2.5 text-[11px] font-black text-white shadow-xl transition hover:bg-green-600 sm:bottom-4 sm:right-4"
              >
                <Map size={14} />
                Open map
              </a>
            ) : (
              <button
                type="button"
                onClick={handleGetLocation}
                className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl bg-gray-950 px-3.5 py-2.5 text-[11px] font-black text-white shadow-xl transition hover:bg-green-600 sm:bottom-4 sm:right-4"
              >
                <Map size={14} />
                Locate me
              </button>
            )}

            {/* PLACES COUNT */}
            {location && (
              <div className="absolute bottom-3 left-16 rounded-xl bg-white/95 px-3 py-2 text-[10px] font-black text-gray-800 shadow-lg backdrop-blur-xl sm:bottom-4 sm:left-20">
                {places.length === 0
                  ? "No places nearby"
                  : `${places.length} ${
                      places.length === 1
                        ? "place"
                        : "places"
                    } nearby`}
              </div>
            )}

          </div>

          {/* PLAN YOUR DAY */}
          <div className="relative overflow-hidden rounded-[28px] bg-gray-950 p-6 text-white shadow-lg sm:p-7">

            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-green-500/20 blur-3xl" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-500/15 text-green-400">
                  <Sparkles size={20} />
                </div>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white/60">
                  1 DAY
                </span>

              </div>

              <p className="mt-5 text-[11px] font-black uppercase tracking-[0.2em] text-green-400">
                Plan your day
              </p>

              <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                Your perfect Dar day
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/55">
                Build a simple itinerary from
                places and experiences you discover.
              </p>

              <div className="mt-5 space-y-2.5">

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-400/10 text-orange-300">
                    <Sunset size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white/45">
                      Morning
                    </p>

                    <p className="text-sm font-bold text-white/85">
                      Discover a place
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-400/10 text-green-300">
                    <Coffee size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white/45">
                      Afternoon
                    </p>

                    <p className="text-sm font-bold text-white/85">
                      Food & city discovery
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                    <Clock3 size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white/45">
                      Evening
                    </p>

                    <p className="text-sm font-bold text-white/85">
                      Sunset & entertainment
                    </p>
                  </div>
                </div>

              </div>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3.5 text-sm font-black text-white transition hover:bg-green-400"
              >
                Build my day
                <ArrowRight size={15} />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}