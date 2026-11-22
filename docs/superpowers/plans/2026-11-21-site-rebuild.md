# andrewsunada.com Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build andrewsunada.com as a prerendered SvelteKit site that leads with West Coast Swing coaching, carries the software portfolio second, and deploys to DreamHost on push to `main`.

**Booking:** "Book a lesson" opens Andrew's Calendly page (free plan, one event type: private lesson) in a pop-up; everything else uses the contact form.

**Architecture:** SvelteKit with `adapter-static` prerenders six routes to plain HTML. All copy, rates, videos, apps and profile links live in typed content modules under `src/lib/content/`; pages and the `Seo` component both render from those modules so visible content and metadata cannot drift. GitHub Actions runs checks and rsyncs `build/` to DreamHost.

**Tech Stack:** SvelteKit 2, Svelte 5 (runes), TypeScript, `@sveltejs/adapter-static`, SCSS, Vitest + `@testing-library/svelte`, ESLint, GitHub Actions, DreamHost (Apache static hosting), Cloudflare Turnstile, a hosted form service.

**Spec:** `docs/superpowers/specs/2026-11-21-site-rebuild-design.md` — read it before any task. Source material for copy: `docs/research/` (local only, git-ignored). Start at **Start here** below.

## Start here

This plan is written to be picked up by a fresh session with no memory of the planning conversation.

**Read first, in this order:** this plan; the spec (`docs/superpowers/specs/2026-11-21-site-rebuild-design.md`); the Canva design image (`docs/Andrew Sunada Personal Website Design.png`); `docs/photos.md`; `docs/research/README.md`. Open the numbered research files only at the sections a task names.

**Repo state at handoff:**
- Checked-out branch is `reset`, whose tree is only `public/` (a "Coming Soon" page).
- Untracked and waiting to be committed in Task 1: `.gitignore`, `CLAUDE.md`, `docs/superpowers/`, `docs/photos.md`, the Canva design PNG.
- Git-ignored and never committed: `docs/research/` (private notes), `assets/photos/` (56 web-size photos, 15 MB).
- The local `origin` remote names `samuraijs/andrewsunada.com`, a username that now belongs to a stranger. GitHub redirects it today, but it is corrected in Task 12 with Andrew's go-ahead; do not push before then.

**What Andrew has approved:** the spec, this plan's scope, and every value under Global Constraints.

**What needs Andrew's explicit go-ahead when reached:** starting execution; any push, PR or merge; every hosting step in Task 12; publishing the resume PDF if it contains contact details.

**Inputs still owed by Andrew** (none blocks Tasks 1–9):

| Input | Needed by | Until then |
|---|---|---|
| Calendly private-lesson link | Task 3 (`privateLessonBookingUrl`) | Leave `''`; the button falls back to the contact form |
| Body font name from Canva | Task 2 | Use DM Sans |
| Form-service account and endpoint | Task 10 | Build and test against a mocked endpoint; stop before the live send |
| Cloudflare Turnstile site key | Task 10 | Same |
| DreamHost user, path and SSH access | Task 12 | Stop and ask |
| Review of all site copy | Task 12, on the PR | — |

**Execution:** run the tasks in order in one session (superpowers:executing-plans); each task depends on the interfaces of the ones before it. Per Andrew's global instructions, avoid subagents for work that is a handful of tool calls, never run subagents on Opus or Fable, and use the cheapest fitting agent when one is warranted. After Task 12's PR is open, request one whole-branch review.

**Definition of done:** `npm run verify` passes; the six routes, `sitemap.xml`, `robots.txt` and `llms.txt` are served over HTTPS at `https://www.andrewsunada.com`; Andrew has approved the copy.

## Global Constraints

- Load the `/tkjs` skill before writing any JS/TS; load `/tkgithub` before any commit, branch, push or PR. Commit steps below follow `/tkgithub` message conventions.
- Task 1 invokes the `app-generator` skill first and confirms this stack as the deviation from its defaults (no Go/MongoDB server).
- Work on branch `feat/site-rebuild`, cut from `reset`. Never merge, rebase onto, or cherry-pick from `dev`, `main`, `rework`, `feat/image` or `update/design`.
- The repo is public. Never commit anything from `docs/research/`, student names, coach or partner names taken from private notes, a home address, a phone number, or a personal email address.
- Resume copy uses `~/Projects/career/resume/resume-a.html` wording only. Location is "Portland, OR".
- Never link `samuraijs`, `SwingCoder911`, parked domains, or private repos.
- Canonical origin: `https://www.andrewsunada.com`. Every route is a directory with `index.html` (`trailingSlash: 'always'`).
- Visual reference: `docs/Andrew Sunada Personal Website Design.png` (the Canva design). Match its layout language — label column with vermilion numbers, large display-serif headlines, hairlines, alternating paper bands, black-and-white photos — while keeping this plan's menu and page list.
- Colours: shu `#B44735`, sumi `#242522`, usuzumi `#6E6A66`, hairline `#DAD5CF`, paper `#F8F7F3`, paper-band `#EFEEE9`. Shu is the only accent; photos are black and white.
- Photos come from `assets/photos/` (git-ignored library, catalogued in `docs/photos.md`). Copy only the chosen files into `src/lib/images/`.
- Fonts, all self-hosted: Newsreader (variable, with italic and the optical-size axis; headlines use the large optical size) for headlines and the wordmark; DM Sans for body and labels; Shippori Mincho 600 only for the kanji in the seal.
- Styling is SCSS in scoped `<style lang="scss">` blocks plus shared files in `src/lib/styles/`. No Tailwind, no CSS Modules.
- One folder per component with a PascalCase `.svelte` file and co-located `.test.ts`. Shared types in `types.ts`. No barrel imports. Tests use local setup, no `beforeEach`.
- Code comments and docs describe the current state, never history.
- Profile URLs: Instagram `https://www.instagram.com/andrewsunada/`, Facebook `https://www.facebook.com/tksaeku/`, LinkedIn `https://www.linkedin.com/in/andrewsunada`, YouTube `https://www.youtube.com/@AndrewSunada`, GitHub `https://github.com/tksaeku`.
- Rates: private lesson $80/hour, or $65/hour for anyone currently an active student at a university or school. Monthly coaching $100 per hour of coaching sessions, $50 for a half-hour session.

