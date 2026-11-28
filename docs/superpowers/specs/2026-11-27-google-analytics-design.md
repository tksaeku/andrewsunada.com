# Google Analytics (GA4) — design

## Intent

Andrew wants the site's traffic to answer four questions:

1. **Does the site bring in coaching students?** Lesson bookings, coaching enquiries and the visits that led to them.
2. **Does it bring in software interest?** Software enquiries, app and code link clicks, resume reads.
3. **Which areas of the site get visited most, and what does a typical journey look like?**
4. **Who downloads the resume?** As far as GA4 can say without identifying anyone: city, country, device, the source that brought them (LinkedIn, a Google search, a direct link) and the pages they read first.

The site sends GA4 the events that answer those questions, and `docs/analytics.md` explains how to read them.

## Goals

- GA4 loads on every page of the production site and records a page view for the first page and every client-side navigation, with the correct path and title.
- Every page view and event carries the site area it happened in (`content_group`), so reports can be read by area as well as by page.
- Coaching leads and software leads are recorded as one key event, `generate_lead`, split by `lead_type` and `method`.
- Interest signals that are not leads are recorded too: booking pop-up opened, video played, resume downloaded, app links and profile links clicked.
- Nothing is sent from `npm run dev`, `npm run preview` without the ID, or tests.
- Andrew can stop his own visits from being counted.
- A `/privacy/` page says what is collected, linked from the footer.
- `docs/analytics.md` covers the GA4 property settings, the event list, the reports and explorations that answer each question above, and how to tag shared links.

## Non-goals

- A consent banner or Consent Mode. Andrew chose no banner (see Approaches); EU and UK visitors are tracked like everyone else.
- Identifying individual visitors, or companies by IP. GA4's terms forbid sending personal data, and Andrew chose the GA4-only picture for resume downloads.
- Gating the resume behind a form.
- Google Tag Manager.
- Server-side tagging, Measurement Protocol, BigQuery export.
- A dashboard or report page of our own. Reports are read in GA4.

## Anti-goals

