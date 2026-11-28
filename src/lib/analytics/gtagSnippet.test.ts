import { analyticsOptOutStorageKey, buildGtagBootstrap, getGtagScriptUrl, getMeasurementId } from './gtagSnippet';

/** The window's own properties, for the `ga-disable-<ID>` flag that has no declared type. */
const windowProperties = window as unknown as Record<string, unknown>;

const runBootstrap = (measurementId: string, search: string): void => {
	window.history.replaceState({}, '', `/${search}`);
	new Function(buildGtagBootstrap(measurementId))();
};

const resetBrowser = (measurementId: string): void => {
	window.history.replaceState({}, '', '/');
	window.localStorage.clear();
	delete window.gtag;
	delete window.dataLayer;
	delete windowProperties[`ga-disable-${measurementId}`];
};

describe('getMeasurementId', () => {
	it('accepts a GA4 measurement ID', () => {
		expect(getMeasurementId(' G-AB12CD34EF ')).toBe('G-AB12CD34EF');
	});

	it('refuses an unset, empty or malformed value', () => {
		[undefined, '', 'UA-12345-1', "G-ABC'); alert(1); ('", 'g-abc123'].forEach((value) => {
			expect(getMeasurementId(value)).toBe('');
		});
	});
});

describe('getGtagScriptUrl', () => {
	it('points at gtag.js for the measurement ID', () => {
		expect(getGtagScriptUrl('G-TEST123')).toBe('https://www.googletagmanager.com/gtag/js?id=G-TEST123');
	});
});

describe('buildGtagBootstrap', () => {
	it('defines gtag and configures the property without an automatic page view', () => {
		resetBrowser('G-TEST123');
		runBootstrap('G-TEST123', '');
		const commands = (window.dataLayer ?? []).map((entry) => [...(entry as IArguments)]);
		expect(commands[0][0]).toBe('js');
		expect(commands[1]).toEqual(['config', 'G-TEST123', { send_page_view: false }]);
		expect(windowProperties['ga-disable-G-TEST123']).toBeUndefined();
		resetBrowser('G-TEST123');
	});

	it('remembers ?analytics=off and disables GA4 on that visit and later ones', () => {
		resetBrowser('G-TEST123');
		runBootstrap('G-TEST123', '?analytics=off');
		expect(window.localStorage.getItem(analyticsOptOutStorageKey)).toBe('true');
		expect(windowProperties['ga-disable-G-TEST123']).toBe(true);
		delete windowProperties['ga-disable-G-TEST123'];
		runBootstrap('G-TEST123', '');
		expect(windowProperties['ga-disable-G-TEST123']).toBe(true);
		resetBrowser('G-TEST123');
	});

	it('clears the opt-out with ?analytics=on', () => {
		resetBrowser('G-TEST123');
		window.localStorage.setItem(analyticsOptOutStorageKey, 'true');
		runBootstrap('G-TEST123', '?analytics=on');
		expect(window.localStorage.getItem(analyticsOptOutStorageKey)).toBeNull();
		expect(windowProperties['ga-disable-G-TEST123']).toBeUndefined();
		resetBrowser('G-TEST123');
	});
});
