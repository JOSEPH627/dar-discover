"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

const backgroundImages = [
  "/images/auth/dar-1.jpg",
  "/images/auth/dar-2.jpg",
  "/images/auth/dar-3.jpg",
];

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();

  const [token, setToken] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const resetToken = searchParams.get("token");

    if (resetToken) {
      setToken(resetToken);
    }
  }, [searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const passwordRequirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Unable to reset your password. Please try again."
        );
        setLoading(false);
        return;
      }

      setSuccess(
        data.message || "Your password has been reset successfully."
      );

      setPassword("");
      setConfirmPassword("");

      /*
       * Redirect to the correct sign-in route.
       *
       * We use window.location.href instead of router.push()
       * so the browser performs a fresh navigation.
       */
      setTimeout(() => {
        window.location.href = "/user/sign-in";
      }, 1800);
    } catch (error) {
      console.error("RESET_PASSWORD_CLIENT_ERROR:", error);

      setError(
        "Something went wrong. Please check your connection and try again."
      );

      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f8f6]">
      {/* Background Images */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url("${image}")`,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/70 via-black/30 to-orange-950/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-black text-green-700 shadow-lg">
                D
              </div>

              <div className="text-left leading-none">
                <div className="text-lg font-black tracking-tight">
                  DAR
                </div>

                <div className="text-[10px] font-bold tracking-[0.25em] text-orange-300">
                  DISCOVER
                </div>
              </div>
            </Link>
          </div>

          {/* Card */}
          <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-xl">
            <div className="px-6 py-7 sm:px-8">
              {/* Header */}
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <LockKeyhole size={27} />
                </div>

                <h1 className="text-2xl font-black tracking-tight text-gray-900">
                  Reset your password
                </h1>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  Create a new password for your DAR DISCOVER account.
                </p>
              </div>

              {/* Success */}
              {success && (
                <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-green-600"
                    />

                    <div>
                      <p className="text-sm font-bold text-green-800">
                        Password reset successful
                      </p>

                      <p className="mt-1 text-xs leading-5 text-green-700">
                        {success}
                      </p>

                      <p className="mt-2 text-xs font-semibold text-green-600">
                        Redirecting you to sign in...
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      size={20}
                      className="mt-0.5 shrink-0 text-red-600"
                    />

                    <p className="text-sm font-semibold leading-5 text-red-700">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* New Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold text-gray-800"
                  >
                    New password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading || !!success}
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={loading || !!success}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 transition hover:text-gray-700 disabled:cursor-not-allowed"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-bold text-gray-800"
                  >
                    Confirm new password
                  </label>

                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      disabled={loading || !!success}
                      placeholder="Confirm your new password"
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      disabled={loading || !!success}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 transition hover:text-gray-700 disabled:cursor-not-allowed"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <ShieldCheck
                      size={17}
                      className="text-green-600"
                    />

                    <p className="text-xs font-black uppercase tracking-wide text-gray-700">
                      Password requirements
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Requirement
                      valid={passwordRequirements.length}
                      text="8+ characters"
                    />

                    <Requirement
                      valid={passwordRequirements.uppercase}
                      text="Uppercase letter"
                    />

                    <Requirement
                      valid={passwordRequirements.lowercase}
                      text="Lowercase letter"
                    />

                    <Requirement
                      valid={passwordRequirements.number}
                      text="Number"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !!success}
                  className="flex w-full items-center justify-center rounded-xl bg-green-700 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:bg-green-800 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Resetting password...
                    </span>
                  ) : success ? (
                    "Password reset successfully"
                  ) : (
                    "Reset password"
                  )}
                </button>
              </form>

              {/* Back to Sign In */}
              {!success && (
                <div className="mt-6 text-center">
                  <Link
                    href="/user/sign-in"
                    className="inline-flex items-center gap-1.5 text-sm font-black text-green-600 transition hover:text-green-700"
                  >
                    <ArrowLeft size={15} />
                    Back to sign in
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <p className="mt-5 text-center text-xs font-medium text-white/70">
            © {new Date().getFullYear()} DAR DISCOVER. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}

function Requirement({ valid, text }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-black ${
          valid
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-400"
        }`}
      >
        {valid ? "✓" : ""}
      </span>

      <span
        className={`text-[11px] font-semibold ${
          valid ? "text-green-700" : "text-gray-500"
        }`}
      >
        {text}
      </span>
    </div>
  );
}