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

