import {
  Globe,
  Send,
  Star,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white pb-24 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:px-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <a
              href="#"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-950 text-xl font-black text-white">
                D
              </div>

              <div className="text-lg font-extrabold text-gray-950">
                DAR{" "}
                <span className="text-green-600">
                  DISCOVER
                </span>
              </div>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
              Your guide to discovering the best places,
              experiences, food, events and hidden gems
              in Dar es Salaam.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex gap-2">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-950 hover:text-white"
              >
                <Star size={16} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-950 hover:text-white"
              >
                <Globe size={16} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-950 hover:text-white"
              >
                <Send size={16} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-black text-gray-950">
              Explore
            </h3>

            <div className="mt-4 space-y-2.5">
              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:text-gray-950"
              >
                Beaches
              </a>

              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:text-gray-950"
              >
                Food & Dining
              </a>

              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:text-gray-950"
              >
                Events
              </a>

              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:text-gray-950"
              >
                Experiences
              </a>
            </div>
          </div>

          {/* Providers */}
          <div>
            <h3 className="text-sm font-black text-gray-950">
              For Providers
            </h3>

            <div className="mt-4 space-y-2.5">
              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:text-gray-950"
              >
                List Your Business
              </a>

              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:text-gray-950"
              >
                Promote an Event
              </a>

              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:text-gray-950"
              >
                Partner With Us
              </a>

              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:text-gray-950"
              >
                Provider Login
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-black text-gray-950">
              Legal & Help
            </h3>

            <div className="mt-4 space-y-2.5">
              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:text-gray-950"
              >
                About Us
              </a>

              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:text-gray-950"
              >
                Contact
              </a>

              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:text-gray-950"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:text-gray-950"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-100 pt-5 text-center text-xs text-gray-400 md:text-left">
          © 2026 DAR DISCOVER. All rights reserved.
        </div>
      </div>
    </footer>
  );
}