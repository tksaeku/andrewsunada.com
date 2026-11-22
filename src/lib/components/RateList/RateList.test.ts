import { render, screen } from '@testing-library/svelte';
import RateList from './RateList.svelte';

describe('RateList', () => {
	it('renders the price and the unit', () => {
		const { container } = render(RateList, { rates: [{ label: 'Private lesson', amountUsd: 80, unit: 'hour' }] });
		expect(container.textContent).toContain('$80');
		expect(container.textContent).toContain('hour');
		expect(screen.getByText('Private lesson')).toBeInTheDocument();
	});

	it('shows the note when present', () => {
		render(RateList, {
			rates: [{ label: 'Student rate', amountUsd: 65, unit: 'hour', note: 'For active students.' }],
		});
		expect(screen.getByText('For active students.')).toBeInTheDocument();
	});
});
