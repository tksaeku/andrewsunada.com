import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import ArrowLink from './ArrowLink.svelte';

describe('ArrowLink', () => {
	it('renders an anchor to the given href', () => {
		const children = createRawSnippet(() => ({ render: () => '<span>Watch me dance</span>' }));
		render(ArrowLink, { href: '/dance/', children });
		expect(screen.getByRole('link', { name: /Watch me dance/ })).toHaveAttribute('href', '/dance/');
	});
});
