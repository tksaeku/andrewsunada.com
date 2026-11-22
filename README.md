# andrewsunada.com

The personal site of Andrew Sunada — West Coast Swing coaching, competition dancing, and software engineering.

It is a SvelteKit site prerendered to plain HTML with `@sveltejs/adapter-static`. There is no server: the `build/` directory is the whole site.

## Run it

```bash
npm install
npm run dev
```

## Check it

```bash
npm run verify
```

`verify` runs type checks, lint, unit tests, the production build and a scan of the built HTML for broken links and missing metadata.

## Release it

Pushing to `main` runs the same checks in GitHub Actions and, when they pass, copies `build/` to the DreamHost web directory over SSH. Pull requests run the checks without deploying.

## Content

Copy, rates, videos, apps and resume entries live in `src/lib/content/`. See `CLAUDE.md` for the editing guide.
