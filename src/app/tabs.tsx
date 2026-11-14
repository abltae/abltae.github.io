"use client";

import { useState } from "react";
import type { IconType } from "react-icons";
import { FaAws, FaJava, FaPython, FaHtml5, FaCss3, FaReact, FaNodeJs, FaStripeS } from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa6";
import { RiNextjsFill, RiTailwindCssFill, RiSupabaseFill } from "react-icons/ri";
import { IoLogoJavascript, IoLogoVercel } from "react-icons/io5";
import { DiMysql, DiPostgresql } from "react-icons/di";
import { SiTypescript, SiVite, SiPrisma, SiLangchain, SiFastapi } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";
import type { SpotifyTrack } from "@/lib/spotify";

const stackIcons: { label: string; Icon: IconType }[] = [
  { label: "TypeScript", Icon: SiTypescript },
  { label: "JavaScript", Icon: IoLogoJavascript },
  { label: "React", Icon: FaReact },
  { label: "Next.js", Icon: RiNextjsFill },
  { label: "Node.js", Icon: FaNodeJs },
  { label: "Python", Icon: FaPython },
  { label: "Java", Icon: FaJava },
  { label: "MySQL", Icon: DiMysql },
  { label: "PostgreSQL", Icon: DiPostgresql },
  { label: "AWS", Icon: FaAws },
  { label: "HTML5", Icon: FaHtml5 },
  { label: "CSS3", Icon: FaCss3 },
  { label: "C#", Icon: TbBrandCSharp },
  { label: "Git", Icon: FaGitAlt },
  { label: "Tailwind", Icon: RiTailwindCssFill },
  { label: "Azure", Icon: VscAzure },
  { label: "Vite", Icon: SiVite },
  { label: "Vercel", Icon: IoLogoVercel },
  { label: "Prisma", Icon: SiPrisma },
  { label: "Supabase", Icon: RiSupabaseFill },
  { label: "Stripe", Icon: FaStripeS },
  { label: "LangChain", Icon: SiLangchain },
  { label: "FastAPI", Icon: SiFastapi },
];

const tabs = [
  { id: "readme", label: "../README.md" },
  { id: "stack", label: "../stack.env" },
  { id: "spotify", label: "../spotify.ts" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const overviewSections = [
  {
    heading: "about",
    body: [
      "Hi! I'm Tae Hee Lee, a MIS student at the Mccombs School of Business at UT Austin. I love building software products, mainly full-stack applications and LLM integrations.",
      "In my free time you can catch me building, learning new technologies, reselling, playing basketball, golf, poker, collecting trading cards, doomscrolling, and traveling the world.",
    ],
  },
  {
    heading: "current focus",
    list: [
      "dropping 20 points in intramural basketball",
      "find an internship",
      "Coursework: business stuff",
    ],
  },
  {
    heading: "get in touch",
    body: [
      "If you're working on something cool or wanna bless me with a internship hit me up!",
    ],
  },
];

export function Tabs({ spotifyTrack }: { spotifyTrack: SpotifyTrack | null }) {
  const [activeTab, setActiveTab] = useState<TabId>("readme");

  return (
    <section className="w-full rounded-[32px] border border-white/10 bg-white/5 lg:flex-1">
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 px-6 pt-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-t-2xl px-4 py-2 text-sm font-semibold tracking-wide ${
              activeTab === tab.id ? "bg-white/10 text-[#fbb040]" : "text-zinc-500 hover:text-white/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="space-y-10 px-8 py-10 text-[15px] leading-relaxed text-zinc-200">
        {activeTab === "readme" &&
          overviewSections.map(section => (
            <div key={section.heading} className="space-y-3">
              <h2 className="text-xl font-semibold text-white">{section.heading}</h2>
              {section.body?.map((paragraph, idx) => (
                <p key={idx} className="text-zinc-300">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc space-y-2 pl-5 text-zinc-300">
                  {section.list.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

        {activeTab === "stack" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">stack</h2>
            <p className="text-sm text-zinc-400">Favorite tools powering my projects.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {stackIcons.map(({ label, Icon }) => (
                <span
                  key={label}
                  title={label}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-white"
                >
                  <Icon className="h-6 w-6" aria-label={label} />
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === "spotify" && (
          <div className="space-y-4 text-zinc-300">
            <h2 className="text-xl font-semibold text-white">spotify</h2>
            <p>check out what im listening to.</p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              {spotifyTrack ? (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {spotifyTrack.albumImageUrl && (
                    // Static export has no image optimizer, so a plain <img> is fine here.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={spotifyTrack.albumImageUrl}
                      alt={spotifyTrack.album}
                      className="h-24 w-24 rounded-xl object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#fbb040]">
                      {spotifyTrack.isPlaying ? "Now Playing" : "Last Played"}
                    </p>
                    <a
                      href={spotifyTrack.songUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg font-semibold text-white hover:underline"
                    >
                      {spotifyTrack.title}
                    </a>
                    <p className="text-sm text-zinc-400">{spotifyTrack.artist}</p>
                    <p className="text-xs text-zinc-500">{spotifyTrack.album}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-zinc-500">Nothing to show right now.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
