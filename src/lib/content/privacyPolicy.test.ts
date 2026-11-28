import { privacyPagePath, privacySections } from './privacyPolicy';

describe('privacy page copy', () => {
	it('lives at /privacy/', () => {
		expect(privacyPagePath).toBe('/privacy/');
	});

	it('names Google Analytics, its cookies, Formspree, Calendly and YouTube', () => {
		const text = JSON.stringify(privacySections);
		['Google Analytics', 'cookies', 'Formspree', 'Calendly', 'YouTube', 'Google signals'].forEach((fragment) => {
			expect(text).toContain(fragment);
		});
	});

	it('links the opt-out add-on and the contact address', () => {
		const urls = privacySections.flatMap(({ links }) => links.map(({ url }) => url));
		expect(urls).toContain('https://tools.google.com/dlpage/gaoptout');
		expect(urls).toContain('mailto:andrew@andrewsunada.com');
	});

	it('gives every section a heading and at least one paragraph', () => {
		privacySections.forEach(({ heading, paragraphs }) => {
			expect(heading.trim()).not.toBe('');
			expect(paragraphs.length).toBeGreaterThan(0);
		});
	});
});
