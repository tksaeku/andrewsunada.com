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

	it('opens an external link in a new tab', () => {
		render(Card, { title: 'Meeko', href: 'https://www.meekoapp.com', children });
		const link = screen.getByRole('link', { name: 'Meeko' });
		expect(link).toHaveAttribute('href', 'https://www.meekoapp.com');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('keeps an internal link in the same tab', () => {
		render(Card, { title: 'Apps', href: '/apps/', children });
		const link = screen.getByRole('link', { name: 'Apps' });
		expect(link).not.toHaveAttribute('target');
		expect(link).not.toHaveAttribute('rel');
	});
});
