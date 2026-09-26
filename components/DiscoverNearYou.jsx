"use client";

import {
  Heart,
  Navigation,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import { useEffect, useMemo, useRef, useState } from "react";

const places = [
  {
    name: "Sunset Beach Experience",
    category: "Beaches",
    categoryLabel: "Beach & Water",
    distance: "2.4 km",
    rating: "4.8",
    price: "TSh 25,000",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Mbudya Marine Reserve",
    category: "Beaches",
    categoryLabel: "Islands & Snorkeling",
    distance: "5.1 km",
    rating: "4.9",
    price: "TSh 35,000",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Slipway Waterfront Dining",
    category: "Food",
    categoryLabel: "Food & Lounge",
    distance: "1.8 km",
    rating: "4.7",
    price: "TSh 40,000",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Kambako Beach Resort",
    category: "Stays",
    categoryLabel: "Resorts & Stays",
    distance: "8.2 km",
    rating: "4.6",
    price: "TSh 60,000",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Coco Beach Sunset",
    category: "Beaches",
    categoryLabel: "Beach & Relax",
    distance: "3.7 km",
    rating: "4.8",
    price: "TSh 15,000",
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Masaki Food Street",
    category: "Food",
    categoryLabel: "Food & Dining",
    distance: "4.2 km",
    rating: "4.7",
    price: "TSh 20,000",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Dar City Live Night",
    category: "Events",
    categoryLabel: "Live Event",
    distance: "3.1 km",
    rating: "4.8",
    price: "TSh 20,000",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Dar Adventure Experience",
    category: "Experiences",
    categoryLabel: "Adventure",
    distance: "6.5 km",
    rating: "4.9",
    price: "TSh 45,000",
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function DiscoverNearYou() {
  const sliderRef = useRef(null);
  const [saved, setSaved] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    if (category) {
      setSelectedCategory(category);
    }
  }, []);

  const filteredPlaces = useMemo(() => {
    if (!selectedCategory) return places;

    return places.filter(
      (place) => place.category === selectedCategory
    );
  }, [selectedCategory]);

  function slide(direction) {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -390 : 390,
      behavior: "smooth",
    });
  }

  function toggleSaved(name) {
    setSaved((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  }

  return (
    <section id="near-you" className="overflow-hidden py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Navigation size={15} className="text-green-600" />

              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-green-600">
                Near you
              </p>
            </div>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl md:text-4xl">
              {selectedCategory
                ? `${selectedCategory} near you`
                : "Discover near you"}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {selectedCategory
                ? `Explore ${selectedCategory.toLowerCase()} around Dar es Salaam.`
                : "Great places to explore around Dar es Salaam."}
            </p>
          </div>

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
          {filteredPlaces.map((place) => (
            <article
              key={place.name}
              className="group min-w-[290px] snap-start overflow-hidden rounded-[26px] border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-[325px] md:min-w-[350px]"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />

                <button
                  type="button"
                  onClick={() => toggleSaved(place.name)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg backdrop-blur"
                >
                  <Heart
                    size={18}
                    fill={
                      saved.includes(place.name)
                        ? "currentColor"
                        : "none"
                    }
                    className={
                      saved.includes(place.name)
                        ? "text-red-500"
                        : ""
                    }
                  />
                </button>

                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-gray-900">
                  {place.categoryLabel}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-black text-gray-950">
                  {place.name}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Navigation size={14} />
                    {place.distance}
                  </span>

                  <span className="flex items-center gap-1 text-sm font-bold">
                    <Star
                      size={14}
                      fill="currentColor"
                      className="text-yellow-400"
                    />
                    {place.rating}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="font-black text-green-600">
                    {place.price}
                  </span>

                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-green-600"
                  >
                    Explore
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-1 text-center text-[11px] text-gray-400">
          Swipe or use the arrows to see more
        </p>
      </div>
    </section>
  );
}