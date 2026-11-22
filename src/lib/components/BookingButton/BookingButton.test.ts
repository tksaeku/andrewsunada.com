import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import * as calendly from './calendly';
import BookingButton from './BookingButton.svelte';

const bookingUrl = 'https://calendly.com/andrewsunada/private-lesson';

const getWidgetScripts = (): HTMLScriptElement[] => {
	return [...document.querySelectorAll<HTMLScriptElement>('script[src*="calendly.com/assets"]')];
};

const removeWidgetAssets = (): void => {
	document.querySelectorAll('[src*="calendly.com/assets"], [href*="calendly.com/assets"]').forEach((element) => {
		element.remove();
	});
	delete window.Calendly;
};

describe('BookingButton', () => {
	describe('with a booking url', () => {
		it('is a plain link to Calendly and loads nothing up front', () => {
			removeWidgetAssets();
			render(BookingButton, { bookingUrl, fallbackPath: '/contact/?topic=lesson' });
			const link = screen.getByRole('link', { name: 'Book a lesson' });
			expect(link).toHaveAttribute('href', bookingUrl);
			expect(link).toHaveAttribute('rel', 'noopener');
			expect(document.querySelector('[src*="calendly.com/assets"], [href*="calendly.com/assets"]')).toBeNull();
		});

		it('opens the popup on click and loads the widget once', async () => {
			removeWidgetAssets();
			const initPopupWidget = vi.fn();
			render(BookingButton, { bookingUrl, fallbackPath: '/contact/?topic=lesson' });
			const link = screen.getByRole('link', { name: 'Book a lesson' });
			const isNotPrevented = await fireEvent.click(link);
			expect(isNotPrevented).toBe(false);
			window.Calendly = { initPopupWidget };
			getWidgetScripts()[0].dispatchEvent(new Event('load'));
			await waitFor(() => {
				expect(initPopupWidget).toHaveBeenCalledWith({ url: bookingUrl });
			});
			await fireEvent.click(link);
			await waitFor(() => {
				expect(initPopupWidget).toHaveBeenCalledTimes(2);
			});
			expect(getWidgetScripts()).toHaveLength(1);
		});

		it('navigates to Calendly when the widget fails to load', async () => {
			removeWidgetAssets();
			const navigate = vi.spyOn(calendly.browserNavigation, 'navigateTo').mockImplementation(() => {});
			render(BookingButton, { bookingUrl, fallbackPath: '/contact/?topic=lesson' });
			await fireEvent.click(screen.getByRole('link', { name: 'Book a lesson' }));
			getWidgetScripts()[0].dispatchEvent(new Event('error'));
			await waitFor(() => {
				expect(navigate).toHaveBeenCalledWith(bookingUrl);
			});
			navigate.mockRestore();
		});
	});

	describe('without a booking url', () => {
		it('links to the contact form and never loads Calendly', async () => {
			removeWidgetAssets();
			render(BookingButton, { bookingUrl: '', fallbackPath: '/contact/?topic=lesson', label: 'Ask about a lesson' });
			const link = screen.getByRole('link', { name: 'Ask about a lesson' });
			expect(link).toHaveAttribute('href', '/contact/?topic=lesson');
			const isNotPrevented = await fireEvent.click(link);
			expect(isNotPrevented).toBe(true);
			expect(getWidgetScripts()).toHaveLength(0);
		});
	});
});
