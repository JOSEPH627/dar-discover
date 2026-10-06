import { redirect } from "next/navigation";
import Link from "next/link";
import {
  UserCircle,
  Mail,
  CalendarDays,
  Pencil,
  Heart,
  Ticket,
  Star,
  LockKeyhole,
  ChevronRight,
  Settings,
  ArrowLeft,
} from "lucide-react";

import { getCurrentUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  if (user.role === "PROVIDER") {
    redirect("/provider/dashboard");
  }

  const firstLetter =
    user.name?.charAt(0)?.toUpperCase() || "U";

  const joinedDate = new Date(
    user.createdAt
  ).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900">

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-5xl items-center justify-between px-4 md:px-8">

          <Link
            href="/user/home"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-lg font-black text-white shadow-sm">
              D
            </div>

            <div className="leading-none">
              <div className="text-base font-black tracking-tight text-gray-900">
                DAR
              </div>

              <div className="text-[10px] font-black tracking-[0.22em] text-orange-500">
                DISCOVER
              </div>
            </div>
          </Link>

          <Link
            href="/user/home"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-gray-600 transition hover:bg-green-50 hover:text-green-700"
          >
            <ArrowLeft size={17} />

            <span className="hidden sm:inline">
              Back
            </span>
          </Link>

        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">

        {/* PAGE INTRO */}
        <div className="mb-7">
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your profile and view your DAR DISCOVER activity.
          </p>
        </div>

        {/* PROFILE HEADER */}
        <section className="overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-sm">

          {/* COVER */}
          <div className="h-28 bg-gradient-to-r from-green-900 via-green-700 to-green-500 sm:h-32" />

          <div className="px-5 pb-7 sm:px-7 md:px-8 md:pb-8">

            <div className="-mt-12 flex flex-col gap-5 sm:-mt-11 sm:flex-row sm:items-end sm:justify-between">

              {/* USER */}
              <div className="flex items-end gap-4">

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[26px] border-4 border-white bg-green-100 text-3xl font-black text-green-700 shadow-md">
                  {firstLetter}
                </div>

                <div className="pb-1">

                  <h2 className="text-xl font-black text-gray-900 sm:text-2xl">
                    {user.name}
                  </h2>

                  <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                    <Mail size={14} />

                    <span className="max-w-[230px] truncate">
                      {user.email}
                    </span>
                  </div>

                </div>

              </div>

              {/* EDIT */}
              <Link
                href="/user/edit-profile"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-green-800"
              >
                <Pencil size={16} />
                Edit Profile
              </Link>

            </div>

            {/* MEMBER SINCE */}
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays
                size={16}
                className="text-green-700"
              />

              <span>
                Member since {joinedDate}
              </span>
            </div>

          </div>
        </section>

        {/* PERSONAL INFORMATION */}
        <section className="mt-8">

          <div className="mb-3 px-1">
            <h2 className="text-lg font-black text-gray-900">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your personal profile details.
            </p>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-sm">

            {/* PERSONAL DETAILS */}
            <Link
             href="/user/personal-details"
              className="group flex items-center gap-4 border-b border-gray-100 px-5 py-5 transition hover:bg-green-50/60 sm:px-6"
            >

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
                <UserCircle
                  size={21}
                  className="text-green-700"
                />
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="text-sm font-black text-gray-900">
                  Personal details
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Name, email and profile information
                </p>

              </div>

              <ChevronRight
                size={19}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700"
              />

            </Link>

          
          </div>
        </section>

        {/* DAR DISCOVER ACTIVITY */}
        <section className="mt-8">

          <div className="mb-3 px-1">
            <h2 className="text-lg font-black text-gray-900">
              Your DAR DISCOVER
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your saved places, bookings and experiences.
            </p>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-sm">

            {/* SAVED */}
            <Link
              href="/user/saved"
              className="group flex items-center gap-4 border-b border-gray-100 px-5 py-5 transition hover:bg-green-50/60 sm:px-6"
            >

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
                <Heart
                  size={20}
                  className="text-red-500"
                />
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="text-sm font-black text-gray-900">
                  Saved
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Places and experiences you saved
                </p>

              </div>

              <ChevronRight
                size={19}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700"
              />

            </Link>

            {/* BOOKINGS */}
            <Link
              href="/user/bookings"
              className="group flex items-center gap-4 border-b border-gray-100 px-5 py-5 transition hover:bg-green-50/60 sm:px-6"
            >

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                <Ticket
                  size={20}
                  className="text-orange-500"
                />
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="text-sm font-black text-gray-900">
                  My Bookings
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Upcoming and past bookings
                </p>

              </div>

              <ChevronRight
                size={19}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700"
              />

            </Link>

            {/* REVIEWS */}
            <Link
              href="/user/reviews"
              className="group flex items-center gap-4 px-5 py-5 transition hover:bg-green-50/60 sm:px-6"
            >

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-50">
                <Star
                  size={20}
                  className="text-yellow-500"
                />
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="text-sm font-black text-gray-900">
                  My Reviews
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Reviews you've written
                </p>

              </div>

              <ChevronRight
                size={19}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700"
              />

            </Link>

          </div>
        </section>


        {/* ACCOUNT FOOTER */}
        <div className="mt-8 pb-10 text-center">

          <p className="text-xs text-gray-400">
            DAR DISCOVER
          </p>

          <p className="mt-1 text-[11px] text-gray-400">
            Discover more. Experience Dar.
          </p>

        </div>

      </main>
    </div>
  );
}