"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";

const tabs = [
  { label: "home", href: "/" },
  { label: "blog", href: "/blog" },
];

// Some static hosts add a trailing slash ("/blog/"); ignore it when matching.
const normalize = (path: string) => path.replace(/(.)\/$/, "$1");

// The outgoing page's column dims while the next one loads (see .route-content in
// globals.css). Only the element on screen now is marked, so the incoming page,
// a fresh element from the template, can never inherit the dim.
const markLeaving = () => document.querySelector(".route-content")?.setAttribute("data-leaving", "");
const clearLeaving = () =>
  document.querySelectorAll(".route-content[data-leaving]").forEach(el => el.removeAttribute("data-leaving"));

export function SiteNav() {
  const pathname = normalize(usePathname());
  const router = useRouter();
  // The tab clicked while its page is still loading. It counts only until the
  // path changes, so a finished navigation never needs to clear it.
  const [pending, setPending] = useState<{ href: string; from: string } | null>(null);
  const loading = pending !== null && pending.from === pathname;
  const current = loading ? pending.href : pathname;

  useEffect(() => {
    tabs.forEach(tab => router.prefetch(tab.href));
  }, [router]);

  // Failsafe: never leave the page dimmed if a navigation stalls or is abandoned.
  useEffect(() => {
    if (!loading) return;
    const timeout = setTimeout(() => {
      clearLeaving();
      setPending(null);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [loading]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const opensElsewhere = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
    if (opensElsewhere) return;
    if (href === pathname) {
      // Latest click wins: going back to the page you're on cancels the pending switch.
      clearLeaving();
      setPending(null);
      return;
    }
    setPending({ href, from: pathname });
    markLeaving();
  }

  return (
    // Phones: pinned to the top over a soft fade so it's reachable from anywhere
    // on the long home page; only the links catch taps, so content under the fade
    // stays tappable. Larger screens: sits in the corner and scrolls away.
    <nav
      aria-label="Site"
      className="pointer-events-none fixed inset-x-0 top-0 z-20 flex justify-end bg-[linear-gradient(to_bottom,rgb(0_0_0/0.85),rgb(0_0_0/0.55)_55%,transparent)] px-6 pt-6 pb-8 sm:absolute sm:inset-x-auto sm:top-6 sm:right-6 sm:bg-none sm:p-0"
    >
      {/* Each link is padded to a ~44px tap target; the negative margin keeps the text where it was. */}
      <ul className="pointer-events-auto -mx-2 -my-3 flex gap-1 text-sm">
        {tabs.map(tab => {
          const state = current !== tab.href ? "idle" : loading ? "pending" : "active";
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                onClick={event => handleClick(event, tab.href)}
                aria-current={tab.href === pathname ? "page" : undefined}
                data-state={state}
                className={`group block px-2 py-3 outline-none transition-colors duration-150 ease-out ${
                  state === "idle" ? "text-white/60 hover:text-white" : "text-white"
                }`}
              >
                {/* The underline is drawn (see .nav-tab-label); the focus ring hugs the word, not the tap area. */}
                <span className="nav-tab-label rounded-sm group-focus-visible:outline-2 group-focus-visible:outline-offset-[6px] group-focus-visible:outline-white">
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* The tab highlight above is visual only; screen readers hear this instead. */}
      <p aria-live="polite" className="sr-only">
        {loading ? `Loading ${tabs.find(tab => tab.href === pending.href)?.label}` : ""}
      </p>
    </nav>
  );
}
