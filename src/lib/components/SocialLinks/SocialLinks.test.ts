import { render, screen } from '@testing-library/svelte';
import SocialLinks from './SocialLinks.svelte';

describe('SocialLinks', () => {
	it('renders one labelled anchor per link', () => {
		render(SocialLinks, {
			links: [
				{ name: 'Instagram', url: 'https://www.instagram.com/andrewsunada/' },
				{ name: 'GitHub', url: 'https://github.com/tksaeku' },
			],
		});
		const links = screen.getAllByRole('link');
		expect(links).toHaveLength(2);
		expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/andrewsunada/');
		expect(links.every((link) => link.getAttribute('rel') === 'me noopener')).toBe(true);
	});

	it('renders no anchor for a link without a url', () => {
		render(SocialLinks, {
			links: [{ name: 'Instagram', url: '' }, { name: 'GitHub', url: 'https://github.com/tksaeku' }],
		});
		expect(screen.queryByRole('link', { name: 'Instagram' })).toBeNull();
		expect(screen.getAllByRole('link')).toHaveLength(1);
	});
});
