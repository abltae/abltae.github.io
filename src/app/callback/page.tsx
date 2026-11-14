import type { Metadata } from "next";
import { Suspense } from "react";
import { CallbackCode } from "./callback-code";

// Spotify redirects here during `npm run spotify:auth`; the page only shows the
// one-time code so it can be pasted back into the terminal.
export const metadata: Metadata = {
  title: "Spotify sign-in",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function CallbackPage() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-xl flex-col justify-center gap-4 px-6 py-20">
      <Suspense>
        <CallbackCode />
      </Suspense>
    </main>
  );
}
