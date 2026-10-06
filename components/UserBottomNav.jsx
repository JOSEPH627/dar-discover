"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Heart,
  Bell,
  UserCircle,
} from "lucide-react";

export default function UserBottomNav() {
  const pathname = usePathname();

  const items = [
    {
      label: "Home",
      href: "/user/home",
      icon: Home,
    },
    {
      label: "Explore",
      href: "/places",
      icon: Compass,
    },
    {
      label: "Saved",
      href: "/user/saved",
      icon: Heart,
    },
    {
      label: "Alerts",
      href: "/user/notifications",
      icon: Bell,
    },
    {
      label: "Profile",
      href: "/user/profile",
      icon: UserCircle,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 px-2 py-2.5 shadow-[0_-5px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl md:hidden">

      <div className="mx-auto flex max-w-md items-center justify-around">

        {items.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/user/home" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex min-w-[58px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 transition ${
                active
                  ? "text-green-700"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              <Icon
                size={21}
                strokeWidth={active ? 2.5 : 2}
              />

              <span className="text-[10px] font-black">
                {item.label}
              </span>

              {active && (
                <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-green-700" />
              )}
            </Link>
          );
        })}

      </div>
    </nav>
  );
}