import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import Card from './Card.svelte';

const children = createRawSnippet(() => ({ render: () => '<p>Card body</p>' }));

describe('Card', () => {
	it('renders no anchor without an href', () => {
		const { container } = render(Card, { title: 'TK Wallet', href: '', children });
		expect(container.querySelector('a')).toBeNull();
		expect(screen.getByRole('heading', { name: 'TK Wallet' })).toBeInTheDocument();
		expect(screen.getByText('Card body')).toBeInTheDocument();
	});

	it('marks an external link noopener', () => {
		render(Card, { title: 'Meeko', href: 'https://www.meekoapp.com', children });
		const link = screen.getByRole('link', { name: 'Meeko' });
		expect(link).toHaveAttribute('href', 'https://www.meekoapp.com');
		expect(link).toHaveAttribute('rel', 'noopener');
	});
});
