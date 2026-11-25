import { render, screen } from '@testing-library/svelte';
import Footer from './Footer.svelte';

describe('Footer', () => {
	it('links the five profiles', () => {
		render(Footer);
		['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'GitHub'].forEach((name) => {
			expect(screen.getByRole('link', { name })).toBeInTheDocument();
		});
	});

	it('links the eBay store in a new tab and the email address in the same tab', () => {
		render(Footer);
		const ebay = screen.getByRole('link', { name: 'eBay' });
		expect(ebay).toHaveAttribute('href', 'https://www.ebay.com/usr/topknotcomics');
		expect(ebay).toHaveAttribute('target', '_blank');
		const email = screen.getByRole('link', { name: 'Email' });
		expect(email).toHaveAttribute('href', 'mailto:andrew@andrewsunada.com');
		expect(email).not.toHaveAttribute('target');
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
