import { getIsCalendlyBookingMessage, loadCalendlyWidget, openCalendlyPopup } from './calendly';

const getWidgetScripts = (): HTMLScriptElement[] => {
	return [...document.querySelectorAll<HTMLScriptElement>('script[src*="calendly.com/assets"]')];
};

const removeWidgetAssets = (): void => {
	document.querySelectorAll('[src*="calendly.com/assets"], [href*="calendly.com/assets"]').forEach((element) => {
		element.remove();
	});
	delete window.Calendly;
};

describe('loadCalendlyWidget', () => {
	it('injects the script and stylesheet once', async () => {
		removeWidgetAssets();
		const first = loadCalendlyWidget();
		const second = loadCalendlyWidget();
		expect(getWidgetScripts()).toHaveLength(1);
		expect(document.querySelectorAll('link[href="https://assets.calendly.com/assets/external/widget.css"]')).toHaveLength(1);
		getWidgetScripts()[0].dispatchEvent(new Event('load'));
		await expect(Promise.all([first, second])).resolves.toBeDefined();
	});

	it('rejects when the script fails, and retries on the next call', async () => {
		removeWidgetAssets();
		const failed = loadCalendlyWidget();
		getWidgetScripts()[0].dispatchEvent(new Event('error'));
		await expect(failed).rejects.toThrow();
		expect(getWidgetScripts()).toHaveLength(0);
		const retry = loadCalendlyWidget();
		expect(getWidgetScripts()).toHaveLength(1);
		getWidgetScripts()[0].dispatchEvent(new Event('load'));
		await expect(retry).resolves.toBeUndefined();
	});
});

describe('openCalendlyPopup', () => {
	it('opens the popup for the booking url', async () => {
		removeWidgetAssets();
		const initPopupWidget = vi.fn();
		const opening = openCalendlyPopup('https://calendly.com/andrewsunada/private-lesson');
		window.Calendly = { initPopupWidget };
		getWidgetScripts()[0].dispatchEvent(new Event('load'));
		await opening;
		expect(initPopupWidget).toHaveBeenCalledWith({ url: 'https://calendly.com/andrewsunada/private-lesson' });
	});

	it('records the opening, then a booking made in the pop-up as a coaching lead', async () => {
		removeWidgetAssets();
		const gtag = vi.fn();
		window.gtag = gtag;
		const opening = openCalendlyPopup('https://calendly.com/andrewsunada/private-lesson');
		window.Calendly = { initPopupWidget: vi.fn() };
		getWidgetScripts()[0].dispatchEvent(new Event('load'));
		await opening;
		expect(gtag).toHaveBeenCalledWith('event', 'booking_opened', expect.any(Object));
		window.dispatchEvent(new MessageEvent('message', {
			origin: 'https://calendly.com', data: { event: 'calendly.event_scheduled' },
		}));
		expect(gtag).toHaveBeenCalledWith('event', 'generate_lead', expect.objectContaining({
			method: 'calendly', lead_type: 'coaching',
		}));
		expect(gtag).toHaveBeenCalledTimes(2);
		delete window.gtag;
	});
});

describe('getIsCalendlyBookingMessage', () => {
	it('accepts only a scheduled event from Calendly', () => {
		const scheduled = { event: 'calendly.event_scheduled' };
		expect(getIsCalendlyBookingMessage(new MessageEvent('message', { origin: 'https://calendly.com', data: scheduled }))).toBe(true);
		expect(getIsCalendlyBookingMessage(new MessageEvent('message', { origin: 'https://evil.example', data: scheduled }))).toBe(false);
		expect(getIsCalendlyBookingMessage(new MessageEvent('message', {
			origin: 'https://calendly.com', data: { event: 'calendly.date_and_time_selected' },
		}))).toBe(false);
		expect(getIsCalendlyBookingMessage(new MessageEvent('message', { origin: 'https://calendly.com', data: 'text' }))).toBe(false);
	});
});
