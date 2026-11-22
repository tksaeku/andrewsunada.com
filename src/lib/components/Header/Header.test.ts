import { fireEvent, render, screen, within } from '@testing-library/svelte';
import { navigationItems } from '$lib/content/site';
import Header from './Header.svelte';

describe('Header', () => {
	it('renders the five menu links in order', () => {
		render(Header, { currentPath: '/' });
		const navigation = screen.getByRole('navigation', { name: 'Main' });
		const hrefs = within(navigation).getAllByRole('link').map((link) => link.getAttribute('href'));
		expect(hrefs).toEqual(navigationItems.map(({ path }) => path));
	});

	it('links the wordmark home', () => {
		render(Header, { currentPath: '/coaching/' });
		expect(screen.getByRole('link', { name: 'Andrew Sunada, home' })).toHaveAttribute('href', '/');
	});

	it('marks the current page', () => {
		render(Header, { currentPath: '/dance/' });
		expect(screen.getByRole('link', { name: 'Dance' })).toHaveAttribute('aria-current', 'page');
		expect(screen.getByRole('link', { name: 'Coaching' })).not.toHaveAttribute('aria-current');
	});

	describe('menu toggle', () => {
		it('flips aria-expanded on click', async () => {
			render(Header, { currentPath: '/' });
			const toggle = screen.getByRole('button', { name: 'Menu' });
			expect(toggle).toHaveAttribute('aria-expanded', 'false');
			await fireEvent.click(toggle);
			expect(toggle).toHaveAttribute('aria-expanded', 'true');
			await fireEvent.click(toggle);
			expect(toggle).toHaveAttribute('aria-expanded', 'false');
		});

		it('keeps the links in the document before any interaction', () => {
			render(Header, { currentPath: '/' });
			expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
		});
	});
});
