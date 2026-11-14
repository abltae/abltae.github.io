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
        <div className="flex flex-col gap-3">
          <p>
            Coming soon: notes on agentic finance (AiFi), what I&apos;m building, and what I learn along the way.
          </p>
          <p className="text-white/70">
            Until then, follow along on{" "}
            <a
              href="https://x.com/jjkjjjn"
              target="_blank"
              rel="noreferrer"
              className="text-white underline decoration-white/30 underline-offset-4 transition-[text-decoration-color] duration-150 ease-out hover:decoration-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:text-white/70"
            >
              X
            </a>
            .
          </p>
        </div>
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
