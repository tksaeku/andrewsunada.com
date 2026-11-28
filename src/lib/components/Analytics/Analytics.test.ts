import { render } from '@testing-library/svelte';
import Analytics from './Analytics.svelte';

describe('Analytics', () => {
	it('loads gtag.js asynchronously and the bootstrap when there is a measurement ID', () => {
		const { unmount } = render(Analytics, { measurementId: 'G-TEST123' });
		const loader = document.head.querySelector('script[src^="https://www.googletagmanager.com/gtag/js"]');
		expect(loader).toHaveAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-TEST123');
		expect(loader).toHaveAttribute('async');
		const inlineScripts = [...document.head.querySelectorAll('script:not([src])')].map((script) => script.textContent ?? '');
		expect(inlineScripts.some((text) => text.includes("'config', measurementId, { send_page_view: false }"))).toBe(true);
		unmount();
	});

	it('renders nothing without a measurement ID', () => {
		const { unmount } = render(Analytics, { measurementId: '' });
		expect(document.head.innerHTML).not.toContain('googletagmanager');
		unmount();
	});
});
