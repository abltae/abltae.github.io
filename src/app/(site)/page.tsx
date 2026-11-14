import { Name } from "./name";

const links = [
  { label: "GitHub", href: "https://github.com/abltae", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tae-hee-lee-664977289/", external: true },
  { label: "X", href: "https://x.com/jjkjjjn", external: true },
  { label: "Email", href: "mailto:taeheelee1@utexas.edu", external: false },
];

type Month = [iso: string, label: string];

// Logos render 20px tall; width keeps each file's aspect ratio. `tile` marks an
// opaque square app icon, which gets rounded corners to read as one.
type Logo = { src: string; width: number; tile?: boolean };

const ROBINHOOD: Logo = { src: "/logos/robinhood.png", width: 20, tile: true };
const THUNDER: Logo = { src: "/logos/okc-thunder.png", width: 20, tile: true };

// Newest first.
const experience: {
  year: number;
  jobs: { company: string; logo?: Logo; team?: string; role: string; start: Month; end: Month }[];
}[] = [
  {
    year: 2026,
    jobs: [
      { company: "Robinhood", logo: ROBINHOOD, team: "finance eng", role: "software engineer intern", start: ["09", "Sep"], end: ["12", "Dec"] },
      { company: "Robinhood", logo: ROBINHOOD, team: "ai infra", role: "software engineer intern", start: ["05", "May"], end: ["08", "Aug"] },
      { company: "Oklahoma City Thunder", logo: THUNDER, team: "data platform", role: "software engineer intern", start: ["01", "Jan"], end: ["04", "Apr"] },
    ],
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-6 py-20 text-white/90 sm:py-28">
      <header className="flex flex-col gap-3">
        <Name />
        <p className="text-lg">junior @ UT Austin McCombs</p>
        <p className="text-white/70">Based in Austin, Texas</p>
        <ul className="flex gap-5 pt-1">
          {links.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external && { target: "_blank", rel: "noreferrer" })}
                className="hit-area text-white underline decoration-white/30 underline-offset-4 transition-[text-decoration-color] duration-150 ease-out hover:decoration-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:text-white/70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-white">about</h2>
        <p>
          I have a deep passion for finance and technology. Currently I&apos;m interested in the Agentic Finance (AiFi)
          space trying to create a better human-agent experience for the future of finance. When I&apos;m not building
          you can catch me playing basketball, golf, poker, or collecting trading cards.
        </p>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold text-white">work experience</h2>
        {/* One continuous line, newest first: hollow markers for years, solid dots for roles. */}
        <ol className="flex flex-col gap-7 border-l border-white/45 pl-6">
          {experience.map(({ year, jobs }) => (
            <li key={year} className="flex flex-col gap-4">
              <h3 className="relative font-mono text-xs tracking-[0.2em] text-white/60">
                <span
                  aria-hidden
                  className="absolute top-1/2 -left-[31px] h-3 w-3 -translate-y-1/2 rounded-full border border-white/60 bg-black"
                />
                {year}
              </h3>
              <ol className="flex flex-col gap-4">
                {jobs.map(job => (
                  <li key={`${job.company}-${job.start}`} className="relative">
                    <span aria-hidden className="absolute top-2 -left-[29px] h-2 w-2 rounded-full bg-white" />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <p>
                        {job.logo && (
                          // Decorative: the company name follows. Static export has no image optimizer, so a plain <img> is fine.
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={job.logo.src}
                            alt=""
                            width={job.logo.width}
                            height={20}
                            className={`mr-2 inline-block h-5 w-auto align-middle ${job.logo.tile ? "rounded-[5px]" : ""}`}
                          />
                        )}
                        <span className="font-semibold text-white">{job.company}</span>
                        {/* Team wraps as one unit so a narrow row never splits "data / platform". */}
                        {job.team && (
                          <>
                            {" "}
                            <span className="whitespace-nowrap text-white/60">· {job.team}</span>
                          </>
                        )}
                      </p>
                      <p className="font-mono text-sm text-white/60">
                        <time dateTime={`${year}-${job.start[0]}`}>{job.start[1]}</time> –{" "}
                        <time dateTime={`${year}-${job.end[0]}`}>{job.end[1]}</time>
                      </p>
                    </div>
                    <p className="text-white/70">{job.role}</p>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
