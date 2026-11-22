import { render, screen } from '@testing-library/svelte';
import Footer from './Footer.svelte';

describe('Footer', () => {
	it('links the five profiles', () => {
		render(Footer);
		['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'GitHub'].forEach((name) => {
			expect(screen.getByRole('link', { name })).toBeInTheDocument();
		});
	});

	it('shows the current year', () => {
		render(Footer);
		expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
	});

	it('credits the photographer', () => {
		const { container } = render(Footer);
		const credit = screen.getByRole('link', { name: 'Doug Silton' });
		expect(credit).toHaveAttribute('href', 'https://dougsilton.com/');
		expect(container.textContent).toMatch(/Photography by\s*Doug Silton/);
	});
});
