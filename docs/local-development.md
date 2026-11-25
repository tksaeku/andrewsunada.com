# Local development

How to run the site on this machine and check a change before it ships.

## Two ways to run it

| Command | URL | Use it for |
|---|---|---|
| `npm run dev` | http://localhost:5173 | Editing. Hot reload; styles and markup update as you save. |
| `npm run build && npm run preview` | http://localhost:4173 | Seeing exactly what DreamHost will serve: the prerendered `build/` directory. |

`npm run verify` runs `check`, `lint`, `test`, `build` and the build check in one go. It is what CI runs, and it leaves a fresh `build/` behind.

## Restart the preview after every build

`vite preview` indexes the files in `build/` when it starts. Every build gives each page's stylesheet a new hashed name (`/_app/immutable/assets/5.<hash>.css`), and a preview server started before that build answers 404 for the new file. The page then renders unstyled: bulleted lists, full-width photos, no layout.

After any `npm run build` or `npm run verify`:

```bash
lsof -ti tcp:4173 -sTCP:LISTEN | xargs kill   # stop the old preview
npm run preview -- --port 4173 --strictPort
```

`-sTCP:LISTEN` matters: without it, `lsof` also returns any browser process that has the preview open, and `kill` would take down Chrome's network service.

The browser caches the 404, so hard-refresh the page (Cmd+Shift+R) after the restart.

To confirm every stylesheet on a page loads:

```bash
page=/coaching/
html=$(curl -s http://localhost:4173$page)
for css in $(echo "$html" | grep -o '/_app/immutable/assets/[^"]*\.css' | sort -u); do
	printf '%s %s\n' "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:4173$css)" "$css"
done
```

Every line should start with `200`.

## Quick checks without a browser

```bash
# Every route answers, and an unknown path gets the 404 page
for p in / /coaching/ /dance/ /apps/ /resume/ /contact/ /nope/; do
	printf '%s %s\n' "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:4173$p)" "$p"
done

# External links that would open in the same tab (should print nothing)
for f in $(find build -name '*.html'); do
	grep -o '<a [^>]*href="https\?://[^"]*"[^>]*>' "$f" | grep -v 'target="_blank"' | sed "s|^|$f: |"
done
```

`curl -s http://localhost:4173/<route>/ | grep -o '<text you expect>'` confirms a copy change made it into the built HTML. `llms.txt`, `sitemap.xml` and `robots.txt` are served from the same root.

## Checking in Chrome

- Open the preview at http://localhost:4173, not the dev server, when judging how the live site will look.
- If a page looks broken right after a rebuild, check its stylesheets first (above). A stale preview server looks exactly like a CSS bug.
- Resizing the window through the Chrome automation tool does not shrink the page's layout width. Check phone layouts in DevTools device mode instead.

## Environment

Local builds need no `.env`. The `PUBLIC_*` variables in `.env.example` feed the contact form, which no page renders, and the optional Search Console token. See [content.md](content.md#contact).
