"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserCircle,
  Mail,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function EditProfileForm({ user }) {
  const router = useRouter();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

async function handleSubmit(event) {
  event.preventDefault();

  setLoading(true);
  setSuccess("");
  setError("");

  try {
    const response = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(
        data.message || "Failed to update your profile."
      );

      setLoading(false);
      return;
    }

    // Show success message
    setSuccess("Profile updated successfully.");

    // Wait briefly so the user can see the success message
    setTimeout(() => {
      router.push("/user/profile");
      router.refresh();
    }, 1200);

  } catch (error) {
    console.error("UPDATE_PROFILE_ERROR:", error);

    setError(
      "Something went wrong. Please try again."
    );

    setLoading(false);
  }
}

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm"
    >

      {/* FORM HEADER */}
      <div className="border-b border-gray-100 px-6 py-5 md:px-8">

        <h2 className="text-lg font-black text-gray-900">
          Personal Details
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Keep your account information up to date.
        </p>

      </div>

      {/* FORM BODY */}
      <div className="space-y-6 px-6 py-6 md:px-8 md:py-8">

        {/* SUCCESS */}
        {success && (
          <div className="flex items-start gap-3 rounded-2xl border border-green-100 bg-green-50 px-4 py-4">

            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-green-700"
            />

            <p className="text-sm font-semibold text-green-800">
              {success}
            </p>

          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-4">

            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <p className="text-sm font-semibold text-red-700">
              {error}
            </p>

          </div>
        )}

        {/* NAME */}
        <div>

          <label
            htmlFor="name"
            className="mb-2 block text-sm font-black text-gray-800"
          >
            Full Name
          </label>

          <div className="relative">

            <UserCircle
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
              minLength={2}
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
              placeholder="Enter your full name"
            />

          </div>

        </div>

        {/* EMAIL */}
        <div>

          <label
            htmlFor="email"
            className="mb-2 block text-sm font-black text-gray-800"
          >
            Email Address
          </label>

          <div className="relative">

            <Mail
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
              placeholder="Enter your email"
            />

          </div>

        </div>

        {/* NOTE */}
        <div className="rounded-2xl bg-gray-50 px-4 py-4">

          <p className="text-xs leading-5 text-gray-500">
            Your email address is used to sign in to
            your DAR DISCOVER account and receive
            important account notifications.
          </p>

        </div>

      </div>

      {/* ACTIONS */}
      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-6 py-5 sm:flex-row sm:justify-end md:px-8">

        <button
          type="button"
          onClick={() => router.push("/user/profile")}
          disabled={loading}
          className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2
                size={17}
                className="animate-spin"
              />
              Saving...
            </>
          ) : (
            <>
              <Save size={17} />
              Save Changes
            </>
          )}
        </button>

      </div>

    </form>
  );
}