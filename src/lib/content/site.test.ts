import {
	contactEmail, drillLibraryEmailUrl, footerLinks, getVisibleSocialLinks, lessonBookingEmailUrl, navigationItems, photographerCredit, privateLessonBookingUrl,
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

	it('sends lesson enquiries by email with the lesson subject', () => {
		expect(lessonBookingEmailUrl).toBe('mailto:andrew@andrewsunada.com?subject=Book%20a%20lesson');
		expect(typeof privateLessonBookingUrl).toBe('string');
	});

	it('sends drill library enquiries by email with the subject and a starter message', () => {
		expect(drillLibraryEmailUrl).toBe(
			'mailto:andrew@andrewsunada.com?subject=Your%20drill%20library&body=Hey%20Andrew!%20I%20would%20love%20to%20learn%20more%20about%20your%20drill%20library.',
		);
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

describe('footerLinks', () => {
	it('lists the profiles, then eBay, then Email', () => {
		expect(footerLinks.map(({ name }) => name)).toEqual(['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'GitHub', 'eBay', 'Email']);
	});

	it('links the eBay store and the email address', () => {
		expect(footerLinks.find(({ name }) => name === 'eBay')?.url).toBe('https://www.ebay.com/usr/topknotcomics');
		expect(footerLinks.find(({ name }) => name === 'Email')?.url).toBe('mailto:andrew@andrewsunada.com');
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
