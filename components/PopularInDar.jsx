"use client";

import {
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import { useRef } from "react";

const places = [
  {
    badge: "Top Rated",
    name: "Bongoyo Island Experience",
    location: "Bongoyo Island Sanctuary",
    rating: "4.9",
    price: "TSh 28,000",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=85",
  },
  {
    badge: "Trending",
    name: "Dar City Food Tour",
    location: "Kariakoo & City Center",
    rating: "4.7",
    price: "TSh 15,000",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1100&q=85",
  },
  {
    badge: "Popular",
    name: "Sunset Boat Cruise",
    location: "Msasani Peninsula",
    rating: "4.8",
    price: "TSh 35,000",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1100&q=85",
  },
  {
    badge: "Editor's Pick",
    name: "Village Museum Experience",
    location: "Makumbusho",
    rating: "4.6",
    price: "TSh 10,000",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1100&q=85",
  },
  {
    badge: "Must Visit",
    name: "Kivukoni Fish Market",
    location: "Kivukoni",
    rating: "4.5",
    price: "TSh 8,000",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1100&q=85",
  },
  {
    badge: "Local Favorite",
    name: "Mlimani City Experience",
    location: "Mlimani",
    rating: "4.6",
    price: "TSh 12,000",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1100&q=85",
  },
];

export default function PopularInDar() {
  const sliderRef = useRef(null);

  function slide(direction) {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -390 : 390,
      behavior: "smooth",
    });
  }

  return (
    <section className="overflow-hidden py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-green-600">
              What's popular
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl md:text-4xl">
              Popular in Dar
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Places people are discovering right now.
            </p>
          </div>

          {/* ALWAYS VISIBLE */}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => slide("left")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:border-green-300 hover:bg-green-50 hover:text-green-700 sm:h-10 sm:w-10"
            >
              <ChevronLeft size={17} />
            </button>

            <button
              type="button"
              onClick={() => slide("right")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:border-green-300 hover:bg-green-50 hover:text-green-700 sm:h-10 sm:w-10"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:gap-5"
        >
          {places.map((place) => (
            <article
              key={place.name}
              className="group min-w-[290px] snap-start overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-[330px] md:min-w-[360px]"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1.5 text-xs font-black text-white">
                  {place.badge}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-black text-white">
                    {place.name}
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={14} />
                  {place.location}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-1.5">
                    <Star
                      size={15}
                      fill="currentColor"
                      className="text-yellow-400"
                    />

                    <span className="text-sm font-black">
                      {place.rating}
                    </span>
                  </div>

                  <span className="font-black text-green-600">
                    {place.price}
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-4 flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-green-600"
                >
                  Explore place
                  <ArrowRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-1 text-center text-[11px] text-gray-400">
          Swipe or use the arrows to see more places
        </p>
      </div>
    </section>
  );
}