# abltae.github.io

Personal website, built with [Next.js](https://nextjs.org) and served from GitHub Pages at https://abltae.github.io/.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds a static export (`out/`) and publishes it to the `gh-pages` branch with [JamesIves/github-pages-deploy-action](https://github.com/marketplace/actions/deploy-to-github-pages). Pages serves that branch.

## Spotify

GitHub Pages has no server, so the "what I'm listening to" track is fetched at build time and baked into the page. The workflow also runs every 15 minutes to keep it fresh.

It needs these repository secrets (Settings → Secrets and variables → Actions):

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN` (with the `user-read-currently-playing` and `user-read-recently-played` scopes)

Without them, the build still succeeds and the Spotify tab shows a fallback message. To test locally, put them in `.env.local` and run `npm run build`.
