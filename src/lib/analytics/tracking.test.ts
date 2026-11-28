import type { Mock } from 'vitest';
import { analyticsOptOutStorageKey } from './gtagSnippet';
import { getIsAnalyticsOptedOut, trackEvent, trackPageView } from './tracking';
import { AnalyticsEventName } from './types';

const stubGtag = (): Mock => {
	const gtag = vi.fn();
	window.gtag = gtag;
	return gtag;
};

const resetBrowser = (): void => {
	delete window.gtag;
	window.localStorage.clear();
	window.history.replaceState({}, '', '/');
	document.title = '';
};

describe('trackEvent', () => {
	it('does nothing when gtag is not on the page', () => {
		resetBrowser();
		expect(() => trackEvent(AnalyticsEventName.ResumeDownload)).not.toThrow();
	});

	it('does nothing when this browser has opted out', () => {
		resetBrowser();
		const gtag = stubGtag();
		window.localStorage.setItem(analyticsOptOutStorageKey, 'true');
		trackEvent(AnalyticsEventName.ResumeDownload);
		expect(gtag).not.toHaveBeenCalled();
		resetBrowser();
	});

	it('sends the event with the site area of the current page', () => {
		resetBrowser();
		const gtag = stubGtag();
		window.history.replaceState({}, '', '/apps/');
		trackEvent(AnalyticsEventName.AppLinkClick, { app_name: 'Meeko', link_kind: 'site' });
		expect(gtag).toHaveBeenCalledWith('event', 'app_link_click', {
			app_name: 'Meeko', link_kind: 'site', content_group: 'Software',
		});
		resetBrowser();
	});
});

describe('trackPageView', () => {
	it('sends the location, path, title and site area', () => {
		resetBrowser();
		const gtag = stubGtag();
		window.history.replaceState({}, '', '/coaching/?utm_source=instagram');
		document.title = 'Coaching · Andrew Sunada';
		trackPageView();
		expect(gtag).toHaveBeenCalledWith('event', 'page_view', {
			page_location: `${window.location.origin}/coaching/?utm_source=instagram`,
			page_path: '/coaching/',
			page_title: 'Coaching · Andrew Sunada',
			content_group: 'Coaching',
		});
		resetBrowser();
	});

	it('marks a page that does not exist as not found', () => {
		resetBrowser();
		const gtag = stubGtag();
		window.history.replaceState({}, '', '/no-such-page/');
		trackPageView();
		expect(gtag.mock.calls[0][2].content_group).toBe('Not found');
		resetBrowser();
	});
});

describe('getIsAnalyticsOptedOut', () => {
	it('reads the stored opt-out flag', () => {
		resetBrowser();
		expect(getIsAnalyticsOptedOut()).toBe(false);
		window.localStorage.setItem(analyticsOptOutStorageKey, 'true');
		expect(getIsAnalyticsOptedOut()).toBe(true);
		resetBrowser();
	});
});