## Review Focus

1. **Contact form submission fails** (network down, service error, Turnstile rejects): the visitor keeps what they typed and sees an inline error with a retry; nothing is silently lost. Pinned in Task 10.
2. **Unknown or missing `topic` query value** on `/contact/`: the form falls back to no preselection rather than breaking or showing a blank option. Pinned in Task 10.
3. **JavaScript disabled or slow**: every page's content, the menu links and a plain link to each video on YouTube are present in the prerendered HTML. Pinned in Tasks 4, 6 and 11.
4. **Deep link or refresh on Apache**: `/coaching/` served directly returns the page, and an unknown path returns a themed 404 with the menu. Pinned in Tasks 1 and 11.
5. **A profile or app link with an empty URL**: the link is omitted from the page and from `sameAs`, never rendered as a dead anchor. Pinned in Tasks 4 and 5.
6. **Calendly unavailable** (script blocked, offline, or no link configured): "Book a lesson" still takes the visitor somewhere useful — the Calendly page itself, or the contact form when no link is set. Pinned in Task 6.

---

## File Structure

```
.github/workflows/ci.yml            checks on PRs; checks + deploy on main
CLAUDE.md                           stack, commands, content-editing guide, privacy rules
README.md                           what the site is, how to run and release it
svelte.config.js  vite.config.ts  tsconfig.json  eslint.config.js  package.json
scripts/checkBuild.ts               link + metadata check over build/
src/
  app.html
  lib/
    styles/_tokens.scss  _mixins.scss  base.scss  fonts.scss
    content/
      types.ts                      all content types and the ContactTopic enum
      site.ts                       identity, canonical origin, social links, navigation
      coaching.ts                   offers, rates, venues, workshops
      drills.ts                     drill library
      videos.ts                     curated videos
      wsdc.ts                       competition record
      apps.ts                       app cards
      resume.ts                     resume sections
      *.test.ts                     value tests beside each module
    seo/
      structuredData.ts             JSON-LD builders
      structuredData.test.ts
      pageMeta.ts                   per-route title/description/path
    components/
      Seo/  Header/  Footer/  SocialLinks/  Seal/  Section/  Photo/  ArrowLink/
      VideoEmbed/  Card/  RateList/  ContactForm/  BookingButton/
  routes/
    +layout.ts  +layout.svelte  +error.svelte
    +page.svelte                    Home
    coaching/+page.svelte  dance/+page.svelte  apps/+page.svelte
    resume/+page.svelte    contact/+page.svelte
    sitemap.xml/+server.ts  robots.txt/+server.ts  llms.txt/+server.ts
static/
  fonts/  images/  favicon.svg  site.webmanifest  .htaccess
  andrew-sunada-resume.pdf
```

---

### Task 1: Project scaffold

