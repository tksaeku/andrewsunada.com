import { render } from '@testing-library/svelte';
import { pageMetaByPath } from '$lib/seo/pageMeta';
import Seo from './Seo.svelte';

const getMetaContent = (selector: string): string | null => {
	return document.head.querySelector(selector)?.getAttribute('content') ?? null;
};

describe('Seo', () => {
	it('renders the title, description and canonical url', () => {
		const meta = pageMetaByPath['/coaching/'];
		render(Seo, { meta, structuredData: [] });
		expect(document.title).toBe(meta.title);
		expect(getMetaContent('meta[name="description"]')).toBe(meta.description);
		expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
			'href', 'https://www.andrewsunada.com/coaching/',
		);
	});

	it('renders Open Graph and Twitter tags with an absolute image', () => {
		const meta = pageMetaByPath['/'];
		render(Seo, { meta, structuredData: [] });
		expect(getMetaContent('meta[property="og:title"]')).toBe(meta.title);
		expect(getMetaContent('meta[property="og:description"]')).toBe(meta.description);
		expect(getMetaContent('meta[property="og:url"]')).toBe('https://www.andrewsunada.com/');
		expect(getMetaContent('meta[property="og:image"]')).toMatch(/^https:\/\/www\.andrewsunada\.com\/.+\.png$/);
		expect(getMetaContent('meta[property="og:type"]')).toBe('website');
		expect(getMetaContent('meta[name="twitter:card"]')).toBe('summary_large_image');
	});

	it('renders one parseable JSON-LD script per object', () => {
		render(Seo, { meta: pageMetaByPath['/'], structuredData: [{ '@type': 'WebSite' }, { '@type': 'Person' }] });
		const scripts = [...document.head.querySelectorAll('script[type="application/ld+json"]')];
		expect(scripts).toHaveLength(2);
		expect(scripts.map((script) => JSON.parse(script.textContent ?? '')['@type'])).toEqual(['WebSite', 'Person']);
	});

	it('escapes a closing script tag inside structured data', () => {
		render(Seo, { meta: pageMetaByPath['/'], structuredData: [{ '@type': 'Thing', name: '</script><b>x</b>' }] });
		const script = document.head.querySelector('script[type="application/ld+json"]');
		expect(script?.innerHTML).not.toContain('</script>');
		expect(JSON.parse(script?.textContent ?? '').name).toBe('</script><b>x</b>');
	});
});
