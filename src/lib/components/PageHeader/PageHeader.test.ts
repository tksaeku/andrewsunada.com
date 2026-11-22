import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { sitePhotos } from '$lib/content/photos';
import PageHeader from './PageHeader.svelte';

const children = createRawSnippet(() => ({ render: () => '<p>Introduction</p>' }));

describe('PageHeader', () => {
	it('renders the label, the h1 and the introduction', () => {
		render(PageHeader, { label: 'Software', headline: 'Apps I build', children });
		expect(screen.getByText('Software')).toBeInTheDocument();
		expect(screen.getByRole('heading', { level: 1, name: 'Apps I build' })).toBeInTheDocument();
		expect(screen.getByText('Introduction')).toBeInTheDocument();
	});

	it('renders the photo only when given one', () => {
		const { container } = render(PageHeader, { label: 'Dance', headline: 'Dance', children });
		expect(container.querySelector('img')).toBeNull();
		render(PageHeader, { label: 'Dance', headline: 'Dance', photo: sitePhotos.danceHeader, children });
		expect(screen.getByAltText(sitePhotos.danceHeader.alt)).toBeInTheDocument();
	});
});
