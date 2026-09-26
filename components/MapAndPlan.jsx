"use client";

import {
  Map,
  MapPin,
  Navigation,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  Clock3,
  Coffee,
  Sunset,
} from "lucide-react";

export default function MapAndPlan() {
  return (
    <section className="overflow-hidden bg-[#f7f8f6] py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-green-600">
            Explore the city
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl md:text-4xl">
            Explore Dar on the map
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Move around the city and discover areas, experiences
            and places worth visiting.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">

          {/* MAP */}
          <div className="relative h-[330px] overflow-hidden rounded-[28px] bg-gray-200 shadow-lg ring-1 ring-gray-200 sm:h-[370px] md:h-[400px]">

            <iframe
              title="Dar es Salaam city map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=39.235%2C-6.850%2C39.305%2C-6.775&layer=mapnik&marker=-6.816%2C39.280"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
            />

            {/* Floating location */}
            <div className="absolute left-3 top-3 rounded-2xl border border-white/50 bg-white/95 px-3 py-2.5 shadow-lg backdrop-blur-xl sm:left-4 sm:top-4 sm:px-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <MapPin size={15} />
                </div>

                <div>
                  <p className="text-xs font-black text-gray-950">
                    Dar City Centre
                  </p>

                  <p className="text-[10px] text-gray-500">
                    Posta · Kariakoo · Kivukoni
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute right-3 top-3 rounded-xl bg-white/95 p-1 shadow-lg backdrop-blur-xl sm:right-4 sm:top-4">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
            </div>

            {/* Open */}
            <a
              href="https://www.openstreetmap.org/?mlat=-6.816&mlon=39.280#map=13/-6.816/39.280"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl bg-gray-950 px-3.5 py-2.5 text-[11px] font-black text-white shadow-xl transition hover:bg-green-600 sm:bottom-4 sm:right-4"
            >
              <Map size={14} />
              Open map
            </a>
          </div>

          {/* PLAN CARD */}
          <div className="relative overflow-hidden rounded-[28px] bg-gray-950 p-6 text-white shadow-lg sm:p-7">

            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-green-500/20 blur-3xl" />

            <div className="relative">

              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-500/15 text-green-400">
                  <Sparkles size={20} />
                </div>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white/60">
                  1 DAY
                </span>
              </div>

              <p className="mt-7 text-[11px] font-black uppercase tracking-[0.2em] text-green-400">
                Plan your day
              </p>

              <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                Your perfect Dar day
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/55">
                Build a simple itinerary from morning to evening.
              </p>

              <div className="mt-6 space-y-2.5">

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-400/10 text-orange-300">
                    <Sunset size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white/45">
                      Morning
                    </p>
                    <p className="text-sm font-bold text-white/85">
                      Beach & breakfast
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-400/10 text-green-300">
                    <Coffee size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white/45">
                      Afternoon
                    </p>
                    <p className="text-sm font-bold text-white/85">
                      Food & city discovery
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                    <Clock3 size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white/45">
                      Evening
                    </p>
                    <p className="text-sm font-bold text-white/85">
                      Sunset & live event
                    </p>
                  </div>
                </div>

              </div>

              <button
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3.5 text-sm font-black text-white transition hover:bg-green-400"
              >
                Build my day
                <ArrowRight size={15} />
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}