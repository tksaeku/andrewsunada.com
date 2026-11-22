# andrewsunada.com rebuild — design

Research behind this design: [`docs/research/README.md`](../../research/README.md).

## Intent

andrewsunada.com is the one place that represents Andrew Sunada. It leads with West Coast Swing coaching, carries the software portfolio second, and makes everything reachable from one menu. A dancer who lands on it should understand what coaching with Andrew is like and be able to ask for a lesson; an engineering contact should find the apps, GitHub and resume within one click.

## Goals

- Home page sells coaching first and points to the portfolio second.
- Five sections in the menu: Coaching, Dance, Apps, Resume, Contact.
- The Japanese resume theme is the visual identity of the whole site.
- Every page carries the metadata that search engines and AI search tools read, so coaching pages are findable and Andrew is described accurately when someone asks about him.
- Instagram, Facebook, LinkedIn, YouTube and GitHub are linked from every page.
- Content is edited as files in this repo; a push to `main` publishes the site.
- HTTPS works on the domain.

## Non-goals

- Payments, accounts, an admin editor, or any booking system of our own. Scheduling is handled by Andrew's Calendly account on its free plan, for private lessons only.
- A blog, a CMS, analytics, dark mode.
- Live-fetched GitHub repo grids or YouTube feeds.
- App screenshots (cards use logos and text until screenshots made with fake data exist).
- Scrubbing secrets from the old branches' git history (tracked separately; see Constraints).

## Anti-goals

- Publishing anything about other people: student names, coach or partner names from private notes, competitors, personal reflections.
- Signalling a job search. Resume copy follows `resume-a.html` wording only.
- Printing a home address, phone number, or personal email address. The domain address `andrew@andrewsunada.com` is the only address shown.
- Linking `samuraijs`, `SwingCoder911`, parked domains, or private repos.
- A generic template look that ignores the theme.

## Constraints

- Hosting is the existing DreamHost account (Apache, static files). No server-side runtime of our own.
- The GitHub repo `tksaeku/andrewsunada.com` is public, so nothing private goes in the repo, including in docs.
- `origin/dev` history contains old credentials. The rebuild does not touch or merge the old branches.
- Code follows the `/tkjs` conventions; commits and PRs follow `/tkgithub`. The `app-generator` skill is invoked before scaffolding, with the stack below as the confirmed deviation from its defaults (no Go/MongoDB server).

## Approaches

| | Approach | Trade-off |
|---|---|---|
| **Picked** | Prerendered SvelteKit site on DreamHost | Plain HTML output, search-friendly, no server to run, same Svelte as Meeko. Booking is a Calendly embed for private lessons and a contact form for everything else. |
| | Svelte client + Go/MongoDB server | Real booking, payments and admin editing, at the cost of hosting and maintaining a server for a mostly-read site. |
| | Astro content site | Purpose-built for content sites, but outside Andrew's conventions. |

Andrew picked the prerendered SvelteKit site.

## Site map

```
/            Home
/coaching    Private lessons · monthly coaching · workshops · drill library
/dance       Competition highlights · WSDC record · YouTube
/apps        Meeko · TK Wallet · WeMove · Bingo · GitHub
/resume      Themed resume · PDF download
/contact     Lesson and work enquiries
```

Header on every page: `ANDREW SUNADA` wordmark with the 砂田 seal, then the five menu items. On narrow screens the menu collapses behind a toggle. Footer: Instagram, Facebook, LinkedIn, YouTube, GitHub, copyright. The same five profile links appear on the Contact page.

### Home

Home follows the Canva design's layout: a hero, then four numbered sections.

- **Hero** — small vermilion label, the name with the surname in vermilion italic, a short introduction that leads with coaching and is built on "present and connected", and the portrait on the right. Two actions: **Book a lesson** (opens Calendly; see Booking) and **Watch me dance** (to `/dance`).
- **01 Coaching** — headline, a short paragraph from the July 2025 Dance Bio, a dance photo, then private lessons, monthly coaching and workshops as numbered rows, each linking into `/coaching`.
- **02 Dance** (on the paper band) — headline, one line on competing in the All-Stars division, three featured competition videos, link to `/dance`.
- **03 Engineering** — headline, one line on the engineering career, the Meeko card, links to `/apps` and `/resume`.
- **04 Contact** — closing headline, the large `andrew@andrewsunada.com` mail link, link to `/contact`.

### Coaching

