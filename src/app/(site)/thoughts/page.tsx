import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "thoughts",
};

// Newest first. Add an entry here to publish a thought.
const thoughts: { date: string; title: string; body: string }[] = [];

export default function ThoughtsPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-6 py-20 text-white/90 sm:py-28">
      <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">thoughts</h1>

      {thoughts.length === 0 ? (
        <p className="text-white/60">Coming soon.</p>
      ) : (
        <ol className="flex flex-col gap-10">
          {thoughts.map(thought => (
            <li key={thought.date + thought.title}>
              <article className="flex flex-col gap-2">
                <time dateTime={thought.date} className="font-mono text-xs tracking-[0.2em] text-white/60">
                  {thought.date}
                </time>
                <h2 className="text-xl font-semibold text-white">{thought.title}</h2>
                <p>{thought.body}</p>
              </article>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
