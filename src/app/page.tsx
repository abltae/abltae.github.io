import TextType from "@/components/type-text";
import { BackgroundVideo } from "./background-video";

const links = [
  { label: "GitHub", href: "https://github.com/abltae", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tae-hee-lee-664977289/", external: true },
  { label: "Email", href: "mailto:taeheelee1@utexas.edu", external: false },
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

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">current focus</h2>
          <ul className="list-disc pl-5">
            <li>dropping 20 points in intramural basketball</li>
            <li>find an internship</li>
            <li>Coursework: business stuff</li>
          </ul>
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
