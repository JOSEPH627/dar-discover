import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Star,
  Compass,
  SearchX,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import GuestActionButton from "@/components/GuestActionButton";

function calculateDistance(lat1, lng1, lat2, lng2) {
  const earthRadius = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c =
    2 *
    Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

export default async function PlacesPage({
  searchParams,
}) {
  const params = await searchParams;

  const search = String(
    params?.search || ""
  ).trim();

  const near = String(
    params?.near || ""
  ).toLowerCase() === "true";

  const latitude = Number(params?.lat);
  const longitude = Number(params?.lng);

  /*
   * Near Me is valid only when both coordinates
   * are valid numbers.
   */
  const hasLocation =
    near &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180;

  /*
   * Get active listings from database.
   *
   * Search is still applied here.
   *
   * Example:
   * /user/places?search=food
   *
   * Example:
   * /user/places?near=true&lat=...&lng=...
   *
   * Example:
   * /user/places?near=true&lat=...&lng=...&search=food
   */
  const listings = await prisma.listing.findMany({
    where: {
      isActive: true,

      ...(search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                },
              },
              {
                category: {
                  contains: search,
                },
              },
              {
                type: {
                  contains: search,
                },
              },
              {
                location: {
                  contains: search,
                },
              },
              {
                description: {
                  contains: search,
                },
              },
            ],
          }
        : {}),
    },

    select: {
      id: true,
      title: true,
      description: true,
      type: true,
      category: true,
      location: true,
      latitude: true,
      longitude: true,
      price: true,
      image: true,
      rating: true,
      reviewCount: true,
      createdAt: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  /*
   * Convert Decimal coordinates into numbers
   * and calculate distance when Near Me is active.
   */
  let results = listings.map((listing) => {
    const listingLatitude = Number(
      listing.latitude
    );

    const listingLongitude = Number(
      listing.longitude
    );

    let distance = null;

    if (hasLocation) {
      distance = calculateDistance(
        latitude,
        longitude,
        listingLatitude,
        listingLongitude
      );
    }

    return {
      ...listing,
      distance,
    };
  });

  /*
   * Near Me:
   *
   * Only show places within 50 KM.
   *
   * Then sort:
   * nearest → farthest
   */
  if (hasLocation) {
    const MAX_DISTANCE_KM = 50;

    results = results
      .filter(
        (listing) =>
          listing.distance !== null &&
          listing.distance <= MAX_DISTANCE_KM
      )
      .sort(
        (a, b) =>
          a.distance - b.distance
      );
  }

  const resultCount = results.length;

  return (
    <main className="min-h-screen bg-[#f7f8f6]">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-black text-gray-800 transition hover:text-green-600"
          >
            <ArrowLeft size={17} />
            Back
          </a>

          <div className="font-black tracking-tight">
            <span className="text-gray-950">
              DAR
            </span>{" "}
            <span className="text-green-600">
              DISCOVER
            </span>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-600">
            <Compass size={18} />
          </div>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8">
        {/* =================================================
            PAGE INTRO
        ================================================== */}
        <section>
          {hasLocation ? (
            <>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-green-600">
                <MapPin size={14} />
                Near you
              </div>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                Places near you
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Discover experiences and places closest
                to your current location.
              </p>
            </>
          ) : search ? (
            <>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-green-600">
                Search results
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                Results for{" "}
                <span className="text-green-600">
                  “{search}”
                </span>
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Find your next experience in Dar es
                Salaam.
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-green-600">
                Discover
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                Find your next experience
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Explore places, experiences, food and
                activities around Dar es Salaam.
              </p>
            </>
          )}
        </section>

        {/* =================================================
            SEARCH / LOCATION STATUS
        ================================================== */}
        <section className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            {hasLocation && (
              <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-700">
                <MapPin size={14} />
                Showing places within 50 km
              </div>
            )}

            {search && (
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-600 ring-1 ring-gray-200">
                <SearchX size={14} />
                Search: {search}
              </div>
            )}

            {!hasLocation && !search && (
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-600 ring-1 ring-gray-200">
                <Compass size={14} />
                All experiences
              </div>
            )}
          </div>
        </section>

        {/* =================================================
            RESULT COUNT
        ================================================== */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm font-bold text-gray-500">
            {resultCount}{" "}
            {resultCount === 1
              ? "experience"
              : "experiences"}{" "}
            found
          </p>
        </div>

        {/* =================================================
            EMPTY STATE
        ================================================== */}
        {results.length === 0 ? (
          <section className="mt-6 rounded-[28px] bg-white px-6 py-16 text-center shadow-sm ring-1 ring-gray-100">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
              {hasLocation ? (
                <MapPin size={28} />
              ) : (
                <SearchX size={28} />
              )}
            </div>

            <h2 className="mt-5 text-xl font-black text-gray-950">
              {hasLocation
                ? "No places found near you"
                : "Nothing found"}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {hasLocation
                ? "There are currently no experiences within 50 km of your current location."
                : search
                ? `We couldn't find any experiences matching “${search}”.`
                : "There are currently no experiences available."}
            </p>

            <a
              href="/user/places"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white transition hover:bg-gray-800"
            >
              Explore all places
              <ArrowRight size={16} />
            </a>
          </section>
        ) : (
          /* =================================================
             RESULTS GRID
          ================================================== */
          <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((listing) => (
              <a
                key={listing.id}
                href={`/user/places/${listing.id}`}
                className="group overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  {listing.image ? (
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-green-100 via-white to-orange-50">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-green-600 shadow-sm">
                        <MapPin size={27} />
                      </div>
                    </div>
                  )}

                  {/* CATEGORY */}
                  <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-black text-gray-800 shadow-sm backdrop-blur">
                    {listing.category}
                  </div>

                  {/* DISTANCE */}
                  {hasLocation &&
                    listing.distance !== null && (
                      <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-gray-950/85 px-3 py-1.5 text-[11px] font-black text-white backdrop-blur">
                        <MapPin size={12} />
                        {listing.distance < 1
                          ? `${Math.round(
                              listing.distance * 1000
                            )} m`
                          : `${listing.distance.toFixed(
                              1
                            )} km`}
                      </div>
                    )}
                </div>

                {/* CARD BODY */}
                <div className="p-5">
                  {/* TYPE */}
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-green-600">
                    {listing.type}
                  </p>

                  {/* TITLE */}
                  <h2 className="mt-1.5 line-clamp-2 text-lg font-black tracking-tight text-gray-950">
                    {listing.title}
                  </h2>

                  {/* LOCATION */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={14} className="shrink-0" />
                    <span className="truncate">
                      {listing.location}
                    </span>
                  </div>

                  {/* RATING */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star
                        size={14}
                        fill="currentColor"
                      />
                    </div>

                    <span className="text-sm font-black text-gray-900">
                      {Number(
                        listing.rating || 0
                      ).toFixed(1)}
                    </span>

                    <span className="text-xs text-gray-400">
                      ({listing.reviewCount})
                    </span>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-gray-100 pt-4">
                    <div>
                      {listing.price !== null ? (
                        <>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            From
                          </p>

                          <p className="mt-0.5 text-base font-black text-gray-950">
                            TSh{" "}
                            {Number(
                              listing.price
                            ).toLocaleString()}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-black text-gray-700">
                          Contact provider
                        </p>
                      )}
                    </div>

                    <span className="flex items-center gap-1 text-xs font-black text-green-600 transition group-hover:gap-2">
                      Explore
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}