**Files:**
- Create: `package.json`, `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `src/app.html`, `src/routes/+layout.ts`, `src/routes/+layout.svelte`, `src/routes/+page.svelte`, `src/routes/+error.svelte`, `static/.htaccess`, `README.md`
- Modify: `CLAUDE.md` (exists; add the commands and the content-editing guide), `.gitignore` (add `node_modules/`, `build/`, `.svelte-kit/`, `.env*`)
- Delete: `public/` (the "Coming Soon" page)
- Test: `src/routes/layout.test.ts`

**Interfaces:**
- Produces: npm scripts `dev`, `build`, `preview`, `check` (svelte-check), `lint`, `test` (vitest run), `verify` (`check && lint && test && build && check:build`); `build/` as output directory; `$lib` alias.

- [ ] **Step 1:** Invoke `app-generator`, confirm the stack deviation, load `/tkjs` and `/tkgithub`. Create branch `feat/site-rebuild` from `reset`.
- [ ] **Step 2:** Scaffold SvelteKit (Svelte 5, TypeScript strict) with `@sveltejs/adapter-static` (`fallback: undefined`, `pages: 'build'`), `sass-embedded`, Vitest with jsdom and `@testing-library/svelte`, ESLint with the Svelte and TypeScript plugins.
- [ ] **Step 3: Write the failing test** `src/routes/layout.test.ts`:

```ts
import { prerender, trailingSlash } from './+layout';
describe('root layout options', () => {
    it('prerenders every route as a directory', () => {
        expect(prerender).toBe(true);
        expect(trailingSlash).toBe('always');
    });
});
```

- [ ] **Step 4:** Run `npm run test` — expect FAIL (exports missing). Add `export const prerender = true; export const trailingSlash = 'always';` to `src/routes/+layout.ts`. Run again — expect PASS.
- [ ] **Step 5:** `src/app.html` sets `<html lang="en">`. `+page.svelte` renders a placeholder `h1` "Andrew Sunada". `+error.svelte` renders the status and a link home. `static/.htaccess` contains `ErrorDocument 404 /404.html` and a rule forcing HTTPS; configure prerendering so the error page is emitted as `build/404.html`.
- [ ] **Step 6:** Extend the existing `CLAUDE.md` with the npm commands and a short guide to editing content, and replace its "Status" section with a description of the built site. Write `README.md` (purpose, run, release).
- [ ] **Step 7:** Run `npm run check && npm run lint && npm run test && npm run build`. Expected: all pass; `build/index.html` and `build/404.html` exist.
- [ ] **Step 8:** Commit, including the untracked planning files listed under Start here. Confirm with `git status` that nothing under `docs/research/` or `assets/photos/` is staged.

---

### Task 2: Theme and motifs

**Files:**
- Create: `src/lib/styles/_tokens.scss`, `_mixins.scss`, `base.scss`, `fonts.scss`; `static/fonts/` (Newsreader variable roman and italic, DM Sans, Shippori Mincho 600 as woff2, with licence files); `src/lib/components/Seal/Seal.svelte`, `Section/Section.svelte`, `Photo/Photo.svelte`, `ArrowLink/ArrowLink.svelte` with a `.test.ts` each; `src/lib/images/` (chosen photos); `src/lib/content/photos.ts`
- Modify: `src/routes/+layout.svelte` (import `base.scss`), `vite.config.ts` (SCSS `loadPaths` so components can `@use 'tokens'`)

**Interfaces:**
- Produces: SCSS variables `$shu`, `$sumi`, `$usuzumi`, `$hairline`, `$paper`, `$paper-band`, `$font-display`, `$font-body`, `$gutter-label: 6rem`, breakpoints `$narrow: 40rem`, `$wide: 64rem`; mixin `label-gutter` (asymmetric grid with a left label column that stacks below `$narrow`); matching CSS custom properties on `:root`.
- Produces components: `<Seal size={number} />` (hanko with 砂田, `aria-hidden="true"`); `<Section number={string} label={string} headline={string} isBanded={boolean}>` (label column with vermilion number and uppercase label, `h2` headline, default slot; `isBanded` applies `paper-band`); `<Photo photo={SitePhoto} hasCornerLine={boolean} />` (enhanced image, `alt`, uppercase caption); `<ArrowLink href={string}>` (underlined uppercase action link with arrow). `photos.ts` exports `type SitePhoto = { key: string; source: Picture; alt: string; caption: string }` and `sitePhotos: Record<string, SitePhoto>` with keys `hero`, `dance`, `coachingLessons`, `coachingWorkshops`, `danceHeader`, `professional`, `bio`, `contact`.

- [ ] **Step 1: Write failing tests:** `Seal` renders an SVG containing the text `砂田` and is `aria-hidden`; `Section` renders the number, the label and an `h2` with the headline, and adds the banded class only when `isBanded`; `Photo` renders an `img` with the photo's `alt`, `width` and `height` attributes and the caption text; `ArrowLink` renders an anchor with the given `href`; every entry in `sitePhotos` has non-empty `alt` text.
- [ ] **Step 2:** Run `npm run test` — expect FAIL.
- [ ] **Step 3:** Implement tokens with the Global Constraints values, base styles (paper background, sumi text, shu links with visible focus ring, hairline rules), self-hosted font faces with `font-display: swap`, and the four components. Add `@sveltejs/enhanced-img`. Copy these photos from `assets/photos/` into `src/lib/images/` with descriptive kebab-case names, one per `sitePhotos` key: `hero` ← `DSC00888-2`, `dance` ← `DSC00975-2`, `coachingLessons` ← `DSC00971-3`, `coachingWorkshops` ← `DSC00954-2`, `danceHeader` ← `DSC00635-2`, `professional` ← `DSC00986-2`, `bio` ← `DSC01254-2`, `contact` ← `DSC00784-2`. Check each is the black-and-white version before copying; if one is colour, use its sibling file. Write `alt` text that describes the photo (for example "Andrew Sunada in a black t-shirt, leaning toward the camera"), and short uppercase-style captions in the manner of the Canva design. Reference `~/Projects/career/resume/assets/` for the seal shape.
- [ ] **Step 4:** Check contrast: sumi on paper and usuzumi on paper meet WCAG AA for body text; shu on paper is used only where it passes (large text, UI). Record the measured ratios in a comment in `_tokens.scss`.
- [ ] **Step 5:** Run `npm run test && npm run check` — expect PASS. Commit.

---

### Task 3: Content modules

**Files:**
- Create: `src/lib/content/types.ts`, `site.ts`, `coaching.ts`, `drills.ts`, `videos.ts`, `wsdc.ts`, `apps.ts`, `resume.ts`, and a `.test.ts` beside each data module

**Interfaces:**
- Produces (`types.ts`):

```ts
export enum ContactTopic {
    Lesson = 'lesson', MonthlyCoaching = 'monthly-coaching', Workshop = 'workshop',
    Event = 'event', Software = 'software', Other = 'other',
}
export type SocialLink = { name: string; url: string };
export type NavigationItem = { label: string; path: string };
export type Rate = { label: string; amountUsd: number; unit: string; note?: string };
export type CoachingOffer = {
    slug: string; title: string; summary: string; details: string[];
    rates: Rate[]; contactTopic: ContactTopic;
};
export type Venue = { name: string; url: string; schedule: string; locality: string; region: string };
export type Workshop = { slug: string; title: string; level: string; outline: string[] };
export type Drill = { title: string; topic: string; description: string };
export type Video = { youtubeId: string; title: string; event: string; year: number; isFeatured: boolean };
export type Placement = { event: string; year: number; division: string; place: number };
export type AppProject = {
    slug: string; name: string; pitch: string; stack: string[]; status: string;
    linkUrl: string; linkLabel: string;
};
export type ResumeRole = { employer: string; title: string; start: string; end: string; highlights: string[] };
```

- Produces (`site.ts`): `siteOrigin`, `siteName`, `personName`, `tagline`, `shortBio`, `socialLinks: SocialLink[]`, `navigationItems: NavigationItem[]`, `getVisibleSocialLinks(): SocialLink[]` (drops entries with an empty `url`), `photographerCredit: { name: 'Doug Silton'; url: 'https://dougsilton.com/' }`, `contactEmail` (`'andrew@andrewsunada.com'`), `privateLessonBookingUrl: string` (Andrew's Calendly scheduling link; `''` until he supplies it), `lessonContactPath` (`'/contact/?topic=lesson'`).
- Produces: `coachingOffers`, `venues`, `workshops`, `studentRateDefinition` (`coaching.ts`); `drills`; `videos`, `getFeaturedVideos()`; `wsdcRecord: { wsdcId: number; division: string; registryUrl: string; placements: Placement[] }`; `appProjects`; `resumeSummary`, `resumeRoles`, `resumeSkills`, `resumeEducation`, `resumePdfPath`.

- [ ] **Step 1: Write failing tests** with the spec's exact values:

```ts
// site.test.ts
expect(siteOrigin).toBe('https://www.andrewsunada.com');
expect(navigationItems.map(({ label }) => label))
    .toEqual(['Coaching', 'Dance', 'Apps', 'Resume', 'Contact']);
