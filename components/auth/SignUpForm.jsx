
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  UserRound,
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

export default function SignUpPage() {
  const [currentImage, setCurrentImage] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((current) => {
        return (current + 1) % backgroundImages.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Registration itaunganishwa hapa baadaye.
    console.log({
      name,
      email,
      password,
      confirmPassword,
    });
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

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/30" />

        {/* TOP FADE */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
      </div>

      {/* PAGE CONTENT */}
      <div className="relative z-10 min-h-screen">

        {/* HEADER */}
        <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">

          {/* LOGO */}
          <div
          
            className="flex items-center gap-3"
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
        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 pb-10 pt-4 sm:px-8 lg:px-10">

          <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_410px]">

            {/* LEFT SIDE */}
            <section className="hidden max-w-xl text-white lg:block">

              {/* LABEL */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <Compass size={15} />
                Discover Dar
              </div>

              {/* TITLE */}
              <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
                Start your
                <br />

                <span className="text-green-400">
                  {activeBackground.title}
                </span>
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-6 max-w-lg text-base leading-7 text-white/75 xl:text-lg">
                {activeBackground.description}
              </p>

              {/* SLIDE INDICATORS */}
              <div className="mt-9 flex items-center gap-2">

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

              {/* CURRENT SLIDE */}
              <div className="mt-5 text-sm font-semibold text-white/60">
                {currentImage + 1} / {backgroundImages.length}

                <span className="mx-2">
                  •
                </span>

                {activeBackground.title}
              </div>

            </section>

            {/* SIGN UP CARD */}
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
                      Create your account
                    </h1>

                    <p className="mt-1.5 text-xs leading-5 text-gray-500">
                      Join DAR DISCOVER and start exploring Dar es Salaam.
                    </p>

                  </div>

                  {/* DESKTOP HEADING */}
                  <div className="hidden lg:block">

                    <h2 className="text-2xl font-black tracking-tight text-gray-950">
                      Create your account
                    </h2>

                    <p className="mt-1.5 text-xs leading-5 text-gray-500">
                      Join DAR DISCOVER and start exploring Dar es Salaam.
                    </p>

                  </div>

                  {/* FORM */}
                  <form
                    onSubmit={handleSubmit}
                    className="mt-5 space-y-3"
                  >

                    {/* FULL NAME */}
                    <div>

                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-xs font-bold text-gray-800"
                      >
                        Full name
                      </label>

                      <div className="relative">

                        <UserRound
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Your full name"
                          value={name}
                          onChange={(event) =>
                            setName(event.target.value)
                          }
                          required
                          className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                        />

                      </div>

                    </div>

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
                          onChange={(event) =>
                            setEmail(event.target.value)
                          }
                          required
                          className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                        />

                      </div>

                    </div>

                    {/* PASSWORD */}
                    <div>

                      <label
                        htmlFor="password"
                        className="mb-1.5 block text-xs font-bold text-gray-800"
                      >
                        Password
                      </label>

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
                          autoComplete="new-password"
                          placeholder="Create a password"
                          value={password}
                          onChange={(event) =>
                            setPassword(event.target.value)
                          }
                          required
                          minLength={8}
                          className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-11 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                        />

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
                          className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-800"
                        >
                          {showPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>

                      </div>

                      <p className="mt-1 text-[11px] text-gray-400">
                        Use at least 8 characters.
                      </p>

                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div>

                      <label
                        htmlFor="confirmPassword"
                        className="mb-1.5 block text-xs font-bold text-gray-800"
                      >
                        Confirm password
                      </label>

                      <div className="relative">

                        <LockKeyhole
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          autoComplete="new-password"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
                          required
                          minLength={8}
                          className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-11 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                        />

                        <button
                          type="button"
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          onClick={() =>
                            setShowConfirmPassword(
                              !showConfirmPassword
                            )
                          }
                          className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-800"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>

                      </div>

                    </div>

                    {/* TERMS */}
                    <div className="flex items-start gap-2.5 pt-0.5">

                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className="mt-1 h-3.5 w-3.5 rounded border-gray-300 text-green-600 accent-green-600"
                      />

                      <label
                        htmlFor="terms"
                        className="text-[11px] leading-4.5 text-gray-500"
                      >
                        I agree to the DAR DISCOVER{" "}
                        <span className="font-semibold text-gray-700">
                          Terms of Service
                        </span>{" "}
                        and{" "}
                        <span className="font-semibold text-gray-700">
                          Privacy Policy
                        </span>
                        .
                      </label>

                    </div>

                    {/* CREATE ACCOUNT */}
                    <button
                      type="submit"
                      className="h-10 w-full rounded-xl bg-gray-950 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-xl active:translate-y-0"
                    >
                      Create account
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

                  {/* SIGN IN */}
                  <div className="mt-4 text-center text-xs text-gray-500">

                    Already have an account?{" "}

                    <Link
                      href="/sign-in"
                      className="font-black text-green-600 transition hover:text-green-700"
                    >
                      Sign in
                    </Link>

                  </div>

                </div>

                {/* BOTTOM ACCENT */}
                <div className="h-1 bg-gradient-to-r from-green-700 via-green-500 to-emerald-400" />

              </div>

            </section>

          </div>
        </div>

        {/* FOOTER */}
        <div className="mx-auto hidden max-w-7xl px-5 pb-6 sm:px-8 lg:block lg:px-10">
          <div className="flex items-center justify-between text-xs text-white/50">

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
