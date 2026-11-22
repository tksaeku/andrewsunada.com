import { render, screen, waitFor } from '@testing-library/svelte';
import { lessonContactPath, privateLessonBookingUrl } from '$lib/content/site';
import ContactPage from './+page.svelte';

describe('Contact page', () => {
	it('has one h1, a booking button and the form', () => {
		vi.stubEnv('PUBLIC_CONTACT_FORM_ENDPOINT', 'https://formspree.io/f/test');
		window.history.replaceState({}, '', '/contact/');
		const { container } = render(ContactPage);
		expect(container.querySelectorAll('h1')).toHaveLength(1);
		const bookingLink = screen.getByRole('link', { name: 'Book a lesson' });
		expect(bookingLink).toHaveAttribute('href', privateLessonBookingUrl || lessonContactPath);
		expect(container.querySelector('form')).not.toBeNull();
		const position = bookingLink.compareDocumentPosition(container.querySelector('form') as HTMLFormElement);
		expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
		vi.unstubAllEnvs();
	});

	it('links the five profiles and shows only the domain email address', () => {
		vi.stubEnv('PUBLIC_CONTACT_FORM_ENDPOINT', 'https://formspree.io/f/test');
		window.history.replaceState({}, '', '/contact/');
		const { container } = render(ContactPage);
		['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'GitHub'].forEach((name) => {
			expect(screen.getByRole('link', { name })).toBeInTheDocument();
		});
		const addresses = container.innerHTML.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? [];
		expect(addresses.length).toBeGreaterThan(0);
		expect(addresses.every((address) => address === 'andrew@andrewsunada.com')).toBe(true);
		expect(container.textContent).not.toMatch(/\d{3}[-.\s]\d{3}[-.\s]\d{4}/);
		vi.unstubAllEnvs();
	});

	it('preselects the topic from the query string', async () => {
		vi.stubEnv('PUBLIC_CONTACT_FORM_ENDPOINT', 'https://formspree.io/f/test');
		window.history.replaceState({}, '', '/contact/?topic=event');
		render(ContactPage);
		await waitFor(() => {
			expect(screen.getByLabelText('Topic')).toHaveValue('event');
		});
		vi.unstubAllEnvs();
	});

	it('ignores an unknown topic', async () => {
		vi.stubEnv('PUBLIC_CONTACT_FORM_ENDPOINT', 'https://formspree.io/f/test');
		window.history.replaceState({}, '', '/contact/?topic=nonsense');
		render(ContactPage);
		await waitFor(() => {
			expect(screen.getByLabelText('Topic')).toHaveValue('');
		});
		vi.unstubAllEnvs();
	});

	it('offers the email address when the form service is not configured', () => {
		vi.stubEnv('PUBLIC_CONTACT_FORM_ENDPOINT', '');
		window.history.replaceState({}, '', '/contact/');
		const { container } = render(ContactPage);
		expect(container.querySelector('form')).toBeNull();
		expect(screen.getAllByRole('link', { name: /andrew@andrewsunada\.com/ }).length).toBeGreaterThan(0);
		vi.unstubAllEnvs();
	});
});
