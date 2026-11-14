import { projects } from "@/lib/projects";
import { ApiDemo } from "./api-demo";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-16 px-6 py-24 font-sans">
      <header className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">abltae</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Welcome to my personal website.
        </p>
      </header>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        <ul className="flex flex-col gap-4">
          {projects.map((project) => (
            <li key={project.name}>
              <a
                href={project.url}
                className="font-medium underline-offset-4 hover:underline"
              >
                {project.name}
              </a>
              <p className="text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold">API</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          The list above is rendered on the server at build time. The same
          data is also served as JSON by a route handler:
        </p>
        <ApiDemo />
      </section>
    </main>
  );
}
