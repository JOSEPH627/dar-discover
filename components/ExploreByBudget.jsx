"use client";

import {
  Wallet,
  ArrowRight,
  Check,
} from "lucide-react";

import { useState } from "react";

const budgets = [
  {
    title: "Under TSh 10K",
    description:
      "Affordable places and experiences for every day.",
    range: "Below 10,000",
    color: "from-green-50 to-emerald-100",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "TSh 10K – 30K",
    description:
      "Great experiences without spending too much.",
    range: "10,000 – 30,000",
    color: "from-blue-50 to-cyan-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "TSh 30K – 50K",
    description:
      "Premium experiences worth treating yourself to.",
    range: "30,000 – 50,000",
    color: "from-purple-50 to-violet-100",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "TSh 50K+",
    description:
      "Luxury stays, adventures and unforgettable escapes.",
    range: "50,000+",
    color: "from-orange-50 to-amber-100",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

export default function ExploreByBudget() {
  const [activeBudget, setActiveBudget] = useState(null);

  function handleBudgetClick(index) {
    setActiveBudget(index);
  }

  return (
    <section className="py-8 sm:py-10 md:py-12">
      {/* Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Wallet
              size={15}
              className="text-green-600"
            />

            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-green-600">
              Find your budget
            </p>
          </div>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl md:text-4xl">
            Explore by budget
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Discover places and experiences that match how much
            you want to spend.
          </p>
        </div>

        {/* Clear selection */}
        {activeBudget !== null && (
          <button
            type="button"
            onClick={() => setActiveBudget(null)}
            className="self-start rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-600 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700 sm:self-auto"
          >
            Clear selection
          </button>
        )}
      </div>

      {/* Budget cards */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {budgets.map((budget, index) => {
          const activeCard = activeBudget === index;

          return (
            <button
              key={budget.title}
              type="button"
              onClick={() => handleBudgetClick(index)}
              className={`group relative overflow-hidden rounded-3xl border p-5 text-left transition duration-300 sm:p-6 ${
                activeCard
                  ? "border-green-300 bg-gradient-to-br " +
                    budget.color +
                    " shadow-lg shadow-green-100"
                  : "border-gray-200 bg-white hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
              }`}
            >
              {/* Decorative circle */}
              <div
                className={`absolute -right-10 -top-10 h-28 w-28 rounded-full transition duration-300 ${
                  activeCard
                    ? "bg-white/40"
                    : "bg-gray-50 group-hover:bg-green-50"
                }`}
              />

              {/* Icon */}
              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${
                  activeCard
                    ? "bg-white shadow-sm"
                    : budget.iconBg
                }`}
              >
                <Wallet
                  size={20}
                  className={
                    activeCard
                      ? "text-green-600"
                      : budget.iconColor
                  }
                />
              </div>

              {/* Content */}
              <div className="relative mt-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-black text-gray-950">
                    {budget.title}
                  </h3>

                  {activeCard && (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                      <Check
                        size={14}
                        strokeWidth={3}
                      />
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {budget.description}
                </p>

                {/* Price range */}
                <div className="mt-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-black ${
                      activeCard
                        ? "bg-white/80 text-gray-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {budget.range} TSh
                  </span>
                </div>

                {/* Explore */}
                <div
                  className={`mt-5 flex items-center gap-2 text-sm font-black transition ${
                    activeCard
                      ? "text-green-700"
                      : "text-gray-600 group-hover:text-green-600"
                  }`}
                >
                  Explore options

                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Helper text */}
      <p className="mt-1 text-center text-[11px] font-medium text-gray-400">
        Choose a budget to explore experiences within your range
      </p>
    </section>
  );
}