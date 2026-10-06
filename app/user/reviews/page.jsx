
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MessageSquareText,
  Star,
  UserCircle,
} from "lucide-react";

import UserBottomNav from "@/components/UserBottomNav";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ReviewsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  if (user.role === "ADMIN") {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.href="/admin/dashboard"`,
        }}
      />
    );
  }

  if (user.role === "PROVIDER") {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.href="/provider/dashboard"`,
        }}
      />
    );
  }

  const reviews = await prisma.review.findMany({
    where: {
      userId: user.id,
    },
    include: {
      listing: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce(
            (total, review) => total + review.rating,
            0
          ) / totalReviews
        ).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900">
      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          {/* LOGO */}
          <Link
            href="/user/home"
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-700 text-sm font-black text-white shadow-sm">
              D
            </div>

            <div className="leading-none">
              <div className="text-sm font-black tracking-tight text-gray-950">
                DAR
              </div>

              <div className="text-[10px] font-black tracking-[0.18em] text-orange-500">
                DISCOVER
              </div>
            </div>
          </Link>

          {/* ACCOUNT */}
          <Link
            href="/user/profile"
            className="group flex items-center gap-3 rounded-full pl-2 transition hover:bg-gray-50"
          >
            <div className="hidden text-right sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                Account
              </p>

              <p className="max-w-[180px] truncate text-sm font-black text-gray-900">
                {user.name}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-700 to-green-500 text-sm font-black text-white shadow-md ring-2 ring-white">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="pb-28 pt-16 md:pb-16">
        {/* PAGE HEADER */}
        <section className="border-b border-gray-100 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-7 md:px-8 md:py-9">
            <Link
              href="/user/profile"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-green-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to profile
            </Link>

            <div className="mt-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-green-700">
                Your experience
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                My Reviews
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                See the feedback you have shared about places,
                activities and experiences on DAR DISCOVER.
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-10">
          {/* SUMMARY */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* TOTAL REVIEWS */}
            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                  <MessageSquareText className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                    Total reviews
                  </p>

                  <p className="mt-1 text-2xl font-black text-gray-950">
                    {totalReviews}
                  </p>
                </div>
              </div>
            </div>

            {/* AVERAGE */}
            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <Star className="h-6 w-6 fill-current" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                    Average rating
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-2xl font-black text-gray-950">
                      {averageRating}
                    </span>

                    <div className="flex items-center gap-0.5 text-orange-400">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* REVIEWS */}
          <div className="mt-10">
            <div className="mb-5">
              <h2 className="text-xl font-black tracking-tight text-gray-950">
                Your reviews
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest feedback and experiences.
              </p>
            </div>

            {reviews.length === 0 ? (
              /* EMPTY STATE */
              <div className="rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-700">
                  <MessageSquareText className="h-8 w-8" />
                </div>

                <h3 className="mt-5 text-lg font-black text-gray-950">
                  No reviews yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  You haven't reviewed any activities or places
                  yet. Your reviews will appear here after you
                  share your experience.
                </p>

                <Link
                  href="/user/explore"
                  className="mt-6 inline-flex rounded-xl bg-green-700 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-800"
                >
                  Explore activities
                </Link>
              </div>
            ) : (
              /* REVIEW LIST */
              <div className="space-y-5">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <UserBottomNav />
    </div>
  );
}

/* REVIEW CARD */

function ReviewCard({ review }) {
  const listing = review.listing;

  return (
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        {/* IMAGE */}
        <div className="relative h-52 w-full shrink-0 bg-gray-100 md:h-auto md:w-56">
          {listing?.image ? (
            <img
              src={listing.image}
              alt={listing.title || "Reviewed activity"}
              className="h-full min-h-52 w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-52 items-center justify-center bg-gradient-to-br from-green-800 via-green-700 to-green-500">
              <MessageSquareText className="h-12 w-12 text-white/80" />
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-5 md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-green-700">
                {listing?.category ||
                  listing?.type ||
                  "Experience"}
              </p>

              <h3 className="mt-1 text-xl font-black tracking-tight text-gray-950">
                {listing?.title || "Activity unavailable"}
              </h3>

              {listing?.location && (
                <p className="mt-1 text-sm text-gray-500">
                  {listing.location}
                </p>
              )}
            </div>

            {/* RATING */}
            <div className="flex shrink-0 items-center gap-1 rounded-xl bg-orange-50 px-3 py-2">
              <Star className="h-4 w-4 fill-current text-orange-400" />

              <span className="text-sm font-black text-gray-900">
                {review.rating}/5
              </span>
            </div>
          </div>

          {/* STARS */}
          <div className="mt-4 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= review.rating
                    ? "fill-orange-400 text-orange-400"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>

          {/* COMMENT */}
          {review.comment ? (
            <div className="mt-5 rounded-2xl bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                <p className="text-sm leading-6 text-gray-600">
                  {review.comment}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-5 text-sm italic text-gray-400">
              No written comment.
            </p>
          )}

          {/* DATE */}
          <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-medium text-gray-400">
            <CalendarDays className="h-4 w-4" />

            <span>
              Reviewed on{" "}
              {new Date(review.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

