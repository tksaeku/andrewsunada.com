import { fireEvent, render, screen } from '@testing-library/svelte';
import type { Video } from '$lib/content/types';
import VideoEmbed from './VideoEmbed.svelte';

const video: Video = {
	youtubeId: 'efsA9uA58Ss', title: 'All-American Jack and Jill prelims, heat 3', event: 'Rose City Swing',
	year: 2025, uploadedAt: '2025-02-25T10:24:29-08:00', isFeatured: true,
};

describe('VideoEmbed', () => {
	it('shows the thumbnail and a plain YouTube link before any click', () => {
		const { container } = render(VideoEmbed, { video });
		const thumbnail = screen.getByRole('img');
		expect(thumbnail).toHaveAttribute('src', 'https://i.ytimg.com/vi/efsA9uA58Ss/hqdefault.jpg');
		expect(thumbnail).toHaveAttribute('alt', video.title);
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(container.querySelector('iframe')).toBeNull();
		expect(screen.getByRole('link', { name: /YouTube/ })).toHaveAttribute(
			'href', 'https://www.youtube.com/watch?v=efsA9uA58Ss',
		);
	});

	it('loads the privacy-enhanced player on click', async () => {
		const { container } = render(VideoEmbed, { video });
		await fireEvent.click(screen.getByRole('button'));
		const player = container.querySelector('iframe');
		expect(player?.getAttribute('src')).toMatch(/^https:\/\/www\.youtube-nocookie\.com\/embed\/efsA9uA58Ss/);
		expect(player).toHaveAttribute('title');
	});
});
