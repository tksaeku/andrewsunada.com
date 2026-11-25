# andrewsunada.com

Andrew Sunada's personal site: West Coast Swing coaching first, software portfolio second, everything reachable from one menu. Public GitHub repo: `tksaeku/andrewsunada.com`.

SvelteKit (Svelte 5, TypeScript) prerendered with `adapter-static`, SCSS, Vitest. Six routes (`/`, `/coaching/`, `/dance/`, `/apps/`, `/resume/`, `/contact/`) plus `sitemap.xml`, `robots.txt`, `llms.txt` and a themed `404.html`, served as static files from DreamHost. There is no server.

## Commands

```bash
npm run dev       # dev server, http://localhost:5173
npm run build     # prerender to build/
npm run preview   # serve build/, http://localhost:4173 (restart it after every build)
npm run verify    # check + lint + test + build + build checks; what CI runs
```

## Docs

Read the doc for the area you are working in before changing it.

| Doc | Covers |
|---|---|
| [docs/local-development.md](docs/local-development.md) | Running the site, restarting the preview after a build, curl and Chrome checks |
| [docs/content.md](docs/content.md) | Where all copy lives, email links, external links, apps, coaching and dance page structure, photos |
| [docs/youtube-videos.md](docs/youtube-videos.md) | Choosing and recording videos: ranking by views, IDs, upload dates, routes that don't work |
| [docs/git-and-release.md](docs/git-and-release.md) | Branches, deploy on push to `main`, what must never be committed |
| [docs/photos.md](docs/photos.md) | Photo library catalogue and planned use |
| [docs/superpowers/specs/2026-11-21-site-rebuild-design.md](docs/superpowers/specs/2026-11-21-site-rebuild-design.md) | The approved site design |
| [docs/superpowers/plans/2026-11-21-site-rebuild.md](docs/superpowers/plans/2026-11-21-site-rebuild.md) | The build plan |
| `docs/Andrew Sunada Personal Website Design.png` | The Canva design that sets the look |
| `docs/research/README.md` | Index of the private research behind the copy (local only) |
| [README.md](README.md) | CI secrets and variables |

## Rules

- **Edit content modules, never page markup.** Copy lives in `src/lib/content/`; update the module's test when a value changes on purpose. See [docs/content.md](docs/content.md).
- **The repo is public.** `docs/research/` and `assets/photos/` stay out of git. Never commit or publish student names, coach or partner names from private notes, a home address, a phone number, or any email address other than `andrew@andrewsunada.com`.
- **External links open in a new tab** (`target="_blank" rel="noopener noreferrer"`).
- **Old branches are off limits.** `dev`, `rework`, `feat/image`, `update/design` and `reset` hold previous sites, and `dev` history contains old credentials. Do not merge, rebase onto, or cherry-pick from them.
- **Resume copy** follows `~/Projects/career/resume/resume-a.html` wording and never signals a job search.
- **Never link** `samuraijs`, `SwingCoder911`, parked domains, or private repos.
- **Ask before** pushing, opening a PR, merging, or touching DreamHost.
- Follow `/tkjs` for code and `/tkgithub` for git.
