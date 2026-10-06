"use client";

import {
  Waves,
  Utensils,
  Music,
  Sparkles,
  BedDouble,
  Trophy,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useRef } from "react";

const categories = [
  {
    name: "Beaches",
    icon: Waves,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Food",
    icon: Utensils,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Events",
    icon: Music,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Experiences",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Stays",
    icon: BedDouble,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Sports",
    icon: Trophy,
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Nightlife",
    icon: Music,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=85",
  },
];

export default function Categories() {
  const sliderRef = useRef(null);

  function slide(direction) {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    });
  }

  function openCategory(category) {
    window.location.href =
      `/?category=${encodeURIComponent(category)}#near-you`;
  }

  return (
    <section className="overflow-hidden bg-white py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-green-600">
              Explore Dar
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl md:text-4xl">
              Browse by category
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Tap a category to discover places and experiences
              around Dar es Salaam.
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => slide("left")}
              aria-label="Previous categories"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-green-300 hover:bg-green-50 hover:text-green-700 sm:h-10 sm:w-10"
            >
              <ChevronLeft size={17} />
            </button>

            <button
              type="button"
              onClick={() => slide("right")}
              aria-label="Next categories"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-green-300 hover:bg-green-50 hover:text-green-700 sm:h-10 sm:w-10"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-5"
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => openCategory(category.name)}
                className="group relative min-w-[210px] snap-start overflow-hidden rounded-[26px] bg-gray-900 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-[235px] md:min-w-[250px] lg:min-w-[260px]"
              >
                <div className="relative h-[245px] sm:h-[265px]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-xl">
                    <Icon size={19} />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-black text-white">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-white/65">
                      Explore {category.name}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-1 text-center text-[11px] font-medium text-gray-400">
          Swipe or use the arrows to explore categories
        </p>
      </div>
    </section>
  );
}