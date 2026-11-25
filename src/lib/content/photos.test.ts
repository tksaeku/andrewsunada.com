import { sitePhotos } from './photos';

describe('sitePhotos', () => {
	it('has every photo the pages use', () => {
		expect(Object.keys(sitePhotos).sort()).toEqual([
			'coachingLessons', 'coachingWorkshops', 'contact', 'dance', 'danceHeader', 'hero', 'professional',
		]);
	});

	it('gives every photo alt text and a caption', () => {
		const photos = Object.values(sitePhotos);
		expect(photos.every(({ alt, caption }) => alt.trim() !== '' && caption.trim() !== '')).toBe(true);
	});
});
