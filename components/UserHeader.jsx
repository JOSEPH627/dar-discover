"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  Bell,
  UserCircle,
  Menu,
  X,
  LogOut,
  Compass,
  MapPin,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function UserHeader({ user }) {
  const router = useRouter();
const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
  try {
    setLoggingOut(true);

    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    router.push("/");
    router.refresh();
  } catch (error) {
    console.error("LOGOUT_ERROR:", error);
  } finally {
    setLoggingOut(false);
  }
}

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-xl">

        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 md:px-8">

          {/* LOGO */}
          <Link
            href="/user/home"
            className="flex shrink-0 items-center gap-3"
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

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-8 lg:flex">

            <Link
              href="/user/home"
              className="text-sm font-bold text-green-700"
            >
              Home
            </Link>

            <Link
              href="/places"
              className="text-sm font-bold text-gray-600 transition hover:text-green-700"
            >
              Explore
            </Link>

            <Link
              href="/places"
              className="text-sm font-bold text-gray-600 transition hover:text-green-700"
            >
              Places
            </Link>

            <Link
              href="/events"
              className="text-sm font-bold text-gray-600 transition hover:text-green-700"
            >
              Events
            </Link>

          </nav>

          {/* RIGHT ACTIONS */}
          <div className="hidden items-center gap-1 md:flex">

            {/* SAVED */}
           <Link
  href="/user/saved"
  title="Saved"
  className={`group flex h-11 w-11 items-center justify-center rounded-full transition ${
    pathname === "/user/saved"
      ? "bg-green-100 text-green-700"
      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
  }`}
>
  <Heart
    size={20}
    strokeWidth={2}
    className={`transition group-hover:scale-110 ${
      pathname === "/user/saved"
        ? "fill-green-700"
        : ""
    }`}
  />
</Link>

            {/* NOTIFICATIONS */}
            <Link
              href="/user/notifications"
              title="Notifications"
              className="group relative flex h-11 w-11 items-center justify-center rounded-full text-gray-600 transition hover:bg-green-50 hover:text-green-700"
            >
              <Bell
                size={20}
                strokeWidth={2}
                className="transition group-hover:scale-110"
              />

              {/* Notification dot */}
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-orange-500" />
            </Link>

            {/* PROFILE */}
            <Link
              href="/user/profile"
              className="ml-1 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 transition hover:border-green-200 hover:bg-green-50"
            >
              <UserCircle
                size={22}
                className="text-green-700"
              />

              <div className="hidden xl:block">
                <p className="max-w-[110px] truncate text-xs font-black text-gray-900">
                  {user?.name || "User"}
                </p>

                <p className="text-[10px] text-gray-400">
                  Profile
                </p>
              </div>
            </Link>

            {/* LOGOUT */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              title="Logout"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            >
              <LogOut size={18} />
            </button>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((prev) => !prev)
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 md:hidden"
          >
            {mobileMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-5 shadow-lg md:hidden">

            <div className="mb-5 flex items-center gap-3 rounded-2xl bg-gray-50 p-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-sm font-black text-green-700">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-black text-gray-900">
                  {user?.name || "User"}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {user?.email}
                </p>
              </div>

            </div>

            <div className="space-y-1">

              <Link
                href="/user/home"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                <Compass size={19} />
                Home
              </Link>

              <Link
                href="/places"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                <Compass size={19} />
                Explore
              </Link>

              <Link
                href="/places"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                <MapPin size={19} />
                Places
              </Link>

              <Link
                href="/events"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                <Bell size={19} />
                Events
              </Link>

              <Link
                href="/user/saved"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                <Heart size={19} />
                Saved
              </Link>

              <Link
                href="/user/notifications"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                <Bell size={19} />
                Notifications
              </Link>

              <Link
                href="/user/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                <UserCircle size={19} />
                Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50"
              >
                <LogOut size={19} />
                {loggingOut
                  ? "Logging out..."
                  : "Logout"}
              </button>

            </div>
          </div>
        )}

      </header>
    </>
  );
}