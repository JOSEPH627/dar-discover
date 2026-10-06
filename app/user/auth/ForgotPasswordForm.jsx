"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  ArrowRight,
  CheckCircle2,
  Compass,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Something went wrong. Please try again."
        );
        return;
      }

      /*
       * During local development the API returns the reset URL.
       * We keep it out of the UI and log it in the browser console
       * only for testing.
       */
      if (data.resetUrl) {
        console.log("PASSWORD RESET URL:", data.resetUrl);
      }

      setSubmitted(true);
    } catch (error) {
      console.error("FORGOT_PASSWORD_ERROR:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-950">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85")',
        }}
      />

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-green-950/40" />

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen">

        {/* HEADER */}
        <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">

          {/* LOGO */}
          <Link
            href="/"
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
          </Link>

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
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 pb-10 pt-5 sm:px-8">

          <div className="w-full max-w-md">

            {/* CARD */}
            <div className="overflow-hidden rounded-[30px] border border-white/30 bg-white/95 shadow-2xl backdrop-blur-xl">

              <div className="p-6 sm:p-9">

                {!submitted ? (
                  <>
                    {/* ICON */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                      <Compass size={27} />
                    </div>

                    {/* HEADING */}
                    <div className="mt-6">

                      <h1 className="text-3xl font-black tracking-tight text-gray-950">
                        Forgot your password?
                      </h1>

                      <p className="mt-3 text-sm leading-6 text-gray-500">
                        No worries. Enter the email address connected
                        to your DAR DISCOVER account and we'll help you
                        get back in.
                      </p>

                    </div>

                    {/* FORM */}
                    <form
                      onSubmit={handleSubmit}
                      className="mt-7 space-y-5"
                    >

                      {/* EMAIL */}
                      <div>

                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-bold text-gray-800"
                        >
                          Email
                        </label>

                        <div className="relative">

                          <Mail
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                            disabled={loading}
                            className="h-13 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                          />

                        </div>

                      </div>

                      {/* ERROR */}
                      {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                          <p className="text-sm font-medium leading-5 text-red-600">
                            {error}
                          </p>
                        </div>
                      )}

                      {/* SUBMIT */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gray-950 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-gray-950"
                      >
                        {loading ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send reset link
                            <ArrowRight size={17} />
                          </>
                        )}
                      </button>

                    </form>

                    {/* BACK TO SIGN IN */}
                    <div className="mt-7 text-center">

                      <Link
                        href="/user/sign-in"
                        className="text-sm font-bold text-green-600 transition hover:text-green-700"
                      >
                        Back to sign in
                      </Link>

                    </div>
                  </>
                ) : (
                  <>
                    {/* SUCCESS ICON */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                      <CheckCircle2 size={28} />
                    </div>

                    {/* SUCCESS HEADING */}
                    <div className="mt-6">

                      <h1 className="text-3xl font-black tracking-tight text-gray-950">
                        Check your email
                      </h1>

                      <p className="mt-3 text-sm leading-6 text-gray-500">
                        If an account exists for{" "}
                        <span className="font-bold text-gray-800">
                          {email}
                        </span>
                        , you'll receive instructions to reset your
                        password.
                      </p>

                    </div>

                    {/* INFO BOX */}
                    <div className="mt-6 rounded-2xl bg-gray-50 p-4">

                      <p className="text-xs leading-5 text-gray-500">
                        Didn't receive the email? Check your spam or
                        junk folder. You can also try again with the
                        correct email address.
                      </p>

                    </div>

                    {/* ACTIONS */}
                    <div className="mt-6 space-y-3">

                      <Link
                        href="/user/sign-in"
                        className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-950 text-sm font-black text-white transition hover:bg-green-600"
                      >
                        Back to sign in
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setError("");
                        }}
                        className="h-12 w-full rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                      >
                        Try another email
                      </button>

                    </div>
                  </>
                )}

              </div>

              {/* BOTTOM ACCENT */}
              <div className="h-1.5 bg-gradient-to-r from-green-700 via-green-500 to-emerald-400" />

            </div>

            {/* FOOTER */}
            <p className="mt-6 text-center text-xs leading-5 text-white/50">
              © 2026 DAR DISCOVER · Your city. Your adventure.
            </p>

          </div>
        </div>

      </div>
    </main>
  );
}