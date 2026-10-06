
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  UserCircle,
} from "lucide-react";

import UserBottomNav from "@/components/UserBottomNav";
import { getCurrentUser } from "@/lib/auth";

export default async function PersonalDetailsPage() {
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

  const memberSince = new Date(user.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900">

      {/* Fixed Personal Details Navbar */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">

          {/* DAR DISCOVER Logo */}
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

          {/* Actual Logged-in User Name */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                Account
              </p>

              <p className="max-w-[180px] truncate text-sm font-black text-gray-900">
                {user.name}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-700 to-green-500 text-sm font-black text-white shadow-md">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="pb-28 pt-16 md:pb-16">

        {/* Page Header */}
        <section className="border-b border-gray-100 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-8">

            <Link
              href="/user/profile"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-green-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to profile
            </Link>

            <div className="mt-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-green-700">
                Your account
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                Personal Details
              </h1>

              <p className="mt-2 text-sm text-gray-500 md:text-base">
                View the personal information associated with your account.
              </p>
            </div>

          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-10">

          {/* User Summary */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">

              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-700 to-green-500 text-3xl font-black text-white shadow-lg">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-black text-gray-950">
                  {user.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {user.email}
                </p>
              </div>

            </div>
          </div>

          {/* Personal Information */}
          <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-100 px-6 py-5 md:px-8">
              <h2 className="text-lg font-black text-gray-950">
                Personal information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Information connected to your DAR DISCOVER account.
              </p>
            </div>

            <div className="divide-y divide-gray-100">

              {/* Full Name */}
              <div className="flex items-center gap-4 px-6 py-5 md:px-8">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <UserCircle className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Full name
                  </p>

                  <p className="mt-1 truncate text-sm font-bold text-gray-900">
                    {user.name}
                  </p>
                </div>

              </div>

              {/* Email */}
              <div className="flex items-center gap-4 px-6 py-5 md:px-8">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <Mail className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Email address
                  </p>

                  <p className="mt-1 truncate text-sm font-bold text-gray-900">
                    {user.email}
                  </p>
                </div>

              </div>

              {/* Member Since */}
              <div className="flex items-center gap-4 px-6 py-5 md:px-8">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Member since
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-900">
                    {memberSince}
                  </p>
                </div>

              </div>

            </div>
          </div>

        </section>
      </main>

      {/* Fixed Bottom Navigation */}
      <UserBottomNav />

    </div>
  );
}

