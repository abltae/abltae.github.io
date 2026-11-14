"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function CallbackCode() {
  const params = useSearchParams();
  const code = params.get("code");
  const error = params.get("error");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("failed");
    }
  }

  if (error) {
    return (
      <>
        <h1 className="text-2xl font-semibold">Spotify sign-in didn&apos;t finish</h1>
        <p className="text-white/70">
          Spotify returned <code className="font-mono text-white">{error}</code>. Run{" "}
          <code className="font-mono text-white">npm run spotify:auth</code> again and click Agree.
        </p>
      </>
    );
  }

  if (!code) {
    return (
      <>
        <h1 className="text-2xl font-semibold">Nothing to see here</h1>
        <p className="text-white/70">
          This page finishes Spotify sign-in for <code className="font-mono text-white">npm run spotify:auth</code>.
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-semibold">Almost done</h1>
      <p className="text-white/70">Copy this code and paste it into the terminal. It works once and expires in a few minutes.</p>
      <div className="flex items-stretch gap-2">
        <input
          readOnly
          value={code}
          aria-label="Spotify authorization code"
          onFocus={e => e.currentTarget.select()}
          className="min-w-0 flex-1 rounded-md border border-white/20 bg-white/5 px-3 py-2 font-mono text-sm text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        />
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-[background-color,transform] duration-150 ease-out hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:active:scale-100"
        >
          {copyState === "copied" ? "Copied" : "Copy"}
        </button>
      </div>
      <p aria-live="polite" className="min-h-5 text-sm text-white/60">
        {copyState === "copied" && "Copied. Paste it into the terminal."}
        {copyState === "failed" && "Couldn't copy automatically. Select the code and copy it manually."}
      </p>
    </>
  );
}
