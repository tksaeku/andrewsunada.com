# andrewsunada.com

Andrew Sunada's personal site: West Coast Swing coaching first, software portfolio second, everything reachable from one menu. Public GitHub repo: `tksaeku/andrewsunada.com`.

## The site

Six prerendered routes — `/`, `/coaching/`, `/dance/`, `/apps/`, `/resume/`, `/contact/` — plus `sitemap.xml`, `robots.txt`, `llms.txt` and a themed `404.html`. Every route is a directory with an `index.html`, so Apache serves deep links without rewrite rules.

Reference documents:

- `docs/superpowers/specs/2026-11-21-site-rebuild-design.md` — the approved design.
- `docs/superpowers/plans/2026-11-21-site-rebuild.md` — the build plan.
- `docs/Andrew Sunada Personal Website Design.png` — the Canva design that sets the look.
- `docs/photos.md` — photo library catalogue and planned use.
- `docs/research/README.md` — index of the private research behind the copy (local only).

## Stack

SvelteKit (Svelte 5, TypeScript) prerendered with `adapter-static`, SCSS, Vitest. Hosted as static files on DreamHost, released by GitHub Actions on push to `main`. There is no server.

## Commands

```bash
npm run dev       # local dev server
npm run build     # prerender to build/
npm run preview   # serve build/ locally
npm run check     # svelte-check (types)
npm run lint      # eslint
npm run test      # vitest
npm run verify    # check + lint + test + build + build checks; what CI runs
```

## Editing content

- All copy, rates, venues, videos, apps, resume entries and profile links live in typed modules under `src/lib/content/`. Pages and the `Seo` component render from these modules, so the visible page and its metadata stay in step. Edit the module, never the page markup.
- Each content module has a `.test.ts` beside it pinning the values that must not drift (rates, links, menu order). Update the test when a value changes on purpose.
- Photos: copy the chosen file from `assets/photos/` into `src/lib/images/` and register it in `src/lib/content/photos.ts` with `alt` text and a caption.
- Per-page titles and descriptions live in `src/lib/seo/pageMeta.ts`.

## Rules

- **The repo is public.** `docs/research/` and `assets/photos/` are git-ignored and stay that way. Never commit or publish student names, coach or partner names from private notes, a home address, a phone number, or any email address other than `andrew@andrewsunada.com`.
- **Old branches are off limits.** `dev`, `main`, `rework`, `feat/image` and `update/design` hold the previous sites, and `dev` history contains old credentials. Do not merge, rebase onto, or cherry-pick from them.
- **Resume copy** follows `~/Projects/career/resume/resume-a.html` wording and never signals a job search.
- **Never link** `samuraijs`, `SwingCoder911`, parked domains, or private repos.
- **Ask before** pushing, opening a PR, merging, or touching DreamHost.
- Follow `/tkjs` for code and `/tkgithub` for git.
