"use client";

import {
  ArrowRight,
  Sparkles,
  Clock3,
  ChevronLeft,
  ChevronRight,
  Percent,
} from "lucide-react";

import { useRef } from "react";

const offers = [
  {
    title: "Sinda Island Day Trip",
    subtitle: "Boat ride + snorkeling + lunch",
    oldPrice: "TSh 50,000",
    price: "TSh 40,000",
    discount: "20% OFF",
    expires: "Ends this weekend",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Sunset Boat Cruise",
    subtitle: "Golden hour cruise around Msasani",
    oldPrice: "TSh 45,000",
    price: "TSh 35,000",
    discount: "22% OFF",
    expires: "Limited seats",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Beach Weekend Escape",
    subtitle: "Relaxing beach experience for two",
    oldPrice: "TSh 90,000",
    price: "TSh 70,000",
    discount: "22% OFF",
    expires: "Ends Sunday",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Dar Food Tour",
    subtitle: "Taste the best local flavors",
    oldPrice: "TSh 25,000",
    price: "TSh 18,000",
    discount: "28% OFF",
    expires: "5 spots left",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Couples Staycation",
    subtitle: "One night + breakfast + dinner",
    oldPrice: "TSh 180,000",
    price: "TSh 145,000",
    discount: "19% OFF",
    expires: "This month",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function SpecialOffers() {
  const sliderRef = useRef(null);

  function slide(direction) {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -390 : 390,
      behavior: "smooth",
    });
  }

  return (
    <section className="border-t border-gray-100 py-14 sm:py-16 md:py-20">

      <div className="flex items-end justify-between gap-4">

        <div>
          <div className="flex items-center gap-2 text-green-600">
            <Sparkles size={15} />

            <span className="text-[11px] font-black uppercase tracking-[0.22em]">
              Special offers
            </span>
          </div>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl md:text-4xl">
            Deals worth discovering
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            More experiences. Better value.
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
        {offers.map((offer) => (
          <article
            key={offer.title}
            className="group min-w-[300px] snap-start overflow-hidden rounded-[26px] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:min-w-[350px] md:min-w-[380px]"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={offer.image}
                alt={offer.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-black text-white">
                <Percent size={12} />
                {offer.discount}
              </div>

              <div className="absolute bottom-4 left-4">
                <p className="text-xs font-semibold text-white/70">
                  {offer.subtitle}
                </p>

                <h3 className="mt-1 text-xl font-black text-white">
                  {offer.title}
                </h3>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-end gap-3">
                <span className="text-xl font-black text-green-600">
                  {offer.price}
                </span>

                <span className="text-sm text-gray-400 line-through">
                  {offer.oldPrice}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <Clock3 size={13} />
                {offer.expires}
              </div>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-black text-white hover:bg-green-600"
              >
                Book Now
                <ArrowRight size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-1 text-center text-[11px] text-gray-400">
        Swipe or use the arrows to discover more deals
      </p>
    </section>
  );
}