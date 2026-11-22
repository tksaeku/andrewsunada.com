import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import Section from './Section.svelte';

const children = createRawSnippet(() => ({ render: () => '<p>Section body</p>' }));

describe('Section', () => {
	it('renders the number, label, headline and content', () => {
		render(Section, { number: '01', label: 'Coaching', headline: 'Movement first.', children });
		expect(screen.getByText('01')).toBeInTheDocument();
		expect(screen.getByText('Coaching')).toBeInTheDocument();
		expect(screen.getByRole('heading', { level: 2, name: 'Movement first.' })).toBeInTheDocument();
		expect(screen.getByText('Section body')).toBeInTheDocument();
	});

	describe('banding', () => {
		it('adds the banded class when isBanded', () => {
			const { container } = render(Section, {
				number: '02', label: 'Dance', headline: 'Dance', isBanded: true, children,
			});
			expect(container.querySelector('section')).toHaveClass('is-banded');
		});

		it('leaves the section unbanded by default', () => {
			const { container } = render(Section, { number: '02', label: 'Dance', headline: 'Dance', children });
			expect(container.querySelector('section')).not.toHaveClass('is-banded');
		});
	});
});
