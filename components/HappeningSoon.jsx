"use client";

import {
  CalendarDays,
  Clock3,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Calendar,
} from "lucide-react";

import { useMemo, useRef, useState } from "react";

/*
|--------------------------------------------------------------------------
| Helper functions
|--------------------------------------------------------------------------
*/

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDateFromOffset(offset) {
  const date = new Date();

  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + offset);

  return date;
}

function getShortDay(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(date);
}

function getMonthDay(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

/*
|--------------------------------------------------------------------------
| Demo events
|
| Event dates are generated from today's date so the UI keeps working
| regardless of the current day.
|--------------------------------------------------------------------------
*/

const today = getDateFromOffset(0);
const tomorrow = getDateFromOffset(1);
const day2 = getDateFromOffset(2);
const day3 = getDateFromOffset(3);
const day4 = getDateFromOffset(4);
const day5 = getDateFromOffset(5);
const day6 = getDateFromOffset(6);

const events = [
  {
    date: formatDate(today),
    title: "Full Moon Beach Music Festival",
    category: "Music & Beach",
    time: "7:00 PM",
    location: "Coco Beach",
    price: "TSh 20,000",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=85",
  },
  {
    date: formatDate(today),
    title: "Acoustic Night Live",
    category: "Live Music",
    time: "8:30 PM",
    location: "Oysterbay",
    price: "Free Entry",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=85",
  },
  {
    date: formatDate(today),
    title: "Sunset Rooftop Sessions",
    category: "Entertainment",
    time: "5:30 PM",
    location: "Masaki",
    price: "TSh 25,000",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85",
  },
  {
    date: formatDate(today),
    title: "Kariakoo Food Experience",
    category: "Food",
    time: "6:00 PM",
    location: "Kariakoo",
    price: "TSh 15,000",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85",
  },

  {
    date: formatDate(tomorrow),
    title: "Dar Food & Culture Night",
    category: "Food & Culture",
    time: "6:00 PM",
    location: "Masaki",
    price: "TSh 15,000",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=85",
  },
  {
    date: formatDate(tomorrow),
    title: "Live Jazz Evening",
    category: "Live Music",
    time: "8:00 PM",
    location: "Oysterbay",
    price: "TSh 20,000",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1000&q=85",
  },
  {
    date: formatDate(tomorrow),
    title: "City Night Walk",
    category: "Experience",
    time: "7:00 PM",
    location: "Posta",
    price: "TSh 10,000",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=85",
  },

  {
    date: formatDate(day2),
    title: "Dar Creative Market",
    category: "Shopping",
    time: "10:00 AM",
    location: "Masaki",
    price: "Free Entry",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85",
  },
  {
    date: formatDate(day2),
    title: "Sunset Boat Experience",
    category: "Adventure",
    time: "5:00 PM",
    location: "Slipway",
    price: "TSh 35,000",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85",
  },

  {
    date: formatDate(day3),
    title: "Dar Street Food Night",
    category: "Food",
    time: "6:30 PM",
    location: "Kariakoo",
    price: "TSh 18,000",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85",
  },
  {
    date: formatDate(day3),
    title: "Live Band Friday",
    category: "Live Music",
    time: "8:00 PM",
    location: "Masaki",
    price: "TSh 25,000",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1000&q=85",
  },

  {
    date: formatDate(day4),
    title: "Weekend Boat Adventure",
    category: "Adventure",
    time: "9:00 AM",
    location: "Slipway",
    price: "TSh 45,000",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    date: formatDate(day4),
    title: "Beach Sunset Party",
    category: "Beach Party",
    time: "4:00 PM",
    location: "Mbezi Beach",
    price: "TSh 20,000",
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1000&q=85",
  },

  {
    date: formatDate(day5),
    title: "Sunday Beach Picnic",
    category: "Outdoor",
    time: "11:00 AM",
    location: "Mbezi Beach",
    price: "TSh 18,000",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
  },

  {
    date: formatDate(day6),
    title: "Dar Culture Experience",
    category: "Culture",
    time: "3:00 PM",
    location: "Village Museum",
    price: "TSh 12,000",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function HappeningSoon() {
  /*
  |--------------------------------------------------------------------------
  | Selected date
  |--------------------------------------------------------------------------
  */

  const [selectedDate, setSelectedDate] = useState(
    formatDate(today)
  );

  const sliderRef = useRef(null);

  /*
  |--------------------------------------------------------------------------
  | Calendar input reference
  |--------------------------------------------------------------------------
  */

  const calendarRef = useRef(null);

  /*
  |--------------------------------------------------------------------------
  | Quick date buttons
  |--------------------------------------------------------------------------
  */

  const quickDates = useMemo(() => {
    return [
      {
        label: "Today",
        date: today,
      },
      {
        label: "Tomorrow",
        date: tomorrow,
      },
    ];
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Filter events according to selected date
  |--------------------------------------------------------------------------
  */

  const filteredEvents = useMemo(() => {
    return events.filter(
      (event) => event.date === selectedDate
    );
  }, [selectedDate]);

  /*
  |--------------------------------------------------------------------------
  | Slider
  |--------------------------------------------------------------------------
  */

  function slide(direction) {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -390 : 390,
      behavior: "smooth",
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Change selected date
  |--------------------------------------------------------------------------
  */

  function changeDate(date) {
    setSelectedDate(date);

    setTimeout(() => {
      sliderRef.current?.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }, 50);
  }

  /*
  |--------------------------------------------------------------------------
  | Open calendar
  |--------------------------------------------------------------------------
  */

  function openCalendar() {
    if (!calendarRef.current) return;

    if (typeof calendarRef.current.showPicker === "function") {
      calendarRef.current.showPicker();
    } else {
      calendarRef.current.focus();
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Calendar date selected
  |--------------------------------------------------------------------------
  */

  function handleCalendarChange(event) {
    const date = event.target.value;

    if (!date) return;

    changeDate(date);
  }

  /*
  |--------------------------------------------------------------------------
  | Check whether quick date is active
  |--------------------------------------------------------------------------
  */

  function isSelected(date) {
    return selectedDate === formatDate(date);
  }

  /*
  |--------------------------------------------------------------------------
  | Display selected date
  |--------------------------------------------------------------------------
  */

  const selectedDateObject = new Date(`${selectedDate}T00:00:00`);

  const selectedDateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(selectedDateObject);

  return (
    <section className="py-14 sm:py-16 md:py-20">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays
              size={15}
              className="text-green-600"
            />

            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-green-600">
              Events
            </p>
          </div>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl md:text-4xl">
            Happening soon
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Discover what's happening around Dar es Salaam.
          </p>
        </div>

        {/* Date filters */}
        <div className="flex w-full items-center gap-2">
          {/* Today */}
          {quickDates.map((item) => {
            const active = isSelected(item.date);

            return (
              <button
                key={item.label}
                type="button"
                onClick={() =>
                  changeDate(formatDate(item.date))
                }
                className={`flex min-w-[105px] flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 transition sm:flex-none ${
                  active
                    ? "border-green-500 bg-green-500 text-white shadow-lg shadow-green-100"
                    : "border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-wide opacity-70">
                    {getShortDay(item.date)}
                  </p>

                  <p className="text-sm font-black">
                    {item.label}
                  </p>
                </div>
              </button>
            );
          })}

          {/* Calendar */}
          <div className="relative">
            <input
              ref={calendarRef}
              type="date"
              value={selectedDate}
              onChange={handleCalendarChange}
              min={formatDate(today)}
              className="pointer-events-none absolute h-0 w-0 opacity-0"
              aria-label="Choose event date"
            />

            <button
              type="button"
              onClick={openCalendar}
              aria-label="Choose another date"
              className={`flex h-[58px] w-[58px] items-center justify-center rounded-2xl border transition ${
                !isSelected(today) &&
                !isSelected(tomorrow)
                  ? "border-green-500 bg-green-500 text-white shadow-lg shadow-green-100"
                  : "border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <Calendar size={21} />
            </button>
          </div>
        </div>
      </div>

      {/* Selected date information */}
      <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-green-600">
            Selected date
          </p>

          <h3 className="mt-1 text-lg font-black text-gray-950">
            {selectedDateLabel}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
          <CalendarDays size={16} />

          {filteredEvents.length}{" "}
          {filteredEvents.length === 1 ? "event" : "events"}
        </div>
      </div>

      {/* Slider arrows */}
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => slide("left")}
          aria-label="Previous events"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
        >
          <ChevronLeft size={17} />
        </button>

        <button
          type="button"
          onClick={() => slide("right")}
          aria-label="Next events"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      {/* Events slider */}
      {filteredEvents.length > 0 ? (
        <div
          ref={sliderRef}
          className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:gap-5"
        >
          {filteredEvents.map((event) => (
            <article
              key={`${event.date}-${event.title}`}
              className="group min-w-[290px] snap-start overflow-hidden rounded-[26px] border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-[330px] md:min-w-[360px]"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

                {/* Category */}
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-gray-900 backdrop-blur">
                  {event.category}
                </div>

                {/* Time */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-bold text-white">
                  <Clock3 size={14} />
                  {event.time}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-black text-gray-950">
                  {event.title}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={14} />
                  {event.location}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="font-black text-green-600">
                    {event.price}
                  </span>

                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm font-bold text-gray-600 transition hover:text-green-600"
                  >
                    View event
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* No events */
        <div className="mt-4 rounded-[26px] border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
            <CalendarDays size={24} />
          </div>

          <h3 className="mt-4 text-lg font-black text-gray-950">
            No events on this date
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Try choosing another date from the calendar to
            discover upcoming events around Dar.
          </p>

          <button
            type="button"
            onClick={() => changeDate(formatDate(today))}
            className="mt-5 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white transition hover:bg-green-600"
          >
            Back to today
          </button>
        </div>
      )}

      {/* Helper */}
      {filteredEvents.length > 0 && (
        <p className="mt-1 text-center text-[11px] text-gray-400">
          Swipe or use the arrows to see more events
        </p>
      )}
    </section>
  );
}