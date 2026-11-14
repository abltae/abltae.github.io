"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";

type State =
  | { status: "idle" | "loading" | "error" }
  | { status: "done"; projects: Project[] };

export function ApiDemo() {
  const [state, setState] = useState<State>({ status: "idle" });

  async function load() {
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/projects.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState({ status: "done", projects: await res.json() });
    } catch {
      setState({ status: "error" });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={load}
        disabled={state.status === "loading"}
        className="self-start rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {state.status === "loading" ? "Loading…" : "Fetch /api/projects.json"}
      </button>
      {state.status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Couldn&apos;t reach the API. Try again.
        </p>
      )}
      {state.status === "done" && (
        <pre className="overflow-x-auto rounded-lg bg-black/[.04] p-4 font-mono text-xs dark:bg-white/[.06]">
          {JSON.stringify(state.projects, null, 2)}
        </pre>
      )}
    </div>
  );
}
