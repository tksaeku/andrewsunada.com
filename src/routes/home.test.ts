import { render, screen, within } from '@testing-library/svelte';
import { sitePhotos } from '$lib/content/photos';
import { lessonBookingEmailUrl, privateLessonBookingUrl, youtubeChannelUrl } from '$lib/content/site';
import HomePage from './+page.svelte';

describe('Home page', () => {
	it('has exactly one h1 with the surname emphasised', () => {
		const { container } = render(HomePage);
		const headings = container.querySelectorAll('h1');
		expect(headings).toHaveLength(1);
		expect(headings[0].textContent).toContain('Andrew');
		expect(headings[0].querySelector('em')?.textContent).toContain('Sunada');
	});

	it('offers a lesson booking and a way to watch Andrew dance', () => {
		render(HomePage);
		const [bookingLink] = screen.getAllByRole('link', { name: 'Book a lesson' });
		expect(bookingLink).toHaveAttribute('href', privateLessonBookingUrl || lessonBookingEmailUrl);
		expect(screen.getByRole('link', { name: /Watch me dance/ })).toHaveAttribute('href', youtubeChannelUrl);
	});

	it('shows the hero portrait', () => {
		render(HomePage);
		expect(screen.getByAltText(sitePhotos.hero.alt)).toBeInTheDocument();
	});

	it('numbers the sections Coaching, Dance, Engineering, Contact', () => {
		const { container } = render(HomePage);
		const labels = [...container.querySelectorAll('section .label')].map((label) => label.textContent?.replace(/\s+/g, ' ').trim());
		expect(labels).toEqual(['01 Coaching', '02 Dance', '03 Engineering', '04 Contact']);
	});

	it('embeds the three featured videos in the Dance section', () => {
		const { container } = render(HomePage);
		const danceSection = container.querySelector<HTMLElement>('section#dance');
		expect(danceSection?.querySelectorAll('.video-embed')).toHaveLength(3);
		expect(container.querySelectorAll('.video-embed')).toHaveLength(3);
	});

	it('links the Engineering section to the apps and the resume', () => {
		const { container } = render(HomePage);
		const engineering = within(container.querySelector<HTMLElement>('section#engineering') as HTMLElement);
		const hrefs = engineering.getAllByRole('link').map((link) => link.getAttribute('href'));
		expect(hrefs).toEqual(expect.arrayContaining(['/apps/', '/resume/']));
	});

	it('closes with the domain email address', () => {
		render(HomePage);
		expect(screen.getByRole('link', { name: /andrew@andrewsunada\.com/ })).toHaveAttribute(
			'href', 'mailto:andrew@andrewsunada.com',
		);
	});
});
