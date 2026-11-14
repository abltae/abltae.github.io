import TextType from "@/components/type-text";
import { BackgroundVideo } from "./background-video";

const links = [
  { label: "GitHub", href: "https://github.com/abltae", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tae-hee-lee-664977289/", external: true },
  { label: "Email", href: "mailto:taeheelee1@utexas.edu", external: false },
];

type Month = [iso: string, label: string];

const MAY: Month = ["05", "May"];
const AUG: Month = ["08", "Aug"];

// Newest first.
const experience: {
  year: number;
  jobs: { company: string; team?: string; role: string; start: Month; end: Month }[];
}[] = [
  {
    year: 2027,
    jobs: [{ company: "Coinbase", team: "ai infra", role: "software engineer intern", start: MAY, end: AUG }],
  },
  {
    year: 2026,
    jobs: [
      { company: "Robinhood", team: "finance eng", role: "software engineer intern", start: ["09", "Sep"], end: ["12", "Dec"] },
      { company: "Robinhood", team: "ai infra", role: "software engineer intern", start: MAY, end: AUG },
      { company: "Oklahoma City Thunder", role: "software engineer intern", start: ["01", "Jan"], end: ["04", "Apr"] },
    ],
  },
];

const stack = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "MySQL",
  "PostgreSQL",
  "AWS",
  "HTML5",
  "CSS3",
  "C#",
  "Git",
  "Tailwind",
  "Azure",
  "Vite",
  "Vercel",
  "Prisma",
  "Supabase",
  "Stripe",
  "LangChain",
  "FastAPI",
];

export default function Home() {
  return (
    <>
      <BackgroundVideo />

      {/* The text shadow separates letters from the dither dots behind them. */}
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-6 py-20 text-white/90 [text-shadow:0_0_6px_#000,0_0_12px_#000] sm:py-28">
        <header className="flex flex-col gap-3">
          <h1 aria-label="Tae Hee Lee" className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            <span aria-hidden className="motion-reduce:hidden">
              <TextType
                as="span"
                text={["Tae Hee Lee", "Tae Hee Lee"]}
                typingSpeed={200}
                pauseDuration={3000}
                showCursor={true}
                cursorCharacter="|"
                loop={true}
                cursorClassName="font-light"
              />
            </span>
            <span aria-hidden className="hidden motion-reduce:inline">
              Tae Hee Lee
            </span>
          </h1>
          <p className="text-lg">Business @ UT Austin</p>
          <p className="text-white/70">Based in Austin, Texas</p>
          <ul className="flex gap-5 pt-1">
            {links.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external && { target: "_blank", rel: "noreferrer" })}
                  className="text-white underline decoration-white/30 underline-offset-4 transition-[text-decoration-color] duration-150 ease-out hover:decoration-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:text-white/70"
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
            space trying to create better human-agent experience for the future of finance. When I&apos;m not building
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
                          <span className="font-semibold text-white">{job.company}</span>
                          {job.team && <span className="text-white/60"> · {job.team}</span>}
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

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">stack</h2>
          <p>Favorite tools powering my projects.</p>
          <p className="text-white/75">{stack.join(", ")}</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">get in touch</h2>
          <p>If you&apos;re working on something cool or wanna bless me with a internship hit me up!</p>
        </section>
      </main>
    </>
  );
}
