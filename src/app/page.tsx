import TextType from "@/components/type-text";
import { Tabs } from "./tabs";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/abltae",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 0 0 7.864 10.93c.575.107.784-.25.784-.556v-1.986c-3.2.696-3.874-1.37-3.874-1.37-.523-1.33-1.28-1.686-1.28-1.686-1.047-.717.08-.702.08-.702 1.159.082 1.77 1.19 1.77 1.19 1.03 1.766 2.705 1.256 3.366.96.105-.747.404-1.257.735-1.546-2.555-.29-5.24-1.277-5.24-5.684 0-1.255.45-2.283 1.187-3.088-.12-.29-.515-1.46.112-3.044 0 0 .967-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.166-1.18 3.166-1.18.63 1.584.235 2.754.116 3.044.74.805 1.185 1.833 1.185 3.088 0 4.42-2.692 5.39-5.255 5.675.415.357.785 1.062.785 2.14v3.176c0 .31.206.67.792.555A11.5 11.5 0 0 0 23.5 12C23.5 5.648 18.352.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tae-hee-lee-664977289/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M4.98 3.5a2.48 2.48 0 1 1 0 4.96 2.48 2.48 0 0 1 0-4.96zm-.89 6.02h3.76v10.98H4.09zm6.26 0h3.6v1.5h.05c.5-.94 1.72-1.93 3.54-1.93 3.78 0 4.48 2.49 4.48 5.72v5.7h-3.76v-5.05c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.3-1.93 2.64v5.15h-3.75z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:taeheelee1@utexas.edu",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm17 3.382-7.178 5.383a1 1 0 0 1-1.225 0L4 8.382V18h16zM4.511 7l7.49 5.624L19.489 7z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full px-6 py-16 font-sans text-zinc-50 sm:px-16">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 lg:flex-row lg:items-start">
        <section className="flex w-full flex-col gap-10 lg:max-w-sm lg:self-start lg:pt-16">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.4em] text-[#fbb040]">McCombs · UT Austin</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">
              <TextType
                as="span"
                className="block"
                text={["Tae Hee Lee", "Tae Hee Lee"]}
                typingSpeed={200}
                pauseDuration={3000}
                showCursor={true}
                cursorCharacter="|"
                loop={true}
              />
            </h1>
            <p className="text-lg text-zinc-300">
              Business major + CS minor, avid full-stack developer interested in LLM and Blockchain technologies.
            </p>
            <div className="h-0.5 w-20 bg-[#fbb040]/70" />
            <p className="text-base text-zinc-400">Based in Austin, Texas</p>
          </div>
          <div className="flex gap-4">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target={link.label === "Email" ? "_self" : "_blank"}
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-[#bf5700]/80 hover:bg-[#bf5700]/20"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </section>

        <Tabs />
      </main>
    </div>
  );
}
