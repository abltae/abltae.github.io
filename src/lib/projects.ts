export type Project = {
  name: string;
  description: string;
  url: string;
};

// The site's data source. Swap this for a CMS, database, or API call;
// it is read at build time, so changes go live on the next deploy.
export const projects: Project[] = [
  {
    name: "abltae.github.io",
    description:
      "This site. Next.js, exported as static files and deployed to GitHub Pages by GitHub Actions.",
    url: "https://github.com/abltae/abltae.github.io",
  },
  {
    name: "Your next project",
    description: "Add your own entries in src/lib/projects.ts.",
    url: "https://github.com/abltae",
  },
];
