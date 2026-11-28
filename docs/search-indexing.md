# Search indexing

How Google, Gemini and other search and AI tools find the site, and what to do after a change.

## What the site publishes

Every page carries a title, description, canonical link, Open Graph and Twitter tags, and JSON-LD; see [content.md](content.md) for where those come from. The build also writes:

- `sitemap.xml`: the seven routes at their `https://www.andrewsunada.com/` addresses, served as `application/xml`
- `robots.txt`: allows every crawler, names GPTBot, ClaudeBot, PerplexityBot and Google-Extended explicitly, and points to the sitemap
- `llms.txt`: a plain-text summary for AI tools

`https://www.andrewsunada.com/` is the canonical origin. DreamHost redirects the bare domain and plain `http://` to it with a 301.

## Google Search Console

The site is a **Domain property** (`andrewsunada.com`) in Search Console, owned by Andrew's Google account. A Domain property covers every host and protocol, so `www`, the bare domain, `http` and `https` share one set of reports.

- **Verification** is a `google-site-verification=…` TXT record at the root of `andrewsunada.com`, under Custom Records in the DreamHost DNS panel. Google re-checks it, so the record stays. `PUBLIC_GOOGLE_SITE_VERIFICATION` is not needed while the TXT record exists.
- **Sitemap** `https://www.andrewsunada.com/sitemap.xml` is submitted under Indexing → Sitemaps. Search Console needs the full sitemap URL; the bare site URL is read as an HTML page and fails with "Sitemap is HTML".
- **Index status** is under Indexing → Pages. Search traffic is under Performance.

## After a change

- **New or renamed route:** give it an entry in `pageMetaByPath` in `src/lib/seo/pageMeta.ts`. `buildSitemap` in `src/lib/seo/siteFiles.ts` lists every path in that map, and Google re-reads the submitted sitemap on its own schedule.
- **Important content change:** paste the page URL into the "Inspect any URL" bar and click **Request indexing**. Google limits these requests per day, so use them for the pages that matter, starting with `/` and `/coaching/`.
- **Removed route:** let it return the 404 page. Use Indexing → Removals only for something that must disappear from results quickly.

## Gemini, ChatGPT and other AI tools

- **Gemini** answers from Google's search index, so a page reaches Gemini once Google has indexed it. `Google-Extended` is allowed in `robots.txt`.
- **ChatGPT search and Copilot** answer from Bing's index. Bing Webmaster Tools (`https://www.bing.com/webmasters`) can import the site, its verification and its sitemap from Search Console.
- **Claude and Perplexity** fetch pages with their own crawlers, which `robots.txt` allows.

## DNS changes

DreamHost's DNS API (see the `tkdreamhost` skill) can add TXT records. When it is unavailable, add the record in the panel under the domain's DNS tab, with **Host** left blank for the root domain. Changes reach DreamHost's nameservers within minutes.
