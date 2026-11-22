import {
	contactEmail, getVisibleSocialLinks, lessonContactPath, navigationItems, photographerCredit, privateLessonBookingUrl,
	siteOrigin, socialLinks,
} from './site';

describe('site identity', () => {
	it('uses the canonical www origin', () => {
		expect(siteOrigin).toBe('https://www.andrewsunada.com');
	});

	it('shows only the domain email address', () => {
		expect(contactEmail).toBe('andrew@andrewsunada.com');
	});

	it('credits the photographer', () => {
		expect(photographerCredit).toEqual({ name: 'Doug Silton', url: 'https://dougsilton.com/' });
	});

	it('sends lesson enquiries to the contact form with the lesson topic', () => {
		expect(lessonContactPath).toBe('/contact/?topic=lesson');
		expect(typeof privateLessonBookingUrl).toBe('string');
	});
});

describe('navigationItems', () => {
	it('lists the five menu sections in order', () => {
		expect(navigationItems.map(({ label }) => label)).toEqual(['Coaching', 'Dance', 'Apps', 'Resume', 'Contact']);
	});

	it('uses directory paths', () => {
		expect(navigationItems.every(({ path }) => path.endsWith('/'))).toBe(true);
	});
});

describe('socialLinks', () => {
	it('lists the five profiles in order', () => {
		expect(socialLinks.map(({ name }) => name)).toEqual(['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'GitHub']);
	});

	it('links the right Facebook profile', () => {
		expect(socialLinks.find(({ name }) => name === 'Facebook')?.url).toBe('https://www.facebook.com/tksaeku/');
	});

	describe('getVisibleSocialLinks', () => {
		it('drops a link whose url is empty', () => {
			const links = [{ name: 'Instagram', url: '' }, { name: 'GitHub', url: 'https://github.com/tksaeku' }];
			expect(getVisibleSocialLinks(links).map(({ name }) => name)).toEqual(['GitHub']);
		});

		it('returns every configured profile by default', () => {
			expect(getVisibleSocialLinks()).toHaveLength(5);
		});
	});
});
