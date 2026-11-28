# Analytics

The site sends Google Analytics 4 (GA4) the page views and events that answer four questions:

1. Does the site bring in coaching students?
2. Does it bring in software interest?
3. Which areas get visited most, and what does a typical journey look like?
4. Who downloads the resume? (Place, device and source only. GA4 never identifies a person.)

The design is in [superpowers/specs/2026-11-27-google-analytics-design.md](superpowers/specs/2026-11-27-google-analytics-design.md). What visitors are told is on `/privacy/`, with copy in `src/lib/content/privacyPolicy.ts`.

## How it loads

- The measurement ID comes from `PUBLIC_GA_MEASUREMENT_ID` (format `G-XXXXXXXXXX`), set in CI from the repository variable of the same name. `getMeasurementId` in `src/lib/analytics/gtagSnippet.ts` refuses anything that is not a plain `G-` ID.
- With an ID, the `Analytics` component (`src/lib/components/Analytics/Analytics.svelte`, rendered by the root layout) puts the async gtag.js loader and an inline bootstrap into the `<head>` of every prerendered page. The bootstrap is built by `buildGtagBootstrap`: it applies `?analytics=off|on`, defines `gtag`, and configures the property with `send_page_view: false`.
- Without an ID nothing analytics-related is rendered and every tracking call does nothing. `npm run dev` and `npm run preview` therefore send nothing unless you export the ID on purpose.
- Every call goes through `trackEvent` in `src/lib/analytics/tracking.ts`, which does nothing when `gtag` is missing (blocked, not loaded, no ID) or the browser has opted out, and adds the page's `content_group`.
- `npm run check:build` fails if a page lacks the tag when the build had an ID, or carries it when the build had none.

## What is tracked

Every page view and event carries `content_group`, the site area of the page it happened on. The areas are `siteAreaByPath` in `src/lib/seo/pageMeta.ts`:

| Area (`content_group`) | Pages |
|---|---|
| Home | `/` |
| Coaching | `/coaching/`, `/dance/` |
| Software | `/apps/`, `/resume/` |
| Contact | `/contact/` |
| Site | `/privacy/` |
| Not found | Anything else (the 404 page) |

| Event | When | Parameters | Sent from |
|---|---|---|---|
| `page_view` | First load and every client-side navigation | `page_location`, `page_path`, `page_title` | `afterNavigate` in `src/routes/+layout.svelte` → `trackPageView` |
| `generate_lead` (key event) | Contact form sent successfully | `method: contact_form`, `topic`, `lead_type` | `src/lib/components/ContactForm/ContactForm.svelte` |
| `generate_lead` (key event) | Click on any `mailto:` link | `method: email`, `email_subject` (or `none`), `lead_type` | `classifyLinkClick` in `src/lib/analytics/linkClicks.ts` |
| `generate_lead` (key event) | Calendly reports a booking | `method: calendly`, `lead_type: coaching` | `src/lib/components/BookingButton/calendly.ts` |
| `booking_opened` | Calendly pop-up opens | — | `calendly.ts` |
| `video_play` | A video's play button is clicked | `video_id`, `video_title` | `src/lib/components/VideoEmbed/VideoEmbed.svelte` |
| `resume_download` | Click on the resume PDF link | — | `linkClicks.ts` |
| `app_link_click` | Click on an app's site or code link | `app_name`, `link_kind` (`site` or `code`) | `linkClicks.ts` |
| `profile_link_click` | Click on GitHub, LinkedIn, Instagram, Facebook, YouTube or eBay | `profile` | `linkClicks.ts` |

`lead_type` is `coaching`, `software` or `general` (rules in `src/lib/analytics/leads.ts`):

- Contact form: Lesson, Monthly coaching, Workshop, Convention or event → coaching; Software → software; Other → general.
- Email: the lesson-booking and drill-library subjects from `site.ts` → coaching on any page. Any other email link takes the page's area: Coaching → coaching, Software → software, anything else → general.
- Calendly: always coaching.

Links are classified by one click listener on the document (`listenForLinkClicks`), matched against `apps.ts` and the profile links in `site.ts`, so a new app or profile is tracked as soon as it is in the content module. Links that match nothing send no custom event; GA4's enhanced measurement still records outbound clicks. The resume link also fires GA4's own `file_download`; reports use `resume_download`.

Nothing that identifies a person is sent: no names, email addresses or message text. The contact form's topic is the only form value sent.

