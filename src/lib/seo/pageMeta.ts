import { SiteArea } from '$lib/analytics/types';
import { siteOrigin } from '$lib/content/site';
import type { PageMeta } from './types';

export const pageMetaByPath: Record<string, PageMeta> = {
	'/': {
		path: '/',
		title: 'Andrew Sunada — West Coast Swing coach, Portland, OR',
		description:
			'Andrew Sunada is an All-Star West Coast Swing dancer and coach in Portland, OR and Vancouver, WA, and a Senior Staff Software Engineer.',
		breadcrumbLabel: 'Home',
	},
	'/coaching/': {
		path: '/coaching/',
		title: 'West Coast Swing lessons and coaching · Andrew Sunada',
		description:
			'Private West Coast Swing lessons from $65 an hour, monthly coaching with video feedback, and workshops in Portland, OR and Vancouver, WA.',
		breadcrumbLabel: 'Coaching',
	},
	'/dance/': {
		path: '/dance/',
		title: 'Competition dancing and WSDC record · Andrew Sunada',
		description:
			'Andrew Sunada competes in the WSDC All-Stars division. Watch his Jack and Jill and Strictly competition videos.',
		breadcrumbLabel: 'Dance',
	},
	'/apps/': {
		path: '/apps/',
		title: 'Apps and software projects · Andrew Sunada',
		description:
			'Apps Andrew Sunada builds and runs: Meeko for nanny pay records, TK Wallet for household finance, WeMove for dancers, and Bingo for The Open.',
		breadcrumbLabel: 'Apps',
	},
	'/resume/': {
		path: '/resume/',
		title: 'Resume · Andrew Sunada, Senior Staff Software Engineer',
		description:
			'Resume of Andrew Sunada, Senior Staff Software Engineer at Quantum Metric: browser platform, distributed systems and AI engineering.',
		breadcrumbLabel: 'Resume',
	},
	'/contact/': {
		path: '/contact/',
		title: 'Contact and lesson enquiries · Andrew Sunada',
		description:
			'Book a private West Coast Swing lesson or ask Andrew Sunada about monthly coaching, workshops, convention staffing or software work.',
		breadcrumbLabel: 'Contact',
	},
	'/privacy/': {
		path: '/privacy/',
		title: 'Privacy · Andrew Sunada',
		description:
			'What andrewsunada.com collects with Google Analytics, what happens to contact messages, and how to opt out.',
		breadcrumbLabel: 'Privacy',
	},
};

/** The site area of each page in `pageMetaByPath`, used to group analytics reports. */
export const siteAreaByPath: Record<string, SiteArea> = {
	'/': SiteArea.Home,
	'/coaching/': SiteArea.Coaching,
	'/dance/': SiteArea.Coaching,
	'/apps/': SiteArea.Software,
	'/resume/': SiteArea.Software,
	'/contact/': SiteArea.Contact,
	'/privacy/': SiteArea.Site,
};

/**
 * Returns the site area for a path. Any path that is not a page of the site belongs to the not-found area.
 */
export const getSiteArea = (path: string): SiteArea => {
	return siteAreaByPath[path] ?? SiteArea.NotFound;
};

export const getCanonicalUrl = (path: string): string => {
	return new URL(path, siteOrigin).toString();
};

export const shareImagePath = '/images/share-default.png';
export const portraitImagePath = '/images/andrew-sunada-portrait.jpg';