- **Private lessons** — single lessons, where they happen (city-level only: Vancouver, WA / Portland, OR). Rate: $80 per hour, or $65 per hour for active university or school students.
- **Monthly coaching** — a full package of 1 to 3 coaching sessions a month, with video feedback and provided drills over WhatsApp between sessions. Rate: $100 per hour of coaching sessions; a half-hour session is $50 for smaller budgets.
- **Workshops** — Level 1, Level 2, Advanced, and the All-Star bootcamp, each as a short outline. Andrew teaches workshops at Dance with Joy Studios on some Saturdays and at Norse Hall on some Wednesdays; both are named and linked. No fixed calendar is published; the page says "some Saturdays / some Wednesdays" and points to Contact for dates.
- **Convention staff and workshops** — Andrew is available to teach workshops and serve on staff at dance conventions; enquiries go to `/contact?topic=event`.
- **Drill library** — a selection of Andrew's own drills, grouped by topic.
- Calls to action: **Book a lesson** (Calendly) on private lessons; monthly coaching and workshops go to `/contact` with the matching topic.

### Dance

- Bio and WSDC record: All-Stars, notable placements by year, link to the public registry entry.
- Curated video grid grouped by year or event, from a hand-picked list.
- Link to the full YouTube channel.

### Apps

Hand-written cards: name, one-line pitch, stack, status, and at most one link each.

| Card | Link |
|---|---|
| Meeko | meekoapp.com |
| TK Wallet | none (described only) |
| WeMove | none (described only) |
| Bingo | public GitHub repo |
| GitHub | github.com/tksaeku |

### Resume

The `resume-a` content rendered as a page in the site theme, with a "Download PDF" link to a PDF kept in `static/`. Location shown as "Portland, OR".

### Contact

One form: name, email, topic (Lesson / Monthly coaching / Workshop / Convention or event / Software / Other), message. The topic preselects from the `topic` query parameter. The form posts to a hosted form service that forwards to Andrew's inbox, protected by Cloudflare Turnstile. Success and failure states are shown inline. Below the form, `andrew@andrewsunada.com` appears as the large mail link from the Canva design. No other email address and no phone number is printed.

### Booking

"Book a lesson" opens Andrew's Calendly scheduling page for a private lesson in a pop-up over the site. Calendly's free plan allows one active event type, so only private lessons are bookable this way; monthly coaching, workshops, convention and software enquiries use the contact form. Payment stays outside the site (cash or Venmo).

- The button is a normal link to the Calendly page, so it works without JavaScript and opens Calendly directly if the pop-up cannot load.
- Calendly's script and stylesheet load only when the button is first clicked, never on page load.
- The Contact page carries the same button above the form.
- The Calendly link is one value in the content data. While it is empty, "Book a lesson" goes to `/contact?topic=lesson` instead.

## Visual identity

The look follows Andrew's Canva design, `docs/Andrew Sunada Personal Website Design.png`: an editorial page on warm paper, black-and-white photography, and vermilion as the only colour. It carries the same quiet Japanese influence as the resume in `~/Projects/career/resume/`. The Canva design sets the look; the menu, page list and coaching-first order come from this document.

| Token | Value | Use |
|---|---|---|
| `shu` | `#B44735` | The single accent: the italic surname, section numbers, markers, links, seal |
| `sumi` | `#242522` | Text and headings |
| `usuzumi` | `#6E6A66` | Secondary text and captions |
| `hairline` | `#DAD5CF` | Rules and borders |
| `paper` | `#F8F7F3` | Page background |
| `paper-band` | `#EFEEE9` | Full-width background of alternate sections |

- **Type:** a high-contrast display serif for headlines, set large with tight tracking, with its true italic used in vermilion for emphasis (the surname in the hero); Newsreader, the Canva design's headline font, in its large optical size. Body in DM Sans. Small labels are uppercase, letter-spaced sans. The `ANDREW SUNADA` wordmark is spaced serif capitals. All fonts self-hosted.
- **Section pattern:** each section has a left label column holding a vermilion number and an uppercase label (`01  COACHING`), with the headline and content in the wider right column. Sections are separated by hairlines, and alternate sections sit on `paper-band`. Paired sub-points sit side by side under a hairline ("As a dancer" / "As a coach"). Lists of offers are numbered rows between hairlines.
- **Photography:** black-and-white studio portraits from the photo library (`docs/photos.md`), with a small uppercase caption beneath and, on the hero, a thin offset corner line. Photos are served in modern formats at responsive sizes with `alt` text.
- **Motifs:** the 砂田 hanko seal beside the wordmark, square vermilion markers before labels, and arrow-ended underlined text links for actions. The resume's ensō watermark and brush rule are not used on the site.
- **Closing section:** a large headline and the address `andrew@andrewsunada.com` as an oversized underlined mail link, as in the Canva design.
- **Footer:** a hairline, copyright on the left, profile links on the right, and the photo credit "Photography by Doug Silton" linking to `https://dougsilton.com/`.
- Meets WCAG AA contrast; `shu` is used for large text and interactive elements, and for small text only where it passes on `paper`.

## Architecture

