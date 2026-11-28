import { getSiteArea } from '$lib/seo/pageMeta';
import { analyticsOptOutStorageKey } from './gtagSnippet';
import { AnalyticsEventName } from './types';
import type { AnalyticsParameters } from './types';

type Gtag = (command: string, ...values: unknown[]) => void;

declare global {
	interface Window {
		gtag?: Gtag;
		dataLayer?: unknown[];
	}
}

/**
 * Reports whether this browser asked not to be counted with `?analytics=off`.
 */
export const getIsAnalyticsOptedOut = (): boolean => {
	try {
		return window.localStorage.getItem(analyticsOptOutStorageKey) === 'true';
	} catch {
		return false;
	}
};

const getGtag = (): Gtag | null => {
	if (typeof window === 'undefined' || typeof window.gtag !== 'function' || getIsAnalyticsOptedOut()) {
		return null;
	}
	return window.gtag;
};

/**
 * Sends a GA4 event tagged with the current page's site area. Does nothing when gtag.js is not on the
 * page (no measurement ID, blocked, or not loaded) or the browser has opted out.
 */
export const trackEvent = (name: AnalyticsEventName, parameters: AnalyticsParameters = {}): void => {
	const gtag = getGtag();
	if (!gtag) {
		return;
	}
	gtag('event', name, { ...parameters, content_group: getSiteArea(window.location.pathname) });
};

/**
 * Sends a page view for the page now showing. Call it after a navigation has rendered, so the title is the new page's.
 */
export const trackPageView = (): void => {
	trackEvent(AnalyticsEventName.PageView, {
		page_location: window.location.href,
		page_path: window.location.pathname,
		page_title: document.title,
	});
};
