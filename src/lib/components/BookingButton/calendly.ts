import { trackEvent } from '$lib/analytics/tracking';
import { AnalyticsEventName, LeadMethod, LeadType } from '$lib/analytics/types';

const calendlyOrigin = 'https://calendly.com';
const widgetScriptUrl = 'https://assets.calendly.com/assets/external/widget.js';
const widgetStylesheetUrl = 'https://assets.calendly.com/assets/external/widget.css';

type CalendlyWidget = { initPopupWidget: (options: { url: string }) => void };

declare global {
	interface Window {
		Calendly?: CalendlyWidget;
	}
}

let isListeningForBookings = false;
let widgetPromise: Promise<void> | null = null;
let widgetScript: HTMLScriptElement | null = null;

const removeWidgetAssets = (): void => {
	document.querySelectorAll(`script[src="${widgetScriptUrl}"], link[href="${widgetStylesheetUrl}"]`).forEach((element) => {
		element.remove();
	});
	widgetScript = null;
	widgetPromise = null;
};

const getIsWidgetLoading = (): boolean => {
	return widgetPromise !== null && widgetScript !== null && widgetScript.isConnected;
};

/**
 * Injects Calendly's widget script and stylesheet the first time it is called and resolves when the
 * script has loaded. A failed load removes both so the next call tries again.
 */
export const loadCalendlyWidget = (): Promise<void> => {
	if (widgetPromise && getIsWidgetLoading()) {
		return widgetPromise;
	}

	const stylesheet = document.createElement('link');
	stylesheet.rel = 'stylesheet';
	stylesheet.href = widgetStylesheetUrl;
	document.head.append(stylesheet);

	const script = document.createElement('script');
	script.src = widgetScriptUrl;
	script.async = true;
	widgetScript = script;
	widgetPromise = new Promise<void>((resolve, reject) => {
		script.addEventListener('load', () => {
			resolve();
		});
		script.addEventListener('error', () => {
			removeWidgetAssets();
			reject(new Error('The Calendly widget failed to load.'));
		});
	});
	document.head.append(script);

	return widgetPromise;
};

/**
 * Reports whether a window message is Calendly's notice that the visitor has booked a time.
 */
export const getIsCalendlyBookingMessage = (event: MessageEvent): boolean => {
	const data: unknown = event.data;
	return event.origin === calendlyOrigin
		&& typeof data === 'object'
		&& data !== null
		&& 'event' in data
		&& data.event === 'calendly.event_scheduled';
};

const listenForCalendlyBookings = (): void => {
	if (isListeningForBookings) {
		return;
	}
	isListeningForBookings = true;
	window.addEventListener('message', (event) => {
		if (getIsCalendlyBookingMessage(event)) {
			trackEvent(AnalyticsEventName.GenerateLead, { method: LeadMethod.Calendly, lead_type: LeadType.Coaching });
		}
	});
};

/**
 * Opens the Calendly scheduling pop-up for the given booking page and records the opening and any booking
 * made in it. Rejects when the widget cannot load.
 */
export const openCalendlyPopup = async (bookingUrl: string): Promise<void> => {
	await loadCalendlyWidget();
	if (!window.Calendly) {
		throw new Error('The Calendly widget loaded without its API.');
	}
	listenForCalendlyBookings();
	window.Calendly.initPopupWidget({ url: bookingUrl });
	trackEvent(AnalyticsEventName.BookingOpened);
};

export const browserNavigation = {
	navigateTo: (url: string): void => {
		window.location.assign(url);
	},
};
