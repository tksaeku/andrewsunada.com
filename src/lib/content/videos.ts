import type { Video } from './types';

const roseCityAllAmericanHeat3: Video = { youtubeId: 'efsA9uA58Ss', title: 'Andrew Sunada x Paige Rutherford All American JJ Prelims 3', event: 'Rose City Swing', year: 2025, uploadedAt: '2025-02-25T10:24:29-08:00' };

/**
 * The six most-viewed videos of Andrew dancing on his YouTube channel, most-viewed first. Shown on the Dance page.
 * Titles match YouTube, without the event suffix the page shows separately.
 */
export const mostWatchedVideos: Video[] = [
	roseCityAllAmericanHeat3,
	{ youtubeId: 'zn_KCnNpbqI', title: 'Andrew Sunada x Paige Rutherford All American JJ Prelims 1', event: 'Rose City Swing', year: 2025, uploadedAt: '2025-02-25T09:45:10-08:00' },
	{ youtubeId: 'Fv6GHXIhivg', title: 'Andrew Sunada x Leo Lorenzo Allstar JJ Prelims', event: 'Rose City Swing', year: 2025, uploadedAt: '2025-02-25T08:51:43-08:00' },
	{ youtubeId: 'JMrYJ8WOE5M', title: 'Andrew Sunada x Elizabeth Ferreira Allstar JJ Prelims 3', event: 'Swingtacular', year: 2023, uploadedAt: '2023-12-21T19:18:16-08:00' },
	{ youtubeId: 'hVTXnpPAQlU', title: 'Andrew Sunada x Stephen White Allstar JJ Prelims 1', event: 'Sea to Sky', year: 2024, uploadedAt: '2024-11-28T21:37:57-08:00' },
	{ youtubeId: 'vobD36vD7XQ', title: 'Andrew Sunada x Delancey Von Langendoerfer All-star JJ Song 2', event: 'The Bend Connection', year: 2025, uploadedAt: '2025-08-24T00:21:00-07:00' },
];

/** The three videos featured on the home page, in display order. */
export const featuredVideos: Video[] = [
	roseCityAllAmericanHeat3,
	{ youtubeId: 'PU8n-yuadv8', title: 'Andrew Sunada x Inna Stetsiak Retaliation JJ Finals 1', event: 'Retaliation Swing', year: 2026, uploadedAt: '2026-09-30T20:07:50-07:00' },
	{ youtubeId: 'UBOcaLpadTc', title: 'Andrew Sunada x Phoenix Grey All-star JJ Finals', event: 'SO Swing', year: 2025, uploadedAt: '2025-05-22T22:36:11-07:00' },
];

export const getFeaturedVideos = (): Video[] => {
	return featuredVideos;
};

export const getVideoWatchUrl = (video: Video): string => {
	return `https://www.youtube.com/watch?v=${video.youtubeId}`;
};

export const getVideoThumbnailUrl = (video: Video): string => {
	return `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
};

export const getVideoLabel = (video: Video): string => {
	return `${video.event} ${video.year} — ${video.title}`;
};
