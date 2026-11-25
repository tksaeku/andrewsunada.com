import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import ArrowLink from './ArrowLink.svelte';

describe('ArrowLink', () => {
	it('renders an anchor to the given href', () => {
		const children = createRawSnippet(() => ({ render: () => '<span>Watch me dance</span>' }));
		render(ArrowLink, { href: '/dance/', children });
		expect(screen.getByRole('link', { name: /Watch me dance/ })).toHaveAttribute('href', '/dance/');
	});

	it('keeps an internal link in the same tab', () => {
		const children = createRawSnippet(() => ({ render: () => '<span>Apps</span>' }));
		render(ArrowLink, { href: '/apps/', children });
		expect(screen.getByRole('link', { name: /Apps/ })).not.toHaveAttribute('target');
	});

	it('opens an external link in a new tab', () => {
		const children = createRawSnippet(() => ({ render: () => '<span>YouTube</span>' }));
		render(ArrowLink, { href: 'https://www.youtube.com/@AndrewSunada', children });
		const link = screen.getByRole('link', { name: /YouTube/ });
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});
});
