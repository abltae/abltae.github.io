import TextType from "@/components/type-text";

const links = [
  { label: "GitHub", href: "https://github.com/abltae" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tae-hee-lee-664977289/" },
  { label: "Email", href: "mailto:taeheelee1@utexas.edu" },
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
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-2">
        <p>McCombs · UT Austin</p>
        <h1 className="text-3xl font-semibold">
          <TextType
            as="span"
            text={["Tae Hee Lee", "Tae Hee Lee"]}
            typingSpeed={200}
            pauseDuration={3000}
            showCursor={true}
            cursorCharacter="|"
            loop={true}
          />
        </h1>
        <p>Business major + CS minor, avid full-stack developer interested in LLM and Blockchain technologies.</p>
        <p>Based in Austin, Texas</p>
        <ul className="flex gap-4">
          {links.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel="noreferrer"
                className="underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">about</h2>
        <p>
          Hi! I&apos;m Tae Hee Lee, a MIS student at the Mccombs School of Business at UT Austin. I love building
          software products, mainly full-stack applications and LLM integrations.
        </p>
        <p>
          In my free time you can catch me building, learning new technologies, reselling, playing basketball, golf,
          poker, collecting trading cards, doomscrolling, and traveling the world.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">current focus</h2>
        <ul className="list-disc pl-5">
          <li>dropping 20 points in intramural basketball</li>
          <li>find an internship</li>
          <li>Coursework: business stuff</li>
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">stack</h2>
        <p>Favorite tools powering my projects.</p>
        <p>{stack.join(", ")}</p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">get in touch</h2>
        <p>If you&apos;re working on something cool or wanna bless me with a internship hit me up!</p>
      </section>
    </main>
  );
}
