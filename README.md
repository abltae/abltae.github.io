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

The "now playing" card is fetched at build time (GitHub Pages has no server), and the workflow rebuilds every 15 minutes to keep it fresh. It needs three repository secrets: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`.

To set or refresh them, add `http://127.0.0.1:8888/callback` as a Redirect URI on your Spotify app, then run this in your own terminal:

```bash
npm run spotify:auth
```

It asks for the Client ID and Secret, has you approve access in the browser, and saves all three secrets to GitHub without printing them. Without the secrets the site still builds; the card is just hidden.