expect(navigationItems.every(({ path }) => path.endsWith('/'))).toBe(true);
expect(socialLinks.map(({ name }) => name))
    .toEqual(['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'GitHub']);
expect(socialLinks.find(({ name }) => name === 'Facebook')?.url)
    .toBe('https://www.facebook.com/tksaeku/');
// getVisibleSocialLinks drops a link whose url is ''

// coaching.test.ts
const privateLessons = coachingOffers.find(({ slug }) => slug === 'private-lessons');
expect(privateLessons?.rates.map(({ amountUsd }) => amountUsd)).toEqual([80, 65]);
const monthlyCoaching = coachingOffers.find(({ slug }) => slug === 'monthly-coaching');
expect(monthlyCoaching?.title).toBe('Monthly coaching');
expect(monthlyCoaching?.rates.map(({ amountUsd }) => amountUsd)).toEqual([100, 50]);
expect(coachingOffers.map(({ slug }) => slug))
    .toEqual(['private-lessons', 'monthly-coaching', 'workshops', 'conventions']);
expect(studentRateDefinition).toContain('active student at a university or school');
expect(venues.map(({ name }) => name)).toEqual(['Dance with Joy Studios', 'Norse Hall']);
expect(workshops.map(({ level }) => level))
    .toEqual(['Level 1', 'Level 2', 'Advanced', 'All-Star']);

// wsdc.test.ts
expect(wsdcRecord.wsdcId).toBe(8715);
expect(wsdcRecord.division).toBe('All-Stars');

// videos.test.ts — ids are unique, 11 characters, and exactly three are featured
// apps.test.ts — names equal ['Meeko', 'TK Wallet', 'WeMove', 'Bingo'];
//   Meeko links to https://www.meekoapp.com; TK Wallet and WeMove have linkUrl ''
// every module: no string contains 'samuraijs' or 'SwingCoder911'
```

- [ ] **Step 2:** Run `npm run test` — expect FAIL.
- [ ] **Step 3:** Implement the modules. Every string is public copy written in Andrew's first-person voice, from these sources:

| Module | Source | Notes |
|---|---|---|
| `site.ts` `shortBio`, `tagline` | Research 05 §2 "Public bio (verbatim)", §6 "Voice and phrases worth reusing" | Condense the bio to about 60 words; the tagline builds on "present and connected" |
| `coaching.ts` offers | Research 05 §3 "Coaching offer", "Formats and levels", "Philosophy and topics" | Rates come from Global Constraints, not from the research file, which holds older figures. The monthly-coaching offer is titled "Monthly coaching" |
| `coaching.ts` venues | Global Constraints and spec | Dance with Joy Studios, "some Saturdays", Portland, OR; Norse Hall, "some Wednesdays", Portland, OR. Find each venue's official website with a web search and use that URL |
| `coaching.ts` workshops | Research 05 §3 "Formats and levels" | Four entries: Level 1, Level 2, Advanced, All-Star (the bootcamp). 3–5 outline bullets each |
| `drills.ts` | Research 05 §3 "Drill library" | 8–12 drills, grouped by topic. Only drills from Andrew's own teaching files; nothing attributed to another instructor |
| `videos.ts` | Research 04 §5 "Recommended embeds", §2 "Andrew's competition footage by event" | 9–12 videos of Andrew competing. Featured three: `efsA9uA58Ss` (Rose City Swing 2025), `PU8n-yuadv8` (Retaliation Swing 2026), `UBOcaLpadTc` (SO Swing 2025). Titles are the public YouTube titles |
| `wsdc.ts` | Research 04 §3 "WSDC record" | ID 8715, All-Stars. Placements: podium finishes only (1st SwingCouver 2018; 2nd BridgeTown 2019, Dance N Play 2016, Bend Connection 2025; 3rd SwingCouver 2020). For `registryUrl`, confirm a working public link to the record with a web search before using it |
| `apps.ts` | Research 03 §4 "Project cards", §7 "Recommended showcase" | Meeko (link `https://www.meekoapp.com`), TK Wallet and WeMove (no link), Bingo (public repo link from research 03 §3; open the repo page to confirm it is public and holds no secrets before linking) |
| `resume.ts` | `~/Projects/career/resume/resume-a.html`; research 02 §2, §4, §5 | Follow research 02 §11 "Not for the public site" and its phrasing limits |
- [ ] **Step 4:** Read every string against the Global Constraints privacy rules. Remove any name of a student, coach, partner or competitor.
- [ ] **Step 5:** Run `npm run test && npm run check` — expect PASS. Commit.

---

### Task 4: Site chrome

**Files:**
- Create: `src/lib/components/Header/Header.svelte`, `Footer/Footer.svelte`, `SocialLinks/SocialLinks.svelte` with a `.test.ts` each
- Modify: `src/routes/+layout.svelte`, `src/routes/+error.svelte`

**Interfaces:**
- Consumes: `navigationItems`, `getVisibleSocialLinks`, `personName` from `site.ts`; `Seal`.
- Produces: `<Header currentPath={string} />`, `<Footer />`, `<SocialLinks links={SocialLink[]} />`.

- [ ] **Step 1: Write failing tests:**
  - `Header` renders a `nav` landmark with five links in order whose `href`s equal the `navigationItems` paths, and the wordmark links to `/`.
  - The link matching `currentPath` has `aria-current="page"`.
  - The menu toggle is a `button` with `aria-expanded` that flips on click; the nav links are in the DOM before any interaction (works without JavaScript).
  - `SocialLinks` renders one anchor per link with `rel="me noopener"` and an accessible name; given a link with `url: ''`, it renders no anchor for it.
  - `Footer` contains the five profile links, the current year, and a link with the text "Doug Silton" to `https://dougsilton.com/` following "Photography by".
- [ ] **Step 2:** Run `npm run test` — expect FAIL.
- [ ] **Step 3:** Implement. Below `$narrow` the menu collapses behind the toggle using CSS that leaves links reachable when scripting is off. `+layout.svelte` renders skip link, `Header`, `<main id="main">`, `Footer`. `+error.svelte` uses the same chrome.
- [ ] **Step 4:** Run `npm run test && npm run check` — expect PASS. Commit.

---

### Task 5: Search and AI metadata

**Files:**
- Create: `src/lib/seo/pageMeta.ts`, `src/lib/seo/structuredData.ts`, `src/lib/seo/structuredData.test.ts`, `src/lib/components/Seo/Seo.svelte`, `Seo.test.ts`, `src/routes/sitemap.xml/+server.ts`, `src/routes/robots.txt/+server.ts`, `src/routes/llms.txt/+server.ts`, `static/site.webmanifest`, `static/favicon.svg`, `static/images/share-default.png` (1200×630, theme colours)
- Modify: `src/app.html` (manifest, favicon, theme colour), `src/routes/+layout.svelte`

**Interfaces:**
- Consumes: everything Task 3 produces.
- Produces (`pageMeta.ts`): `type PageMeta = { path: string; title: string; description: string; breadcrumbLabel: string }`; `pageMetaByPath: Record<string, PageMeta>` for `/`, `/coaching/`, `/dance/`, `/apps/`, `/resume/`, `/contact/`; `getCanonicalUrl(path: string): string`.
- Produces (`structuredData.ts`), each returning a plain JSON-LD object:
  `buildWebSite()`, `buildPerson()`, `buildCoachingServices()`, `buildVideoObjects(videos: Video[])`, `buildSoftwareApplications(apps: AppProject[])`, `buildBreadcrumbList(meta: PageMeta)`, `buildProfilePage()`, `buildContactPage()`.
- Produces: `<Seo meta={PageMeta} structuredData={object[]} />` rendering into `<svelte:head>`. Config `PUBLIC_GOOGLE_SITE_VERIFICATION` (optional).

- [ ] **Step 1: Write failing tests:**

```ts
// structuredData.test.ts
const person = buildPerson();
expect(person['@type']).toBe('Person');
expect(person.name).toBe('Andrew Sunada');
expect(person.sameAs).toEqual(expect.arrayContaining([
    'https://www.instagram.com/andrewsunada/', 'https://www.facebook.com/tksaeku/',
    'https://www.linkedin.com/in/andrewsunada', 'https://www.youtube.com/@AndrewSunada',
    'https://github.com/tksaeku',
]));
expect(person.sameAs).not.toContain('');
const services = buildCoachingServices();
const prices = services.flatMap(({ offers }) => offers.map(({ price }) => price));
expect(prices).toEqual(expect.arrayContaining(['80', '65', '100', '50']));
expect(services.every(({ offers }) => offers.every(({ priceCurrency }) => priceCurrency === 'USD'))).toBe(true);
expect(buildBreadcrumbList(pageMetaByPath['/coaching/']).itemListElement).toHaveLength(2);
// every pageMeta: title unique, title <= 60 chars, description 70-160 chars
// getCanonicalUrl('/coaching/') === 'https://www.andrewsunada.com/coaching/'

// Seo.test.ts — renders title, meta description, link[rel=canonical], og:title,
// og:description, og:url, og:image (absolute URL), og:type, twitter:card,
// and one script[type="application/ld+json"] per object whose text parses as JSON;
// a string containing '</script>' in structured data is escaped
```

- [ ] **Step 2:** Run `npm run test` — expect FAIL.
- [ ] **Step 3:** Implement builders (areaServed Portland, OR and Vancouver, WA; venues as `Place`; `sameAs` from `getVisibleSocialLinks()` plus `wsdcRecord.registryUrl`; `knowsAbout` West Coast Swing and software engineering), `Seo`, and the three endpoints (all `prerender = true`): `sitemap.xml` lists the six canonical URLs with `lastmod`; `robots.txt` allows all agents including named AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`) and points to the sitemap; `llms.txt` is markdown with who Andrew is, each offer with its rate, the student-rate definition, venues, and the six page links — generated from the content modules.
- [ ] **Step 4:** `+layout.svelte` renders `<Seo>` with `buildWebSite()` and `buildPerson()` plus the page's own list, using `pageMetaByPath[page.url.pathname]`.
- [ ] **Step 5:** Run `npm run test && npm run build` — expect PASS; `build/sitemap.xml`, `build/robots.txt`, `build/llms.txt` exist. Commit.

---

### Task 6: Shared content components

**Files:**
- Create: `src/lib/components/VideoEmbed/VideoEmbed.svelte`, `Card/Card.svelte`, `RateList/RateList.svelte`, `BookingButton/BookingButton.svelte`, `BookingButton/calendly.ts` with a `.test.ts` each

**Interfaces:**
- Produces: `<VideoEmbed video={Video} />`, `<Card title={string} href={string}>` (default slot; no anchor when `href` is `''`), `<RateList rates={Rate[]} />`, `<BookingButton bookingUrl={string} fallbackPath={string} label={string} />` (label defaults to "Book a lesson"), and in `calendly.ts`: `loadCalendlyWidget(): Promise<void>` (injects `https://assets.calendly.com/assets/external/widget.css` and `widget.js` once, rejects on load error) and `openCalendlyPopup(bookingUrl: string): Promise<void>`.

- [ ] **Step 1: Write failing tests:**
  - `VideoEmbed` initially renders a button with the thumbnail `https://i.ytimg.com/vi/{youtubeId}/hqdefault.jpg`, `alt` equal to the video title, no `iframe`, and a plain anchor to `https://www.youtube.com/watch?v={youtubeId}`.
  - Clicking the button renders an `iframe` whose `src` starts with `https://www.youtube-nocookie.com/embed/{youtubeId}` and has a `title`.
  - `Card` with `href: ''` renders no anchor; with an external `href` the anchor has `rel="noopener"`.
  - `BookingButton` with a `bookingUrl` renders an anchor whose `href` is that URL with `rel="noopener"`; before any click the document contains no element whose `src` or `href` includes `calendly.com/assets`.
  - Clicking it prevents navigation, loads the widget once (a second click does not inject a second script) and calls `Calendly.initPopupWidget({ url: bookingUrl })`.
  - When the widget fails to load, the click navigates to `bookingUrl` instead.
  - With `bookingUrl: ''` it renders an anchor to `fallbackPath` and never loads Calendly.
  - `RateList` renders `$80` and `hour` for `{ amountUsd: 80, unit: 'hour' }` and shows `note` when present.
- [ ] **Step 2:** Run tests — FAIL. Implement. Run `npm run test && npm run check` — PASS. Commit.

---

### Task 7: Home and Coaching pages

**Files:**
- Modify: `src/routes/+page.svelte`
- Create: `src/routes/coaching/+page.svelte`, `src/routes/home.test.ts`, `src/routes/coaching/coaching.test.ts`

**Interfaces:**
- Consumes: content modules, `sitePhotos`, `Section`, `Photo`, `ArrowLink`, `BookingButton`, `VideoEmbed`, `Card`, `RateList`, `buildCoachingServices`, `buildVideoObjects`.

- [ ] **Step 1: Write failing tests:**
  - Home: exactly one `h1`; a `BookingButton` labelled "Book a lesson" whose `href` is `privateLessonBookingUrl` (or `/contact/?topic=lesson` while that is empty); a link "Watch me dance" to `/dance/`; three video embeds; the hero `h1` contains "Andrew" and "Sunada" with the surname in an `em`; the hero photo is `sitePhotos.hero`; numbered sections appear in the order `01` Coaching, `02` Dance (with three video embeds), `03` Engineering, `04` Contact; the Engineering section links to `/apps/` and `/resume/`.
  - Coaching: one `h1`; headings "Private lessons", "Monthly coaching", "Workshops", "Convention staff and workshops", "Drill library" in that order; text `$80`, `$65`, `$100`, `$50`; the student-rate definition text; both venue names as links; "some Saturdays" and "some Wednesdays"; the private-lessons block has a "Book a lesson" `BookingButton`; the monthly-coaching block links to `/contact/?topic=monthly-coaching`; the workshops block links to `/contact/?topic=workshop`; convention block links to `/contact/?topic=event`; no occurrence of "monthly plan" (case-insensitive).
- [ ] **Step 2:** Run tests — FAIL. Implement both pages from the spec's Home and Coaching sections, with the `Section` layout and photos from `sitePhotos` and page-specific structured data passed to `Seo`.
- [ ] **Step 3:** Run `npm run test && npm run check` — PASS. View both at 375px and 1280px in `npm run dev`; fix overflow. Commit.

---

### Task 8: Dance and Apps pages

**Files:**
- Create: `src/routes/dance/+page.svelte`, `src/routes/apps/+page.svelte`, and a `.test.ts` beside each

- [ ] **Step 1: Write failing tests:**
  - Dance: one `h1`; "All-Stars"; a link to `wsdcRecord.registryUrl`; one embed per entry in `videos`, grouped under year headings in descending order; a link to `https://www.youtube.com/@AndrewSunada`.
  - Apps: one `h1`; four cards in order Meeko, TK Wallet, WeMove, Bingo; Meeko links to `https://www.meekoapp.com`; TK Wallet and WeMove cards contain no anchor; a GitHub link to `https://github.com/tksaeku`.
- [ ] **Step 2:** Run tests — FAIL. Implement with `buildVideoObjects` and `buildSoftwareApplications` passed to `Seo`. Run `npm run test && npm run check` — PASS. Check both widths. Commit.

---

### Task 9: Resume page

**Files:**
- Create: `src/routes/resume/+page.svelte`, `src/routes/resume/resume.test.ts`, `static/andrew-sunada-resume.pdf`

- [ ] **Step 1: Write failing tests:** one `h1`; "Senior Staff Software Engineer" and "Quantum Metric"; "Portland, OR"; a download link to `/andrew-sunada-resume.pdf` with a `download` attribute; the rendered text contains no street address, no phone number pattern (`/\d{3}[-.\s]\d{3}[-.\s]\d{4}/`), no `@gmail.com`, and none of "looking for", "seeking", "open to".
- [ ] **Step 2:** Run tests — FAIL. Implement from `resume.ts` in the resume's date-gutter layout; pass `buildProfilePage()` to `Seo`. Copy the Resume A PDF from `~/Projects/career/resume/` into `static/` only after confirming the PDF itself carries no address or phone number; if it does, stop and report to Andrew instead of publishing it.
- [ ] **Step 3:** Run `npm run test && npm run check` — PASS. Commit.

---

### Task 10: Contact page and form

**Files:**
- Create: `src/lib/components/ContactForm/ContactForm.svelte`, `contactForm.ts` (validation and submit), `contactForm.test.ts`, `ContactForm.test.ts`, `src/routes/contact/+page.svelte`, `.env.example`

**Interfaces:**
- Consumes: `ContactTopic`, `SocialLinks`, `buildContactPage`.
- Produces (`contactForm.ts`):

```ts
export type ContactFormValues = { name: string; email: string; topic: ContactTopic | ''; message: string };
export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
export const parseTopic = (value: string | null): ContactTopic | '' => …;
export const validateContactForm = (values: ContactFormValues): ContactFormErrors => …;
export const submitContactForm = async (
    values: ContactFormValues, turnstileToken: string, endpoint: string,
): Promise<{ isSuccessful: boolean }> => …;
```

- Config: `PUBLIC_CONTACT_FORM_ENDPOINT`, `PUBLIC_TURNSTILE_SITE_KEY`.

- [ ] **Step 1:** Choose the form service: read the current docs for Formspree and Web3Forms and pick the one that verifies Cloudflare Turnstile tokens on its side and forwards to an inbox on a free or low tier. Andrew creates the account and the Turnstile widget (`/tkcloudflare`) and supplies the endpoint and site key; record the choice in `CLAUDE.md`.
- [ ] **Step 2: Write failing tests:**
  - `parseTopic('lesson')` is `ContactTopic.Lesson`; `parseTopic('event')` is `ContactTopic.Event`; `parseTopic('nonsense')`, `parseTopic('')` and `parseTopic(null)` are `''`.
  - `validateContactForm` returns errors for empty name, malformed email, empty topic, and a message under 10 characters; returns `{}` for valid values; trims whitespace before judging.
  - `submitContactForm` returns `{ isSuccessful: false }` when `fetch` rejects and when the response is not ok; `{ isSuccessful: true }` on a 200.
  - Component: topic select lists the six topics labelled "Lesson", "Monthly coaching", "Workshop", "Convention or event", "Software", "Other"; `initialTopic` preselects; submitting invalid values shows errors linked by `aria-describedby` and does not call `fetch`; on failure an inline `role="alert"` message appears and every field keeps its value; on success a `role="status"` confirmation replaces the form; the submit button is disabled while sending.
- [ ] **Step 3:** Run tests — FAIL. Implement. `contact/+page.svelte` reads `topic` from the URL on mount (prerendered page, so not at build time) and renders a "Book a lesson" `BookingButton` above the form, the form, the five profile links, and `buildContactPage()`. The only email address in the markup is `andrew@andrewsunada.com`, rendered below the form as the large mail link; no phone number appears.
- [ ] **Step 4:** Run `npm run test && npm run check` — PASS. With real keys in `.env`, submit once from `npm run dev` and confirm with Andrew that the message arrived. Commit (never commit `.env`).

---

### Task 11: Build verification

**Files:**
- Create: `scripts/checkBuild.ts`, `scripts/checkBuild.test.ts`
- Modify: `package.json` (`check:build`, `verify`)

**Interfaces:**
- Produces: `npm run check:build` — exits non-zero listing every failure.

- [ ] **Step 1: Write failing tests** for the pure helpers the script uses, run against small HTML fixtures: `findBrokenInternalLinks(pages)` reports an `href` with no matching file and passes one that resolves to `dir/index.html`; `findMetadataProblems(html)` reports a missing title, description, canonical, `og:image`, an `h1` count other than one, an `img` without `alt`, and unparseable JSON-LD.
- [ ] **Step 2:** Run tests — FAIL. Implement the helpers and the script, which walks `build/`, checks the six routes plus `404.html`, asserts `sitemap.xml`, `robots.txt` and `llms.txt` exist, asserts each route's HTML contains its main heading text without executing scripts, and fails if any built file contains `samuraijs`, `SwingCoder911` or `docs/research`.
- [ ] **Step 3:** Run `npm run verify`. Expected: all checks pass.
- [ ] **Step 4:** Run `npm run preview`, open each route directly by URL and one unknown path; confirm pages load and the unknown path shows the themed 404. Validate the Coaching and Home pages' JSON-LD with Google's Rich Results Test (paste the built HTML). Commit.

---

### Task 12: Release pipeline and hosting

**Files:**
- Create: `.github/workflows/ci.yml`
- Modify: `README.md`, `CLAUDE.md` (release section)

- [ ] **Step 1:** Load `/tkdevops`, `/tkdreamhost` and `/tkgithub`.
- [ ] **Step 2:** Write `ci.yml`: on `pull_request` and on `push` to `main`, run `npm ci` and `npm run verify` with `PUBLIC_*` values from repository variables. A `deploy` job, only on `push` to `main` and only after checks pass, rsyncs `build/` to DreamHost over SSH with `--delete`, using secrets `DREAMHOST_SSH_KEY`, `DREAMHOST_HOST`, `DREAMHOST_USER`, `DREAMHOST_PATH`, with the host key pinned in `known_hosts`.
- [ ] **Step 3: Hosting setup — each item needs Andrew's explicit go-ahead before it is done:**
  - Point local `origin` at `https://github.com/tksaeku/andrewsunada.com.git`.
  - Confirm the DreamHost user, web directory and that the domain is set to serve static files from it.
  - Create a deploy-only SSH key; add it to DreamHost and to GitHub secrets.
  - Enable the Let's Encrypt certificate for `andrewsunada.com` and `www.andrewsunada.com`; set `www` as the canonical host with HTTPS forced.
  - Add repository variables for the form endpoint and Turnstile site key.
- [ ] **Step 4:** Open a PR from `feat/site-rebuild` into `main`. Because the branch shares no content with `main`, the PR replaces `main`'s tree; say so in the PR description. Andrew reviews copy on the PR before merge.
- [ ] **Step 5:** After merge, confirm the workflow run is green, then check `https://www.andrewsunada.com/`, `/coaching/`, `/sitemap.xml`, `/robots.txt`, `/llms.txt` and an unknown path over HTTPS. Report the results with the actual status codes.
- [ ] **Step 6:** Hand Andrew the follow-ups outside this plan: verify the site in Google Search Console and submit the sitemap; rotate the credentials found in the old branches' history; add the site URL to the YouTube, Instagram, Facebook, LinkedIn and GitHub profiles.
