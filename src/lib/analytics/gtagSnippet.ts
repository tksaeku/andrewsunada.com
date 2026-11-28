/** The `localStorage` key that marks a browser whose visits are never counted. */
export const analyticsOptOutStorageKey = 'analytics-opt-out';

/** The query parameter that turns counting off (`?analytics=off`) or back on (`?analytics=on`) for a browser. */
export const analyticsPreferenceParameter = 'analytics';

const measurementIdPattern = /^G-[A-Z0-9]+$/;

/**
 * Returns the GA4 measurement ID when the value is one, or an empty string. The ID is written into an
 * inline script, so anything that is not a plain `G-` ID is refused.
 */
export const getMeasurementId = (value: string | undefined): string => {
	const trimmedValue = (value ?? '').trim();
	return measurementIdPattern.test(trimmedValue) ? trimmedValue : '';
};

export const getGtagScriptUrl = (measurementId: string): string => {
	return `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
};

/**
 * Builds the inline script that runs before gtag.js loads. It applies the visitor's `?analytics=off|on`
 * choice, disables GA4 for an opted-out browser before any hit can be sent, defines `gtag`, and configures
 * the property without an automatic page view (the site sends its own).
 */
export const buildGtagBootstrap = (measurementId: string): string => {
	return [
		'(function () {',
		`const measurementId = '${measurementId}';`,
		'try {',
		`const preference = new URLSearchParams(window.location.search).get('${analyticsPreferenceParameter}');`,
		`if (preference === 'off') { window.localStorage.setItem('${analyticsOptOutStorageKey}', 'true'); }`,
		`if (preference === 'on') { window.localStorage.removeItem('${analyticsOptOutStorageKey}'); }`,
		`if (window.localStorage.getItem('${analyticsOptOutStorageKey}') === 'true') { window['ga-disable-' + measurementId] = true; }`,
		'} catch (error) {}',
		'window.dataLayer = window.dataLayer || [];',
		'window.gtag = function gtag() { window.dataLayer.push(arguments); };',
		"window.gtag('js', new Date());",
		"window.gtag('config', measurementId, { send_page_view: false });",
		'})();',
	].join('\n');
};
