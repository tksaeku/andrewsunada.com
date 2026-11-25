# YouTube videos

How the videos on the site are chosen and recorded in `src/lib/content/videos.ts`.

## What the site shows

- **`/dance/`** shows `mostWatchedVideos`: the six most-viewed videos of Andrew dancing, most-viewed first. The order was set by view count on 2026-11-24. View counts change, so re-rank when refreshing the list.
- **`/`** shows `featuredVideos`: three hand-picked videos, in display order.

A video counts as "Andrew dancing" only if its YouTube title starts with `Andrew Sunada x`. The channel also holds other dancers' demos and finals and a few non-dance clips; those never go on the site, however many views they have.

## Recording a video

```ts
{ youtubeId: 'efsA9uA58Ss', title: 'Andrew Sunada x Paige Rutherford All American JJ Prelims 3', event: 'Rose City Swing', year: 2025, uploadedAt: '2025-02-25T10:24:29-08:00' }
```

- `title` is the YouTube title without its ` | Event Year` suffix. The card shows `event` and `year` above the title, so keeping the suffix would repeat them.
- `event` and `year` name the competition. When the year in a YouTube title disagrees with the upload date, trust the upload date: an event uploaded in August 2025 is labelled 2025. When the title has no year, take it from the upload date.
- `uploadedAt` is the exact upload timestamp. It feeds the `VideoObject` JSON-LD, which search engines read.

## Finding the most-viewed videos

The reliable route is the channel page in Chrome:

1. Open https://www.youtube.com/@AndrewSunada/videos.
2. Click the **Popular** sort chip. The page re-sorts every upload by views.
3. Read the list with the page-text tool, or just read it on screen. Each entry shows its title and view count.
4. Collect video IDs for the titles you want by running this in the page:

```js
[...document.querySelectorAll('a[href*="/watch?v="]')]
	.map((a) => [a.getAttribute('href').match(/v=([\w-]{11})/)[1], (a.getAttribute('title') || a.textContent).trim()])
	.filter(([, title]) => /^Andrew Sunada/.test(title))
	.map((pair) => pair.join(' | '))
	.join('\n')
```

## Getting an upload date

Each public watch page embeds its upload date:

```bash
curl -s -H 'Accept-Language: en-US' -A 'Mozilla/5.0' "https://www.youtube.com/watch?v=<id>" \
	| grep -o '"uploadDate":"[^"]*"' | head -1
```

## Routes that don't work

- **YouTube Data API.** The shared `GOOGLE_API_KEY` in `~/.credentials` is not enabled for the YouTube Data API v3, and requests answer "Permission denied on the service". Enabling it in the Google Cloud console would make `channels`, `playlistItems` and `videos` (with `statistics.viewCount`) the cleanest route.
- **`curl` of the channel's videos page.** The HTML embeds only the 30 newest uploads, with view counts, so it cannot rank the whole channel.
- **Paging the channel through YouTube's internal `youtubei/v1/browse` endpoint.** Claude Code's auto mode blocks these calls. Use the Popular sort in Chrome instead.

## Thumbnails and embeds

`VideoEmbed` shows `https://i.ytimg.com/vi/<id>/hqdefault.jpg` with a play button and loads the player from `youtube-nocookie.com` only when clicked. Its "Watch on YouTube" link opens a new tab.
