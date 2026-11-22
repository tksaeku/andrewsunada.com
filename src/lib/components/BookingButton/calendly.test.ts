import { loadCalendlyWidget, openCalendlyPopup } from './calendly';

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
});
