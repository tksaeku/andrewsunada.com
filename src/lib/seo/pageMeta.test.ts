import { SiteArea } from '$lib/analytics/types';
import { getSiteArea, pageMetaByPath, siteAreaByPath } from './pageMeta';

describe('siteAreaByPath', () => {
	it('gives every page an area', () => {
		expect(Object.keys(siteAreaByPath).sort()).toEqual(Object.keys(pageMetaByPath).sort());
	});

	it('groups the pages into the report areas', () => {
		expect(siteAreaByPath).toEqual({
			'/': SiteArea.Home,
			'/coaching/': SiteArea.Coaching,
			'/dance/': SiteArea.Coaching,
			'/apps/': SiteArea.Software,
			'/resume/': SiteArea.Software,
			'/contact/': SiteArea.Contact,
			'/privacy/': SiteArea.Site,
		});
	});
});

describe('getSiteArea', () => {
	it('returns the page area, or not found for any other path', () => {
		expect(getSiteArea('/resume/')).toBe(SiteArea.Software);
		expect(getSiteArea('/404')).toBe(SiteArea.NotFound);
		expect(getSiteArea('/old/page.html')).toBe(SiteArea.NotFound);
	});
});