While `privateLessonBookingUrl` in `site.ts` is empty, booking buttons are email links, so lesson leads arrive as `generate_lead` with `method: email` and `email_subject: Book a lesson`. `booking_opened` and Calendly leads start once that link is set.

## GA4 property settings

Done once in the GA4 console (Admin):

1. Create a property and a **web data stream** for `https://www.andrewsunada.com`. Copy the measurement ID into the `PUBLIC_GA_MEASUREMENT_ID` repository variable (see the [README](../README.md#release-it)); the next push to `main` deploys with the tag.
2. **Enhanced measurement** (data stream settings): turn **off** "Page changes based on browser history events" (under Page views → Show advanced settings), site search, form interactions and video engagement. Leave scrolls, outbound clicks and file downloads **on**.
3. **Data retention** (Data collection and modification → Data retention): event data 14 months.
4. **Google signals** (Data collection): on.
5. **Key events**: mark `generate_lead` as a key event (it appears after the first one arrives; it can also be created in advance by name).
6. **Custom dimensions** (Custom definitions), all event scope: `lead_type`, `method`, `topic`, `email_subject`, `app_name`, `link_kind`, `profile`, `video_title`.
7. **Search Console links** (Product links): link the existing Domain property.
8. **Unwanted referrals** (data stream → Configure tag settings → List unwanted referrals): `calendly.com`, `formspree.io`.

## Reading the four questions

**Which areas get visited.** Reports → Engagement → Pages and screens. Change the primary dimension to **Content group** for area totals, then back to page path and screen class for single pages.

**Coaching and software leads.** Reports → Engagement → Key events → `generate_lead`, with `lead_type` and `method` as secondary dimensions. To see what brought them in, use Reports → Acquisition → Traffic acquisition filtered to the key event, or an exploration with `lead_type` as a dimension and session source / medium beside it. Software interest beyond leads: `app_link_click` by `app_name`, `resume_download`, and page views of the Software area.

**Journeys.** Explore → **Path exploration**, starting point *session start*, step by page title or content group. Two **funnel explorations** cover the conversions:

- Coaching: page view in content group Coaching → `booking_opened` → `generate_lead` where `lead_type` = coaching. Until the Calendly link exists, skip the middle step.
- Software: page view of `/apps/` or `/resume/` → `resume_download` → `generate_lead` where `lead_type` = software.

**Who downloads the resume.** Explore → Free form, filtered to event name `resume_download`. Rows: city, country, device category, session source / medium, landing page. Values: event count, total users. This is as far as GA4 goes; it never names a visitor or a company.

## Tagging shared links

GA4 credits visits to the referring site, but apps (Instagram, LinkedIn's app, email) often hide the referrer. Add UTM parameters to links you share so they are credited. Keep every value lower case.

| Where | `utm_source` | `utm_medium` | `utm_campaign` |
|---|---|---|---|
| Instagram bio | `instagram` | `social` | `bio` |
| YouTube video descriptions | `youtube` | `video` | `description` |
| LinkedIn profile | `linkedin` | `social` | `profile` |
| Event flyers and QR codes | `flyer` | `print` | the event's short name, e.g. `rose-city-swing-2026` |

For example, the Instagram bio link is `https://www.andrewsunada.com/coaching/?utm_source=instagram&utm_medium=social&utm_campaign=bio`. Reports → Acquisition → Traffic acquisition shows these under session source / medium and session campaign.

## Excluding your own visits

Open any page with `?analytics=off` once in each browser and on each phone you use, for example `https://www.andrewsunada.com/?analytics=off`. The browser remembers it in `localStorage` (key `analytics-opt-out`) and GA4 is disabled before any hit is sent, on that visit and every later one. `?analytics=on` turns counting back on. Clearing the browser's site data also clears the flag, so repeat the step after that.

## Checking that events arrive

- **Realtime** (Reports → Realtime) shows visits within a minute. Open the site in a browser that has *not* opted out.
- **DebugView** (Admin → Data display → DebugView) shows each event and its parameters. Install the Google Analytics Debugger Chrome extension and turn it on, then browse the site.
- Locally, build with the ID exported (`PUBLIC_GA_MEASUREMENT_ID=G-… npm run build`), restart the preview, and read `window.dataLayer` in the browser console: one `page_view` per navigation, with the new page's title. Use `?analytics=off` first if you don't want those visits counted.
