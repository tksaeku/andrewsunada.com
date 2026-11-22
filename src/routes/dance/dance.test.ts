import { render, screen } from '@testing-library/svelte';
import { videos } from '$lib/content/videos';
import { wsdcRecord } from '$lib/content/wsdc';
import DancePage from './+page.svelte';

describe('Dance page', () => {
	it('has one h1 and names the division', () => {
		const { container } = render(DancePage);
		expect(container.querySelectorAll('h1')).toHaveLength(1);
		expect(container.textContent).toContain('All-Stars');
	});

	it('links the WSDC registry entry', () => {
		const { container } = render(DancePage);
		expect([...container.querySelectorAll('a')].some((link) => link.getAttribute('href') === wsdcRecord.registryUrl)).toBe(true);
	});

	it('embeds every video under year headings in descending order', () => {
		const { container } = render(DancePage);
		expect(container.querySelectorAll('.video-embed')).toHaveLength(videos.length);
		const years = [...container.querySelectorAll('.year-heading')].map((heading) => Number(heading.textContent));
		const expectedYears = [...new Set(videos.map(({ year }) => year))].sort((first, second) => second - first);
		expect(years).toEqual(expectedYears);
	});

	it('links the full YouTube channel', () => {
		const { container } = render(DancePage);
		expect([...container.querySelectorAll('a')].some((link) => link.getAttribute('href') === 'https://www.youtube.com/@AndrewSunada')).toBe(true);
	});

	it('lists the podium finishes', () => {
		const { container } = render(DancePage);
		wsdcRecord.placements.forEach(({ event }) => {
			expect(container.textContent).toContain(event);
		});
		expect(screen.getAllByText(/1st|2nd|3rd/).length).toBe(wsdcRecord.placements.length);
	});
});
