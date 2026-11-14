import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "blog",
};

// Newest first. Add an entry here to publish a post.
const posts: { date: string; title: string; body: string }[] = [];

export default function BlogPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-6 py-20 text-white/90 sm:py-28">
      <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">blog</h1>

      {posts.length === 0 ? (
        <p className="text-white/60">Coming soon.</p>
      ) : (
        <ol className="flex flex-col gap-10">
          {posts.map(post => (
            <li key={post.date + post.title}>
              <article className="flex flex-col gap-2">
                <time dateTime={post.date} className="font-mono text-xs tracking-[0.2em] text-white/60">
                  {post.date}
                </time>
                <h2 className="text-xl font-semibold text-white">{post.title}</h2>
                <p>{post.body}</p>
              </article>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
