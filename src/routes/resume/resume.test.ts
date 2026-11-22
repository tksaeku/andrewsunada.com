import { render, screen } from '@testing-library/svelte';
import ResumePage from './+page.svelte';

describe('Resume page', () => {
	it('has one h1', () => {
		const { container } = render(ResumePage);
		expect(container.querySelectorAll('h1')).toHaveLength(1);
	});

	it('shows the current role, employer and city', () => {
		const { container } = render(ResumePage);
		expect(container.textContent).toContain('Senior Staff Software Engineer');
		expect(container.textContent).toContain('Quantum Metric');
		expect(container.textContent).toContain('Portland, OR');
	});

	it('offers the PDF as a download', () => {
		render(ResumePage);
		const download = screen.getByRole('link', { name: /Download PDF/ });
		expect(download).toHaveAttribute('href', '/andrew-sunada-resume.pdf');
		expect(download).toHaveAttribute('download');
	});

	it('prints no private contact details and never signals a job search', () => {
		const { container } = render(ResumePage);
		const text = container.textContent ?? '';
		expect(text).not.toMatch(/\d{3}[-.\s]\d{3}[-.\s]\d{4}/);
		expect(text).not.toContain('@gmail.com');
		expect(text).not.toMatch(/\d+\s+\w+\s+(St|Ave|Rd|Blvd|Dr|Ln|Way|Ct)\b/);
		['looking for', 'seeking', 'open to'].forEach((phrase) => {
			expect(text.toLowerCase()).not.toContain(phrase);
		});
	});
});
