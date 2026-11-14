import type { Metadata } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Closest free stand-in for Lausanne (Weltkern), which is commercial.
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: { default: "Tae Hee Lee", template: "%s · Tae Hee Lee" },
  description: "MIS student at the McCombs School of Business at UT Austin, building full-stack apps and LLM integrations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hanken.variable} ${plexMono.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
