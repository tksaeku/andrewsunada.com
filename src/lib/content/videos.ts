import type { Video } from './types';

export const videos: Video[] = [
	{ youtubeId: 'efsA9uA58Ss', title: 'All-American Jack and Jill prelims, heat 3', event: 'Rose City Swing', year: 2025, uploadedAt: '2025-02-25T10:24:29-08:00', isFeatured: true },
	{ youtubeId: 'PU8n-yuadv8', title: 'Retaliation Jack and Jill finals, song 1', event: 'Retaliation Swing', year: 2026, uploadedAt: '2026-09-30T20:07:50-07:00', isFeatured: true },
	{ youtubeId: 'UBOcaLpadTc', title: 'All-Star Jack and Jill finals', event: 'SO Swing', year: 2025, uploadedAt: '2025-05-22T22:36:11-07:00', isFeatured: true },
	{ youtubeId: 'm-xR2YReQLk', title: 'Retaliation Jack and Jill finals, song 2', event: 'Retaliation Swing', year: 2026, uploadedAt: '2026-09-30T20:06:46-07:00', isFeatured: false },
	{ youtubeId: '1XMY8ZSIZno', title: 'All-Star Jack and Jill semifinals', event: 'Swingtacular', year: 2026, uploadedAt: '2026-09-10T23:07:48-07:00', isFeatured: false },
	{ youtubeId: 'cOhom9AFaqU', title: 'All-Star Jack and Jill prelims', event: 'SO Swing', year: 2026, uploadedAt: '2026-05-18T09:49:16-07:00', isFeatured: false },
	{ youtubeId: 'POWHzOrDaNQ', title: 'All-Star Jack and Jill prelims, heat 2', event: 'Swingcouver', year: 2026, uploadedAt: '2026-01-04T18:16:12-08:00', isFeatured: false },
	{ youtubeId: 'zn_KCnNpbqI', title: 'All-American Jack and Jill prelims, heat 1', event: 'Rose City Swing', year: 2025, uploadedAt: '2025-02-25T09:45:10-08:00', isFeatured: false },
	{ youtubeId: 'BoDd3vZ6_H4', title: 'All-Star and Champions Strictly prelims, heat 3', event: 'Jack and Jill O’Rama', year: 2025, uploadedAt: '2025-06-08T17:11:01-07:00', isFeatured: false },
	{ youtubeId: 'hVTXnpPAQlU', title: 'All-Star Jack and Jill prelims, heat 1', event: 'Sea to Sky', year: 2024, uploadedAt: '2024-11-28T21:37:57-08:00', isFeatured: false },
	{ youtubeId: 'UN16UG-nH60', title: 'All-Star Strictly prelims, heat 3', event: 'Austin Swing Dance Championships', year: 2024, uploadedAt: '2024-01-15T14:08:16-08:00', isFeatured: false },
];

export const getFeaturedVideos = (): Video[] => {
	return videos.filter(({ isFeatured }) => isFeatured);
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
