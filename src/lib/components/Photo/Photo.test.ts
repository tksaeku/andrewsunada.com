import { render, screen } from '@testing-library/svelte';
import { sitePhotos } from '$lib/content/photos';
import Photo from './Photo.svelte';

describe('Photo', () => {
	it('renders the image with alt text and intrinsic dimensions', () => {
		const photo = sitePhotos.hero;
		render(Photo, { photo });
		const image = screen.getByRole('img');
		expect(image).toHaveAttribute('alt', photo.alt);
		expect(image).toHaveAttribute('width');
		expect(image).toHaveAttribute('height');
	});

	it('renders the caption', () => {
		const photo = sitePhotos.hero;
		render(Photo, { photo });
		expect(screen.getByText(photo.caption)).toBeInTheDocument();
	});
});
