import { redirect } from "next/navigation";
import Link from "next/link";
import { Bell, ArrowLeft } from "lucide-react";

import { getCurrentUser } from "@/lib/auth";

export default async function NotificationsPage() {
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

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900">

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 md:px-8">

          {/* LOGO */}
          <Link
            href="/user/home"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-lg font-black text-white">
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

          {/* BACK */}
          <Link
            href="/user/home"
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-gray-600 transition hover:bg-green-50 hover:text-green-700"
          >
            <ArrowLeft size={17} />
            Back
          </Link>

        </div>
      </header>

      {/* NOTIFICATIONS */}
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">

        {/* TITLE */}
        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
            <Bell
              size={24}
              className="text-green-700"
            />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Notifications
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Your latest notifications will appear here
            </p>
          </div>

        </div>

        {/* EMPTY STATE */}
        <div className="mt-10 flex min-h-[400px] items-center justify-center rounded-[32px] border border-gray-100 bg-white">

          <div className="px-6 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
              <Bell
                size={38}
                className="text-gray-300"
              />
            </div>

            <h2 className="mt-6 text-xl font-black text-gray-900">
              No notifications
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              You&apos;re all caught up. New notifications will appear here.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}