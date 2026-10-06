import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

import GuestActionButton from "@/components/GuestActionButton";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  Star,
  MessageCircle,
} from "lucide-react";

export default async function PlaceDetailsPage({
  params,
}) {
  const { id } = await params;

  const listingId = Number(id);

  if (
    !Number.isInteger(listingId) ||
    listingId <= 0
  ) {
    notFound();
  }

  const user = await getCurrentUser();

  const listing = await prisma.listing.findFirst({
    where: {
      id: listingId,
      isActive: true,
    },

    select: {
      id: true,
      title: true,
      description: true,
      type: true,
      category: true,
      location: true,
      price: true,
      image: true,
      rating: true,
      reviewCount: true,
    },
  });

  if (!listing) {
    notFound();
  }

  /*
   * Record listing view.
   *
   * If guest:
   * userId = null
   *
   * If logged in:
   * userId = current user's ID
   */
  try {
    await prisma.listingView.create({
      data: {
        listingId: listing.id,
        userId: user?.id ?? null,
      },
    });
  } catch (error) {
    console.error(
      "Unable to record listing view:",
      error
    );
  }

  const price =
    listing.price !== null
      ? Number(listing.price)
      : null;

  const rating = Number(
    listing.rating || 0
  );

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-gray-900">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
          {/* BACK */}
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-black text-gray-900 transition hover:text-green-600"
          >
            <ArrowLeft size={17} />
            Back
          </a>

          {/* LOGO */}
          <div className="font-black tracking-tight">
            <span className="text-gray-950">
              DAR
            </span>{" "}
            <span className="text-green-600">
              DISCOVER
            </span>
          </div>

          {/* TOP SAVE BUTTON */}
          <GuestActionButton
            action="save"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-green-300 hover:bg-green-50 hover:text-green-600"
          >
            <Heart size={17} />
          </GuestActionButton>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 md:py-10">
        {/* ===================================================
            IMAGE
        =================================================== */}
        <section className="relative overflow-hidden rounded-[28px] bg-gray-200 shadow-sm">
          <div className="aspect-[16/9] max-h-[520px] w-full">
            {listing.image ? (
              <img
                src={listing.image}
                alt={listing.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-green-100 via-white to-orange-50">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-green-600 shadow-sm">
                  <MapPin size={40} />
                </div>
              </div>
            )}
          </div>

          {/* CATEGORY */}
          <div className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1.5 text-xs font-black text-white shadow-lg">
            {listing.category}
          </div>
        </section>

        {/* ===================================================
            TITLE / LOCATION / RATING / PRICE
        =================================================== */}
        <section className="mt-6 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            {/* LEFT */}
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-green-600">
                {listing.type}
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                {listing.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
                {/* LOCATION */}
                <span className="flex items-center gap-2">
                  <MapPin size={15} />
                  {listing.location}
                </span>

                {/* RATING */}
                <span className="flex items-center gap-2">
                  <Star
                    size={15}
                    fill="currentColor"
                    className="text-yellow-400"
                  />

                  <strong className="text-gray-900">
                    {rating.toFixed(1)}
                  </strong>

                  <span>
                    ({listing.reviewCount}{" "}
                    {listing.reviewCount === 1
                      ? "review"
                      : "reviews"}
                    )
                  </span>
                </span>
              </div>
            </div>

            {/* PRICE */}
            <div className="shrink-0">
              {price !== null ? (
                <>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">
                    From
                  </p>

                  <p className="mt-1 text-2xl font-black text-green-600">
                    TSh{" "}
                    {price.toLocaleString()}
                  </p>
                </>
              ) : (
                <p className="text-sm font-black text-gray-700">
                  Contact provider
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ===================================================
            ABOUT
        =================================================== */}
        <section className="mt-5 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-7">
          <h2 className="text-xl font-black text-gray-950">
            About this place
          </h2>

          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
            {listing.description ||
              "No description has been added yet."}
          </p>
        </section>

        {/* ===================================================
            INFORMATION
        =================================================== */}
        <section className="mt-5 grid gap-4 sm:grid-cols-2">
          {/* LOCATION */}
          <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <MapPin size={18} />
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400">
                  Location
                </p>

                <p className="mt-0.5 text-sm font-black text-gray-900">
                  {listing.location}
                </p>
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Clock3 size={18} />
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400">
                  Experience
                </p>

                <p className="mt-0.5 text-sm font-black text-gray-900">
                  {listing.type}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            REVIEWS
        =================================================== */}
        <section className="mt-5 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-green-600">
                Community feedback
              </p>

              <h2 className="mt-1 text-xl font-black text-gray-950">
                Reviews
              </h2>
            </div>

            {/* WRITE REVIEW */}
            <GuestActionButton
              action="review"
              className="flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white transition hover:bg-gray-800"
            >
              <MessageCircle size={16} />
              Write a review
            </GuestActionButton>
          </div>

          {/* RATING */}
          <div className="mt-6 flex flex-col gap-5 rounded-2xl bg-[#f7f8f6] p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              {/* NUMBER */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                <span className="text-2xl font-black text-gray-950">
                  {rating.toFixed(1)}
                </span>
              </div>

              {/* STARS */}
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <Star
                        key={star}
                        size={16}
                        fill={
                          star <=
                          Math.round(rating)
                            ? "currentColor"
                            : "none"
                        }
                        className={
                          star <=
                          Math.round(rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    )
                  )}
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  {listing.reviewCount === 1
                    ? "Based on 1 review"
                    : `Based on ${listing.reviewCount} reviews`}
                </p>
              </div>
            </div>

            {/* NO REVIEWS */}
            {listing.reviewCount === 0 && (
              <p className="text-sm leading-6 text-gray-500">
                No reviews yet. Be the first person
                to share your experience.
              </p>
            )}
          </div>
        </section>

        {/* ===================================================
            ACTIONS
        =================================================== */}
        <section className="mt-5 rounded-[28px] bg-gray-950 p-5 text-white shadow-lg sm:p-7">
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-lg font-black">
                Ready to explore?
              </p>

              <p className="mt-1 text-sm leading-6 text-white/55">
                Save this place or continue to
                booking.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* SAVE */}
              <GuestActionButton
                action="save"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 text-sm font-black text-white transition hover:bg-white/10"
              >
                <Heart size={17} />
                Save
              </GuestActionButton>

              {/* BOOK */}
              <GuestActionButton
                action="book"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3.5 text-sm font-black text-white transition hover:bg-green-400"
              >
                <CalendarDays size={17} />
                Book now
              </GuestActionButton>
            </div>

            {/* GUEST MESSAGE */}
            {!user && (
              <p className="text-center text-xs leading-5 text-white/45">
                You can explore this experience freely.
                Sign in is required when you want to
                save, book or review.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}