- **Framework:** SvelteKit with Svelte 5 and TypeScript, `@sveltejs/adapter-static`, every route prerendered, trailing-slash behaviour set so each route is a directory with `index.html` (works on Apache without rewrite rules).
- **Styling:** SCSS. Design tokens and mixins in shared SCSS files; component styles in scoped `<style lang="scss">` blocks. No Tailwind, no CSS Modules.
- **Content:** typed data files under `src/lib/content/` (coaching offers, workshops, drills, videos, apps, resume, WSDC record) with long-form copy in markdown. Pages render from these; no content is hard-coded in page markup.
- **Images:** chosen photos live in `src/lib/images/` and render through `@sveltejs/enhanced-img`, which emits AVIF/WebP at responsive widths with intrinsic dimensions. A typed photo list in the content data holds each photo's `alt` text and caption.
- **Video:** a click-to-load YouTube embed component (thumbnail first, `youtube-nocookie.com` iframe on click) fed by video IDs in the content data.
- **Search and AI metadata:** one `Seo` component used by every route, fed from the content data so the markup and the visible page never disagree.
  - Per page: unique `<title>`, meta description, canonical URL on `https://www.andrewsunada.com`, `lang`, Open Graph tags (title, description, type, URL, image, site name) and Twitter card tags, with a default share image in the site theme.
  - Structured data as JSON-LD:
    - `WebSite` and `Person` on every page — name, job titles (West Coast Swing coach, software engineer), description, image, `knowsAbout`, and `sameAs` listing the Instagram, Facebook, LinkedIn, YouTube and GitHub profiles and the WSDC registry entry.
    - `Service` entries with `Offer` prices on Coaching (private lessons, monthly coaching, workshops), with `areaServed` Portland, OR and Vancouver, WA, and the two workshop venues as `Place`.
    - `VideoObject` for each embedded video on Home and Dance.
    - `SoftwareApplication` for each app card on Apps.
    - `ProfilePage` on Resume, `ContactPage` on Contact, and `BreadcrumbList` on every inner page.
    - An `FAQPage` block on Coaching if the page carries question-and-answer copy.
  - Site files: `sitemap.xml` with last-modified dates, `robots.txt` that allows search and AI crawlers and points to the sitemap, `llms.txt` summarising who Andrew is, what he offers, rates, and the key page links in plain markdown, a web manifest, and favicons.
  - Semantic HTML: one `h1` per page, ordered headings, landmark elements, descriptive link text, and `alt` text on every image.
  - Google Search Console verification is supported through a meta tag value kept in configuration.
  - A test validates that every route emits a title, description, canonical URL and parseable JSON-LD.
- **Components** live in a folder each with co-located tests, PascalCase file names.

```
src/
  lib/
    components/   Header, Footer, Seal, Section, Photo, ArrowLink, VideoEmbed, Card, BookingButton, ContactForm …
    content/      *.ts data + *.md copy
    styles/       tokens, mixins, base
  routes/         +layout.svelte, +page.svelte per route
static/           fonts, resume PDF, images, favicon
```

## Release

- Work happens on a feature branch cut from `reset`; `main` is reset to the new site by PR once approved.
- GitHub Actions on push to `main`: install, lint, type-check, test, build, then `rsync` the build output to the DreamHost site directory over SSH. The SSH key, host and path are GitHub Actions secrets.
- Pull requests run the same checks without deploying.
- One-time hosting setup, done with Andrew's go-ahead: enable a Let's Encrypt certificate for the domain in DreamHost, force HTTPS, confirm the deploy user and web directory, and point the local `origin` remote at `tksaeku/andrewsunada.com`.

## Verification

- `svelte-check`, ESLint, and Vitest unit tests for content helpers and components with logic (contact form validation, topic preselect, video embed).
- A build-time check that every internal link and every content reference resolves.
- Manual pass on the built site at phone and desktop widths before first release.

## Left to the builder

- Exact copy, written from the research files and reviewed by Andrew before release.
- Which form service to use, and the Turnstile wiring.
- Which videos are featured, starting from the recommendations in research file 04.
- SVG drawing of the seal.
- Final photo choice per page, starting from `docs/photos.md`.
- Responsive breakpoints and the mobile menu behaviour.

## Open questions

| Question | Assumed until answered |
|---|---|
None.

## Settled

- Instagram is `https://www.instagram.com/andrewsunada/`; Facebook is `https://www.facebook.com/tksaeku/`.
- A half-hour monthly coaching session costs $50.
- The $65 private-lesson rate is for anyone currently an active student at a university or school; the Coaching page states that definition next to the rate.
- Rates are public, as listed under Coaching.
- 砂田 is the correct family kanji; the seal ships as designed.
- `docs/research/` stays out of the public repo through `.gitignore`.
- `andrew@andrewsunada.com` receives mail and is the address shown on the site.
- Photos are by Doug Silton and are credited in the footer.
- LinkedIn is `linkedin.com/in/andrewsunada`; YouTube is `youtube.com/@AndrewSunada`; GitHub is `github.com/tksaeku`.
