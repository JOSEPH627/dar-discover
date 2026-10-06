"use client";

import { useState } from "react";

import {
  X,
  Heart,
  CalendarDays,
  MessageCircle,
} from "lucide-react";

export default function GuestActionButton({
  action = "book",
  children,
  className = "",
}) {
  const [showPopup, setShowPopup] = useState(false);

  const messages = {
    save: {
      title: "Sign in to save",
      text: "Please sign in to save this place to your favourites.",
      Icon: Heart,
    },

    book: {
      title: "Sign in to book",
      text: "Please sign in to book this experience.",
      Icon: CalendarDays,
    },

    review: {
      title: "Sign in to review",
      text: "Please sign in to write a review for this place.",
      Icon: MessageCircle,
    },
  };

  const currentMessage =
    messages[action] || messages.book;

  const Icon = currentMessage.Icon;

  function openPopup() {
    setShowPopup(true);
  }

  function closePopup() {
    setShowPopup(false);
  }

  return (
    <>
      {/* ACTION BUTTON */}
      <button
        type="button"
        onClick={openPopup}
        className={className}
      >
        {children}
      </button>

      {/* POPUP */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={closePopup}
        >
          <div
            className="relative w-full max-w-sm rounded-[28px] bg-white p-6 shadow-2xl"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={closePopup}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
            >
              <X size={17} />
            </button>

            {/* ICON */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <Icon size={24} />
            </div>

            {/* TITLE */}
            <h2 className="mt-5 text-xl font-black tracking-tight text-gray-950">
              {currentMessage.title}
            </h2>

            {/* MESSAGE */}
            <p className="mt-3 text-sm leading-6 text-gray-500">
              {currentMessage.text}
            </p>

            {/* GOT IT */}
            <button
              type="button"
              onClick={closePopup}
              className="mt-6 w-full rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-black text-white transition hover:bg-gray-800"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}