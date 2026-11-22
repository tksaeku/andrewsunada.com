import { getFeaturedVideos, videos } from './videos';

describe('videos', () => {
	it('holds nine to twelve videos', () => {
		expect(videos.length).toBeGreaterThanOrEqual(9);
		expect(videos.length).toBeLessThanOrEqual(12);
	});

	it('uses unique, eleven-character YouTube ids', () => {
		const ids = videos.map(({ youtubeId }) => youtubeId);
		expect(new Set(ids).size).toBe(ids.length);
		expect(ids.every((id) => /^[\w-]{11}$/.test(id))).toBe(true);
	});

	describe('getFeaturedVideos', () => {
		it('returns the three featured videos in order', () => {
			expect(getFeaturedVideos().map(({ youtubeId }) => youtubeId)).toEqual([
				'efsA9uA58Ss', 'PU8n-yuadv8', 'UBOcaLpadTc',
			]);
		});
	});
});
