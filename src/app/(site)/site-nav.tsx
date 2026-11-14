"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "home", href: "/" },
  { label: "thoughts", href: "/thoughts" },
];

export function SiteNav() {
  // Some static hosts add a trailing slash ("/thoughts/"); ignore it when matching.
  const pathname = usePathname().replace(/(.)\/$/, "$1");

  return (
    <nav aria-label="Site" className="absolute top-6 right-6 z-10">
      <ul className="flex gap-5 text-sm">
        {tabs.map(tab => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`underline-offset-4 transition-[color,text-decoration-color] duration-150 ease-out focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                  active
                    ? "text-white underline decoration-white"
                    : "text-white/60 underline decoration-white/0 hover:text-white hover:decoration-white/40"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
