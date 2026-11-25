import { render, screen } from '@testing-library/svelte';
import { lessonBookingEmailUrl, privateLessonBookingUrl } from '$lib/content/site';
import ContactPage from './+page.svelte';

describe('Contact page', () => {
	it('has one h1, a booking button and no form', () => {
		const { container } = render(ContactPage);
		expect(container.querySelectorAll('h1')).toHaveLength(1);
		const bookingLink = screen.getByRole('link', { name: 'Book a lesson' });
		expect(bookingLink).toHaveAttribute('href', privateLessonBookingUrl || lessonBookingEmailUrl);
		expect(container.querySelector('form')).toBeNull();
	});

	it('links the email address directly', () => {
		render(ContactPage);
		expect(screen.getByRole('link', { name: /andrew@andrewsunada\.com/ })).toHaveAttribute('href', 'mailto:andrew@andrewsunada.com');
	});

	it('links the five profiles and shows only the domain email address', () => {
		const { container } = render(ContactPage);
		['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'GitHub'].forEach((name) => {
			expect(screen.getByRole('link', { name })).toBeInTheDocument();
		});
		const addresses = container.innerHTML.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? [];
		expect(addresses.length).toBeGreaterThan(0);
		expect(addresses.every((address) => address === 'andrew@andrewsunada.com')).toBe(true);
		expect(container.textContent).not.toMatch(/\d{3}[-.\s]\d{3}[-.\s]\d{4}/);
	});
});
