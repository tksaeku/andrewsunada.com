import { render } from '@testing-library/svelte';
import { mostWatchedVideos } from '$lib/content/videos';
import DancePage from './+page.svelte';

describe('Dance page', () => {
	it('has one h1 and names the division', () => {
		const { container } = render(DancePage);
		expect(container.querySelectorAll('h1')).toHaveLength(1);
		expect(container.textContent).toContain('All-Stars');
	});

	it('embeds the most-watched videos in order, without year headings', () => {
		const { container } = render(DancePage);
		expect(container.querySelectorAll('.video-embed')).toHaveLength(mostWatchedVideos.length);
		expect(container.querySelector('.year-heading')).toBeNull();
	});

	it('has no competition record section', () => {
		const { container } = render(DancePage);
		expect(container.querySelector('#record')).toBeNull();
	});

	it('links the full YouTube channel', () => {
		const { container } = render(DancePage);
		expect([...container.querySelectorAll('a')].some((link) => link.getAttribute('href') === 'https://www.youtube.com/@AndrewSunada')).toBe(true);
	});
});
