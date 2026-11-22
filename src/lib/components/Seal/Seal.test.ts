import { render } from '@testing-library/svelte';
import Seal from './Seal.svelte';

describe('Seal', () => {
	it('renders the family kanji inside an svg', () => {
		const { container } = render(Seal, { size: 32 });
		const svg = container.querySelector('svg');
		expect(svg).not.toBeNull();
		expect(svg?.textContent).toContain('砂田');
	});

	it('is hidden from assistive technology', () => {
		const { container } = render(Seal, { size: 32 });
		expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
	});
});