- Sending anything that identifies a person: names, email addresses, message text or form field values. The contact form's topic is the only form value sent.
- Tracking that changes how the site behaves or looks: no extra clicks, no visible widgets, no slower first paint. The tag loads `async`.
- Double-counting page views (GA4's automatic history tracking and our manual page views both firing).
- Breaking an existing link, button or form if the GA4 script fails to load or is blocked. Every call is a no-op when `gtag` is missing.

## Constraints

- Static SvelteKit site prerendered with `adapter-static`; no server. Configuration reaches the build as `PUBLIC_` environment variables, which CI reads from GitHub repository variables (same pattern as `PUBLIC_TURNSTILE_SITE_KEY`).
- The repo is public. The measurement ID is public by nature (it ships in the HTML), so a repository variable is fine.
- Copy lives in `src/lib/content/`, not page markup (project rule).
- `npm run verify` must stay green, including `scripts/checkBuild.ts` (route list, metadata, internal links) and `scripts/ciWorkflow.test.ts`.
- Code follows `/tkjs`; tests follow the `unit-test-creator` conventions (Vitest, co-located, no `beforeEach`).
- The Calendly link (`privateLessonBookingUrl` in `src/lib/content/site.ts`) is still empty, so booking buttons fall back to a `mailto:` link. Booking events only start firing once that link is set; until then lesson leads arrive as email clicks.

## Approaches

**Consent.** Three options were considered: no banner plus a privacy page; a banner for everyone; a banner only for visitors whose time zone is in Europe. Andrew chose **no banner plus a privacy page**: the most data and the simplest build, accepting the legal risk for EU and UK visitors.

**Resume "who".** Considered: GA4 only (place, device, source); asking for name and email before download; a paid reverse-IP service naming companies. Andrew chose **GA4 only**.

**Implementation.**

- **A. gtag.js loaded by the site, events sent from a small typed module** (chosen). Events are defined in the repo, tested and reviewed; manual page views keep titles right on client-side navigation. Changing an event needs a deploy, which already happens on every push to `main`.
- B. Google Tag Manager. Events configurable without a deploy, but the configuration lives outside git and can't be tested, the script is heavier, and it adds a second tool to maintain. Not worth it for a one-person site whose owner writes the code.

Andrew chose **A**.

## Design

### Loading

- New variable `PUBLIC_GA_MEASUREMENT_ID` (format `G-XXXXXXXXXX`), declared in `src/app.d.ts`, set in CI from a repository variable of the same name, and listed in the README's variables table.
- When the variable is set, the prerendered HTML of every page includes the gtag.js script (`https://www.googletagmanager.com/gtag/js?id=…`, `async`) and the inline `dataLayer`/`gtag` bootstrap. When it is unset, nothing analytics-related is rendered and every tracking call is a no-op. Local dev and preview therefore send nothing unless the developer exports the ID on purpose.
- `gtag('config', id, { send_page_view: false })`. The site sends page views itself (below).

### Page views

- After every navigation, including the first load (SvelteKit `afterNavigate` in the root layout), send `page_view` with `page_location`, `page_path`, `page_title` (read after the new page's `<title>` is in place) and `content_group`.
- The 404 page sends a page view with `content_group: 'Not found'`.

### Site areas (`content_group`)

| Path | `content_group` |
|---|---|
| `/` | Home |
| `/coaching/`, `/dance/` | Coaching |
| `/apps/`, `/resume/` | Software |
| `/contact/` | Contact |
| `/privacy/` | Site |
| anything else (404) | Not found |

The mapping lives next to `pageMetaByPath` and covers every path in it; a test fails if a route has no area.

### Events

All events carry `content_group` for the page they happened on.

| Event | When | Parameters |
|---|---|---|
| `generate_lead` (key event) | Contact form sent successfully | `method: 'contact_form'`, `topic` (the topic label or `General`), `lead_type` |
| `generate_lead` (key event) | Click on any `mailto:` link | `method: 'email'`, `email_subject` (the mailto subject or `none`), `lead_type` |
| `generate_lead` (key event) | Calendly reports a booking scheduled (`calendly.event_scheduled` message) | `method: 'calendly'`, `lead_type: 'coaching'` |
| `booking_opened` | Calendly pop-up opens | — |
| `video_play` | A `VideoEmbed` play button is clicked | `video_id`, `video_title` |
| `resume_download` | Click on the resume PDF link | — |
| `app_link_click` | Click on an app's site or code link | `app_name`, `link_kind: 'site' \| 'code'` |
| `profile_link_click` | Click on a social profile link (GitHub, LinkedIn, Instagram, Facebook, YouTube, eBay) | `profile` |

**`lead_type`** is `coaching`, `software` or `general`:

- Contact form: Lesson, Monthly coaching, Workshop, Convention or event → `coaching`; Software → `software`; Other or no topic → `general`.
- Email: a subject that belongs to a coaching link (the lesson-booking and drill-library subjects in `site.ts`) → `coaching`; otherwise the page's area decides: Coaching → `coaching`, Software → `software`, anything else → `general`.
- Calendly: always `coaching`.

**How clicks are caught.** One click listener on the document, attached by the root layout, finds the clicked `<a>` and classifies it by its `href`: `mailto:` → `generate_lead`; the resume PDF path → `resume_download`; a URL matching an app's `linkUrl` or `codeUrl` in `apps.ts` → `app_link_click` with that app's name; a URL matching a profile in `site.ts` → `profile_link_click`. Classification is a pure function over the content modules, so it is unit-tested and needs no change to page markup. Links that match nothing send no custom event; GA4's enhanced measurement still records them as outbound clicks. Empty `linkUrl` or `codeUrl` values never match. The resume link also fires GA4's automatic `file_download`; that duplicate is expected, and reports use `resume_download`.

**Explicit calls.** The contact form (on success), `VideoEmbed` (on play) and the Calendly module (pop-up opened; a `message` listener for Calendly's `event_scheduled`) call the tracking module directly.

### Excluding Andrew's own visits

Visiting any page with `?analytics=off` stores a flag in `localStorage` and sets `window['ga-disable-<ID>'] = true` before any hit is sent; `?analytics=on` clears it. Every later visit from that browser is ignored. `docs/analytics.md` tells Andrew to do this once on each of his browsers and phones.

### Privacy page

- Route `/privacy/`, copy in a new content module `src/lib/content/privacyPolicy.ts` (the existing `privacy.test.ts` is the public-content safety test and keeps its name), an entry in `pageMetaByPath` (which also puts it in the sitemap), a heading in `checkBuild.ts`'s expected routes, and a "Privacy" link in the footer.
- Copy says, in plain words: the site uses Google Analytics to count visits and see which pages and links people use; GA4 sets cookies; what is collected (pages, clicks, approximate location, device, referring site; with Google signals, aggregated age and interest groups); the contact form's message goes to Andrew by email through Formspree and is not sent to analytics; Calendly and YouTube have their own policies when used; how to opt out (browser blockers or Google's opt-out add-on); contact `andrew@andrewsunada.com`.
- No historical or legal boilerplate beyond that.

### GA4 property settings (done by Andrew in the GA4 console, written up in `docs/analytics.md`)

- Create the property and a web data stream for `https://www.andrewsunada.com`; put the measurement ID in the `PUBLIC_GA_MEASUREMENT_ID` repository variable.
- Enhanced measurement: page views on history changes **off** (the site sends its own); scrolls, outbound clicks and file downloads **on**; site search, form interactions and video engagement **off** (no search, the form is tracked explicitly, and the no-cookie YouTube embed does not expose the player API).
- Data retention: 14 months (the default 2 months would empty explorations).
- Google signals: on, for demographics and cross-device journeys.
- Mark `generate_lead` as a key event.
- Register custom dimensions (event scope): `lead_type`, `method`, `topic`, `email_subject`, `app_name`, `link_kind`, `profile`, `video_title`.
- Link Search Console (the existing Domain property).
- Unwanted referrals: `calendly.com`, `formspree.io`.

### `docs/analytics.md`

- What is tracked: the events table above and where each one is sent from in code.
- How to read each question: area traffic (Reports → Engagement → Pages and screens, grouped by content group); coaching and software leads (key events by `lead_type` and `method`, with session source); journeys (Explore → Path exploration starting at session start; Funnel explorations for Coaching: coaching page → `booking_opened` → `generate_lead` coaching, and Software: apps or resume page → `resume_download` → `generate_lead` software); resume downloads (an exploration of `resume_download` by city, country, device, session source and landing page).
- Tagging shared links: UTM conventions for the Instagram bio, YouTube descriptions, LinkedIn profile and event flyers (`utm_source`, `utm_medium`, `utm_campaign` values to use).
- Excluding your own visits (`?analytics=off`).
- How to check events arrive (GA4 DebugView with the Google Analytics Debugger extension, or Realtime).
- Indexed from the docs table in `CLAUDE.md`; `docs/content.md` gets a line pointing at the privacy page's content module.

### Testing

- Unit tests for the area mapping (every route covered), link classification (each link kind, unmatched links, lead type rules), the tracking module (no-op without `gtag`, no-op when opted out, correct `gtag` calls), and the opt-out flag.
- Component tests: contact form sends `generate_lead` with the right topic and lead type only on success; `VideoEmbed` sends `video_play`; the Calendly module sends `booking_opened` and maps `calendly.event_scheduled` to a lead.
- Build check: when `PUBLIC_GA_MEASUREMENT_ID` is set the gtag script is in every page; when unset it is absent. `/privacy/` is in the expected routes.
- After deploy, Andrew confirms hits in GA4 Realtime (documented, not automated).

## Left to the builder

- Module and file layout under `src/lib/analytics/` and the exact tracking function signatures.
- Whether the bootstrap script is rendered from `app.html`, the root layout's `<svelte:head>`, or a component, as long as it is in the prerendered HTML when the ID is set.
- How the `?analytics=off` flag is read early enough to run before the first `page_view`.
- How the CI workflow test asserts the new variable.
- Privacy page wording within the points above and the site's voice.
