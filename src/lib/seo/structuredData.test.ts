import { appProjects } from '$lib/content/apps';
import { getFeaturedVideos } from '$lib/content/videos';
import { getCanonicalUrl, pageMetaByPath } from './pageMeta';
import {
	buildBreadcrumbList, buildCoachingServices, buildContactPage, buildPerson, buildProfilePage,
	buildSoftwareApplications, buildVideoObjects, buildWebSite,
} from './structuredData';

describe('buildPerson', () => {
	it('describes Andrew with every profile in sameAs', () => {
		const person = buildPerson();
		expect(person['@type']).toBe('Person');
		expect(person.name).toBe('Andrew Sunada');
		expect(person.sameAs).toEqual(expect.arrayContaining([
			'https://www.instagram.com/andrewsunada/', 'https://www.facebook.com/tksaeku/',
			'https://www.linkedin.com/in/andrewsunada', 'https://www.youtube.com/@AndrewSunada',
			'https://github.com/tksaeku',
		]));
		expect(person.sameAs).not.toContain('');
	});

	it('includes the WSDC registry entry', () => {
		expect(buildPerson().sameAs.some((url) => url.includes('8715'))).toBe(true);
	});
});

describe('buildCoachingServices', () => {
	it('prices every offer in US dollars', () => {
		const services = buildCoachingServices();
		const prices = services.flatMap(({ offers }) => offers.map(({ price }) => price));
		expect(prices).toEqual(expect.arrayContaining(['80', '65', '100', '50']));
		expect(services.every(({ offers }) => offers.every(({ priceCurrency }) => priceCurrency === 'USD'))).toBe(true);
	});

	it('serves Portland and Vancouver', () => {
		const [service] = buildCoachingServices();
		expect(JSON.stringify(service.areaServed)).toContain('Portland');
		expect(JSON.stringify(service.areaServed)).toContain('Vancouver');
	});
});

describe('buildBreadcrumbList', () => {
	it('lists home then the page', () => {
		const breadcrumbs = buildBreadcrumbList(pageMetaByPath['/coaching/']);
		expect(breadcrumbs.itemListElement).toHaveLength(2);
		expect(breadcrumbs.itemListElement[1].item).toBe('https://www.andrewsunada.com/coaching/');
	});
});

describe('other builders', () => {
	it('builds one VideoObject per video with an upload date', () => {
		const videoObjects = buildVideoObjects(getFeaturedVideos());
		expect(videoObjects).toHaveLength(3);
		expect(videoObjects.every((video) => video['@type'] === 'VideoObject' && video.uploadDate !== '')).toBe(true);
	});

	it('builds one SoftwareApplication per app and links only apps with a url', () => {
		const applications = buildSoftwareApplications(appProjects);
		expect(applications).toHaveLength(4);
		expect(applications.filter((application) => 'url' in application)).toHaveLength(appProjects.filter(({ linkUrl }) => linkUrl !== '').length);
	});

	it('types the website, profile and contact pages', () => {
		expect(buildWebSite()['@type']).toBe('WebSite');
		expect(buildProfilePage()['@type']).toBe('ProfilePage');
		expect(buildContactPage()['@type']).toBe('ContactPage');
	});
});

describe('pageMetaByPath', () => {
	const metas = Object.values(pageMetaByPath);

	it('covers the six routes', () => {
		expect(Object.keys(pageMetaByPath)).toEqual(['/', '/coaching/', '/dance/', '/apps/', '/resume/', '/contact/']);
	});

	it('gives every page a unique title of 60 characters or fewer', () => {
		expect(new Set(metas.map(({ title }) => title)).size).toBe(metas.length);
		expect(metas.every(({ title }) => title.length <= 60)).toBe(true);
	});

	it('gives every page a description of 70 to 160 characters', () => {
		expect(metas.every(({ description }) => description.length >= 70 && description.length <= 160)).toBe(true);
	});

	it('builds canonical urls on the www origin', () => {
		expect(getCanonicalUrl('/coaching/')).toBe('https://www.andrewsunada.com/coaching/');
	});
});
