"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";

const tabs = [
  { label: "home", href: "/" },
  { label: "thoughts", href: "/thoughts" },
];

// Some static hosts add a trailing slash ("/thoughts/"); ignore it when matching.
const normalize = (path: string) => path.replace(/(.)\/$/, "$1");

export function SiteNav() {
  const pathname = normalize(usePathname());
  const router = useRouter();
  // The tab clicked while its page is still loading. It counts only until the
  // path changes, so a finished navigation never needs to clear it.
  const [pending, setPending] = useState<{ href: string; from: string } | null>(null);
  const current = pending && pending.from === pathname ? pending.href : pathname;

  useEffect(() => {
    tabs.forEach(tab => router.prefetch(tab.href));
  }, [router]);

  // The new page has arrived: let the content column come back up (see .route-content).
  useEffect(() => {
    document.documentElement.removeAttribute("data-navigating");
  }, [pathname]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const opensElsewhere = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
    if (opensElsewhere || href === pathname) return;
    setPending({ href, from: pathname });
    document.documentElement.setAttribute("data-navigating", "");
  }

  return (
    <nav aria-label="Site" className="absolute top-6 right-6 z-10">
      {/* Each link is padded to a ~44px tap target; the negative margin keeps the text where it was. */}
      <ul className="-mx-2 -my-3 flex gap-1 text-sm">
        {tabs.map(tab => {
          const active = current === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                onClick={event => handleClick(event, tab.href)}
                aria-current={active ? "page" : undefined}
                className={`group block px-2 py-3 underline-offset-4 outline-none transition-colors duration-150 ease-out ${
                  active ? "text-white underline decoration-white" : "text-white/60 hover:text-white"
                }`}
              >
                {/* Focus ring hugs the word, not the padded tap area. */}
                <span className="rounded-sm group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-white">
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
