import { render, screen, waitFor } from '@testing-library/svelte';
import { lessonContactPath, privateLessonBookingUrl } from '$lib/content/site';
import ContactPage from './+page.svelte';

describe('Contact page', () => {
	it('has one h1, a booking button and the form', () => {
		window.history.replaceState({}, '', '/contact/');
		const { container } = render(ContactPage);
		expect(container.querySelectorAll('h1')).toHaveLength(1);
		const bookingLink = screen.getByRole('link', { name: 'Book a lesson' });
		expect(bookingLink).toHaveAttribute('href', privateLessonBookingUrl || lessonContactPath);
		expect(container.querySelector('form')).not.toBeNull();
		const position = bookingLink.compareDocumentPosition(container.querySelector('form') as HTMLFormElement);
		expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
	});

	it('links the five profiles and shows only the domain email address', () => {
		window.history.replaceState({}, '', '/contact/');
		const { container } = render(ContactPage);
		['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'GitHub'].forEach((name) => {
			expect(screen.getByRole('link', { name })).toBeInTheDocument();
		});
		const addresses = container.innerHTML.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? [];
		expect(addresses.length).toBeGreaterThan(0);
		expect(addresses.every((address) => address === 'andrew@andrewsunada.com')).toBe(true);
		expect(container.textContent).not.toMatch(/\d{3}[-.\s]\d{3}[-.\s]\d{4}/);
	});

	it('preselects the topic from the query string', async () => {
		window.history.replaceState({}, '', '/contact/?topic=event');
		render(ContactPage);
		await waitFor(() => {
			expect(screen.getByLabelText('Topic')).toHaveValue('event');
		});
	});

	it('ignores an unknown topic', async () => {
		window.history.replaceState({}, '', '/contact/?topic=nonsense');
		render(ContactPage);
		await waitFor(() => {
			expect(screen.getByLabelText('Topic')).toHaveValue('');
		});
	});
});
