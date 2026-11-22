import { render, screen } from '@testing-library/svelte';
import ErrorMessage from './ErrorMessage.svelte';

describe('ErrorMessage', () => {
	it('explains a missing page and links home', () => {
		render(ErrorMessage, { status: 404 });
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('This page has moved on.');
		expect(screen.getByText('404')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /home page/ })).toHaveAttribute('href', '/');
	});

	it('names other errors generically', () => {
		render(ErrorMessage, { status: 500 });
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Something went wrong.');
	});
});
