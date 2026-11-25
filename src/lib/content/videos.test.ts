import { featuredVideos, getFeaturedVideos, mostWatchedVideos } from './videos';

describe('videos', () => {
	it('lists the six most-watched videos, most-viewed first', () => {
		expect(mostWatchedVideos.map(({ youtubeId }) => youtubeId)).toEqual([
			'efsA9uA58Ss', 'zn_KCnNpbqI', 'Fv6GHXIhivg', 'JMrYJ8WOE5M', 'hVTXnpPAQlU', 'vobD36vD7XQ',
		]);
	});

	it('uses unique, eleven-character YouTube ids', () => {
		[mostWatchedVideos, featuredVideos].forEach((list) => {
			const ids = list.map(({ youtubeId }) => youtubeId);
			expect(new Set(ids).size).toBe(ids.length);
			expect(ids.every((id) => /^[\w-]{11}$/.test(id))).toBe(true);
		});
	});

	describe('getFeaturedVideos', () => {
		it('returns the three featured videos in order', () => {
			expect(getFeaturedVideos().map(({ youtubeId }) => youtubeId)).toEqual([
				'efsA9uA58Ss', 'PU8n-yuadv8', 'UBOcaLpadTc',
			]);
		});
	});
});
