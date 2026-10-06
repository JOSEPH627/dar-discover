
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ReceiptText,
  Ticket,
  XCircle,
} from "lucide-react";

import UserBottomNav from "@/components/UserBottomNav";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function BookingsPage() {
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

  const bookings = await prisma.booking.findMany({
    where: {
      userId: user.id,
    },
    include: {
      listing: true,
    },
    orderBy: {
      bookingDate: "desc",
    },
  });

  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "UPCOMING"
  );

  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  );

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "CANCELLED"
  );

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

          {/* PROFILE */}
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

      {/* PAGE */}
      <main className="pb-28 pt-16 md:pb-16">
        {/* HEADER */}
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
                Your reservations
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                My Bookings
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                Keep track of your upcoming adventures, completed
                experiences and cancelled bookings.
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-10">
          {/* SUMMARY */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <SummaryCard
              icon={<Ticket className="h-5 w-5" />}
              label="Total"
              value={bookings.length}
            />

            <SummaryCard
              icon={<Clock3 className="h-5 w-5" />}
              label="Upcoming"
              value={upcomingBookings.length}
            />

            <SummaryCard
              icon={<CheckCircle2 className="h-5 w-5" />}
              label="Completed"
              value={completedBookings.length}
            />

            <SummaryCard
              icon={<XCircle className="h-5 w-5" />}
              label="Cancelled"
              value={cancelledBookings.length}
            />
          </div>

          {/* UPCOMING */}
          <BookingSection
            title="Upcoming"
            description="Your upcoming activities and reservations."
            icon={<Clock3 className="h-5 w-5" />}
            bookings={upcomingBookings}
            emptyTitle="No upcoming bookings"
            emptyMessage="You haven't booked any activities yet."
          />

          {/* COMPLETED */}
          <BookingSection
            title="Past"
            description="Activities and experiences you have completed."
            icon={<CheckCircle2 className="h-5 w-5" />}
            bookings={completedBookings}
            emptyTitle="No past bookings"
            emptyMessage="Your completed activities will appear here."
          />

          {/* CANCELLED */}
          <BookingSection
            title="Cancelled"
            description="Bookings that were cancelled."
            icon={<XCircle className="h-5 w-5" />}
            bookings={cancelledBookings}
            emptyTitle="No cancelled bookings"
            emptyMessage="You don't have any cancelled bookings."
          />
        </section>
      </main>

      <UserBottomNav />
    </div>
  );
}

/* SUMMARY CARD */

function SummaryCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
            {label}
          </p>

          <p className="mt-0.5 text-xl font-black text-gray-950">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* BOOKING SECTION */

function BookingSection({
  title,
  description,
  icon,
  bookings,
  emptyTitle,
  emptyMessage,
}) {
  return (
    <section className="mt-10">
      {/* SECTION TITLE */}
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
          {icon}
        </div>

        <div>
          <h2 className="text-xl font-black tracking-tight text-gray-950">
            {title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>

      {/* EMPTY */}
      {bookings.length === 0 ? (
        <div className="rounded-3xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-gray-400">
            <CalendarDays className="h-7 w-7" />
          </div>

          <h3 className="mt-4 text-base font-black text-gray-900">
            {emptyTitle}
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            {emptyMessage}
          </p>

          {title === "Upcoming" && (
            <Link
              href="/user/explore"
              className="mt-5 inline-flex rounded-xl bg-green-700 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-800"
            >
              Explore activities
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* BOOKING CARD */

function BookingCard({ booking }) {
  const listing = booking.listing;

  return (
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        {/* IMAGE */}
        <div className="relative h-52 w-full shrink-0 bg-gray-100 md:h-auto md:w-56">
          {listing?.image ? (
            <img
              src={listing.image}
              alt={listing.title || "Booked activity"}
              className="h-full min-h-52 w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-52 items-center justify-center bg-gradient-to-br from-green-800 via-green-700 to-green-500">
              <Ticket className="h-12 w-12 text-white/80" />
            </div>
          )}

          <div className="absolute left-4 top-4">
            <StatusBadge status={booking.status} />
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex-1 p-5 md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-green-700">
                {listing?.category || listing?.type || "Activity"}
              </p>

              <h3 className="mt-1 text-xl font-black tracking-tight text-gray-950">
                {listing?.title || "Activity unavailable"}
              </h3>

              {listing?.location && (
                <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 shrink-0 text-green-700" />
                  <span>{listing.location}</span>
                </div>
              )}
            </div>

            {/* TOTAL */}
            <div className="shrink-0 rounded-2xl bg-green-50 px-4 py-3 lg:text-right">
              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                Total paid
              </p>

              <p className="mt-1 text-lg font-black text-green-700">
                {formatAmount(booking.totalAmount)}
              </p>
            </div>
          </div>

          {/* DETAILS */}
          <div className="mt-5 grid gap-3 border-t border-gray-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
            <InfoItem
              icon={<CalendarDays className="h-4 w-4" />}
              label="Date"
              value={formatDate(booking.bookingDate)}
            />

            <InfoItem
              icon={<Clock3 className="h-4 w-4" />}
              label="Time"
              value={formatTime(booking.bookingDate)}
            />

            <InfoItem
              icon={<Ticket className="h-4 w-4" />}
              label="Quantity"
              value={booking.quantity || 1}
            />

            <InfoItem
              icon={<ReceiptText className="h-4 w-4" />}
              label="Reference"
              value={booking.bookingReference}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

/* INFO ITEM */

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <div className="mt-0.5 shrink-0 text-gray-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-bold text-gray-800">
          {value}
        </p>
      </div>
    </div>
  );
}

/* STATUS */

function StatusBadge({ status }) {
  const styles = {
    UPCOMING: "bg-green-700 text-white",
    COMPLETED: "bg-gray-900 text-white",
    CANCELLED: "bg-red-600 text-white",
  };

  const labels = {
    UPCOMING: "Upcoming",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wide shadow-sm ${
        styles[status] || "bg-gray-700 text-white"
      }`}
    >
      {labels[status] || status}
    </span>
  );
}

/* DATE */

function formatDate(date) {
  if (!date) return "Date unavailable";

  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* TIME */

function formatTime(date) {
  if (!date) return "Time unavailable";

  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

/* AMOUNT */

function formatAmount(amount) {
  if (amount === null || amount === undefined) {
    return "TSh 0";
  }

  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return `TSh ${amount}`;
  }

  return `TSh ${numericAmount.toLocaleString("en-TZ")}`;
}
