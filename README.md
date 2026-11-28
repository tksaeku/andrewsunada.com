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

Pushing to `main` runs `.github/workflows/ci.yml`: the `verify` job runs `npm run verify`, and when it passes the `deploy` job copies that verified `build/` to the DreamHost web directory with `rsync --delete` over SSH. Pull requests run the checks without deploying.

The workflow reads:

| Kind | Name | Holds |
|---|---|---|
| Secret | `DREAMHOST_SSH_KEY` | Private half of the deploy-only SSH key |
| Secret | `DREAMHOST_KNOWN_HOSTS` | The server's pinned host key line (`ssh-keyscan` output, checked by hand) |
| Secret | `DREAMHOST_HOST` | The DreamHost SSH hostname |
| Secret | `DREAMHOST_USER` | The DreamHost shell user |
| Secret | `DREAMHOST_PATH` | The web directory, `/home/<user>/andrewsunada.com/public` |
| Variable | `PUBLIC_CONTACT_FORM_ENDPOINT` | Formspree form URL |
| Variable | `PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key |
| Variable | `PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID (`G-…`); unset means no analytics tag (see [docs/analytics.md](docs/analytics.md)) |
| Variable | `PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Search Console token; unused while the domain is verified by DNS (see [docs/search-indexing.md](docs/search-indexing.md)) |

The deploy refuses to run if a secret is empty or `DREAMHOST_PATH` is not the `andrewsunada.com/public` web directory.

## Content

Copy, rates, videos, apps and resume entries live in `src/lib/content/`. See [docs/content.md](docs/content.md) for the editing guide and `CLAUDE.md` for the index of all docs.
