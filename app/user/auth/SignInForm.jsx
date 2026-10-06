"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  Compass,
} from "lucide-react";

const backgroundImages = [
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85",
    title: "Beach life",
    description:
      "Discover beautiful coastal escapes around Dar es Salaam.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2000&q=85",
    title: "City life",
    description:
      "Explore the city, neighborhoods and hidden gems.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2000&q=85",
    title: "Music & events",
    description:
      "Find concerts, nightlife and unforgettable events.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=85",
    title: "Gaming",
    description:
      "Discover gaming spots, entertainment and things to do.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2000&q=85",
    title: "Food & culture",
    description:
      "Taste your way through Dar es Salaam.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=85",
    title: "Your next adventure",
    description:
      "There is always something new to discover.",
  },
];

export default function SignInPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((current) => {
        return (current + 1) % backgroundImages.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.message || "Invalid email or password."
        );

        setLoading(false);
        return;
      }

      window.location.href = "/user/home";
    } catch (error) {
      console.error("SIGN IN ERROR:", error);

      setErrorMessage(
        "Unable to connect to the server. Please try again."
      );

      setLoading(false);
    }
  }

  const activeBackground = backgroundImages[currentImage];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-950">

      {/* BACKGROUND SLIDES */}
      <div className="absolute inset-0">
        {backgroundImages.map((item, index) => (
          <div
            key={item.image}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ${
              index === currentImage
                ? "scale-100 opacity-100"
                : "scale-105 opacity-0"
            }`}
            style={{
              backgroundImage: `url("${item.image}")`,
            }}
          />
        ))}

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/55" />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/30" />

        {/* TOP FADE */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen">

        {/* TOP BAR */}
        <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

          {/* LOGO */}
          <div
            className="flex items-center gap-3"
            aria-label="DAR DISCOVER Home"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-black text-gray-950 shadow-lg">
              D
            </div>

            <div className="text-lg font-extrabold tracking-tight text-white">
              DAR{" "}
              <span className="text-green-400">
                DISCOVER
              </span>
            </div>
          </div>

          {/* BACK HOME */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <ArrowLeft size={17} />

            <span className="hidden sm:inline">
              Back to home
            </span>

            <span className="sm:hidden">
              Home
            </span>
          </Link>
        </header>

        {/* MAIN */}
        <div className="mx-auto flex min-h-[calc(100vh-75px)] max-w-7xl items-center px-5 pb-6 pt-2 sm:px-8 lg:px-10">

          <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_410px]">

            {/* LEFT SIDE */}
            <section className="hidden max-w-xl text-white lg:block">

              {/* SMALL LABEL */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <Compass size={15} />
                Explore Dar
              </div>

              {/* TITLE */}
              <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
                Discover
                <br />

                <span className="text-green-400">
                  {activeBackground.title}
                </span>
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-5 max-w-lg text-base leading-7 text-white/75 xl:text-lg">
                {activeBackground.description}
              </p>

              {/* CATEGORY INDICATORS */}
              <div className="mt-8 flex items-center gap-2">
                {backgroundImages.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    aria-label={`Show ${item.title}`}
                    onClick={() => setCurrentImage(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === currentImage
                        ? "w-10 bg-green-400"
                        : "w-5 bg-white/35 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>

              {/* CURRENT CATEGORY */}
              <div className="mt-4 text-sm font-semibold text-white/60">
                {currentImage + 1} / {backgroundImages.length}

                <span className="mx-2">
                  •
                </span>

                {activeBackground.title}
              </div>
            </section>

            {/* SIGN IN CARD */}
            <section className="w-full">

              <div className="overflow-hidden rounded-[26px] border border-white/30 bg-white/95 shadow-2xl backdrop-blur-xl">

                <div className="p-5 sm:p-6 md:p-7">

                  {/* MOBILE INTRO */}
                  <div className="mb-5 lg:hidden">

                    <div className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-green-600">
                      <Compass size={14} />
                      DAR DISCOVER
                    </div>

                    <h1 className="text-2xl font-black tracking-tight text-gray-950">
                      Welcome back
                    </h1>

                    <p className="mt-1.5 text-xs leading-5 text-gray-500">
                      Sign in and continue exploring Dar es Salaam.
                    </p>

                  </div>

                  {/* DESKTOP HEADING */}
                  <div className="hidden lg:block">

                    <h2 className="text-2xl font-black tracking-tight text-gray-950">
                      Welcome back
                    </h2>

                    <p className="mt-1.5 text-xs leading-5 text-gray-500">
                      Sign in to continue exploring Dar es Salaam.
                    </p>

                  </div>

                  {/* ERROR MESSAGE */}
                  {errorMessage && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">
                      {errorMessage}
                    </div>
                  )}

                  {/* FORM */}
                  <form
                    onSubmit={handleSubmit}
                    className="mt-5 space-y-3.5"
                  >

                    {/* EMAIL */}
                    <div>

                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-xs font-bold text-gray-800"
                      >
                        Email
                      </label>

                      <div className="relative">

                        <Mail
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value);
                            setErrorMessage("");
                          }}
                          required
                          disabled={loading}
                          className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-xs text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                        />

                      </div>

                    </div>

                    {/* PASSWORD */}
                    <div>

                      <div className="mb-1.5 flex items-center justify-between">

                        <label
                          htmlFor="password"
                          className="block text-xs font-bold text-gray-800"
                        >
                          Password
                        </label>

                        <Link
                          href="/user/forgot-password"
                          className="relative z-50 inline-block cursor-pointer text-[11px] font-bold text-green-600 transition hover:text-green-700"
                        >
                          Forgot password?
                        </Link>

                      </div>

                      <div className="relative">

                        <LockKeyhole
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="password"
                          name="password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          autoComplete="current-password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                            setErrorMessage("");
                          }}
                          required
                          disabled={loading}
                          className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-11 text-xs text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                        />

                        {/* SHOW / HIDE PASSWORD */}
                        <button
                          type="button"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                          disabled={loading}
                          className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed"
                        >
                          {showPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>

                      </div>

                    </div>

                    {/* SIGN IN */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-11 w-full rounded-xl bg-gray-950 text-xs font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-gray-950"
                    >
                      {loading
                        ? "Signing in..."
                        : "Sign in"}
                    </button>

                  </form>

                  {/* DIVIDER */}
                  <div className="my-4 flex items-center gap-3">

                    <div className="h-px flex-1 bg-gray-200" />

                    <span className="text-[10px] font-bold text-gray-400">
                      OR
                    </span>

                    <div className="h-px flex-1 bg-gray-200" />

                  </div>

                  {/* CONTINUE EXPLORING */}
                  <Link
                    href="/"
                    className="flex h-10 w-full items-center justify-center rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                  >
                    Continue exploring
                  </Link>

                  {/* SIGN UP */}
                  <div className="mt-4 text-center text-xs text-gray-500">

                    Don't have an account?{" "}

                    <Link
                      href="/user/sign-up"
                      className="font-black text-green-600 transition hover:text-green-700"
                    >
                      Sign up
                    </Link>

                  </div>

                </div>

                {/* BOTTOM ACCENT */}
                <div className="h-1 bg-gradient-to-r from-green-700 via-green-500 to-emerald-400" />

              </div>

            </section>

          </div>

        </div>

        {/* BOTTOM TEXT */}
        <div className="mx-auto hidden max-w-7xl px-5 pb-4 sm:px-8 lg:block lg:px-10">

          <div className="flex items-center justify-between text-[11px] text-white/50">

            <p>
              © 2026 DAR DISCOVER
            </p>

            <p>
              Your city. Your adventure.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}