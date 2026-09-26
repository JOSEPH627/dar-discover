
"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* =========================
          FIXED HEADER
      ========================== */}
      <header className="fixed left-0 right-0 top-0 z-[9999] w-full border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-xl">

        {/* HEADER CONTENT */}
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 md:px-8">

          {/* =========================
              LOGO
          ========================== */}
          <div
        
            className="flex items-center gap-3"
            aria-label="DAR DISCOVER Home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-950 text-xl font-black text-white shadow-sm">
              D
            </div>

            <div className="text-lg font-extrabold tracking-tight text-gray-950">
              DAR{" "}
              <span className="text-green-600">
                DISCOVER
              </span>
            </div>
          </div>  

          {/* =========================
              DESKTOP NAV
          ========================== */}
          <nav className="hidden items-center md:flex">

            <a
              href="/sign-in"
              className="rounded-xl px-5 py-2.5 text-sm font-bold text-gray-700 transition duration-200 hover:bg-gray-100 hover:text-gray-950"
            >
              Sign in
            </a>

          </nav>

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition duration-200 hover:bg-gray-200 md:hidden"
          >
            {menuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

        </div>

        {/* =========================
            MOBILE MENU
        ========================== */}
        {menuOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-lg md:hidden">

            <div className="mx-auto max-w-7xl">

              <a
                href="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 hover:text-gray-950"
              >
                Sign in
              </a>

            </div>

          </div>
        )}

      </header>

      {/* =========================
          HEADER SPACE
          Prevents page content from
          going underneath the fixed header
      ========================== */}
      <div className="h-[72px] w-full" aria-hidden="true" />
    </>
  );
}

