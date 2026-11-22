import { buildLlmsText, buildRobots, buildSitemap } from './siteFiles';

describe('buildSitemap', () => {
	it('lists the six canonical urls with lastmod', () => {
		const sitemap = buildSitemap('2026-11-21');
		expect(sitemap.match(/<loc>/g)).toHaveLength(6);
		expect(sitemap).toContain('<loc>https://www.andrewsunada.com/coaching/</loc>');
		expect(sitemap.match(/<lastmod>2026-11-21<\/lastmod>/g)).toHaveLength(6);
	});
});

describe('buildRobots', () => {
	it('allows AI crawlers and points to the sitemap', () => {
		const robots = buildRobots();
		['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', '*'].forEach((agent) => {
			expect(robots).toContain(`User-agent: ${agent}\nAllow: /`);
		});
		expect(robots).toContain('Sitemap: https://www.andrewsunada.com/sitemap.xml');
		expect(robots).not.toContain('Disallow');
	});
});

describe('buildLlmsText', () => {
	it('summarises the offers, rates, venues and pages', () => {
		const text = buildLlmsText();
		expect(text.startsWith('# Andrew Sunada')).toBe(true);
		['$80', '$65', '$100', '$50', 'active student at a university or school', 'Norse Hall', 'Dance with Joy Studios']
			.forEach((fragment) => {
				expect(text).toContain(fragment);
			});
		expect(text.match(/\]\(https:\/\/www\.andrewsunada\.com\/[a-z]*\/?\)/g)).toHaveLength(6);
	});
});
