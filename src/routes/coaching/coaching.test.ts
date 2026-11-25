import { render, screen } from '@testing-library/svelte';
import { studentRateDefinition } from '$lib/content/coaching';
import { drillLibraryEmailUrl, lessonBookingEmailUrl, privateLessonBookingUrl } from '$lib/content/site';
import CoachingPage from './+page.svelte';

const getSection = (container: HTMLElement, id: string): HTMLElement => {
	return container.querySelector<HTMLElement>(`section#${id}`) as HTMLElement;
};

const getHrefs = (element: HTMLElement): (string | null)[] => {
	return [...element.querySelectorAll('a')].map((link) => link.getAttribute('href'));
};

describe('Coaching page', () => {
	it('has one h1', () => {
		const { container } = render(CoachingPage);
		expect(container.querySelectorAll('h1')).toHaveLength(1);
	});

	it('orders the offer headings', () => {
		render(CoachingPage);
		const headings = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent?.trim());
		expect(headings).toEqual([
			'Private lessons', 'Monthly coaching', 'Workshops', 'Convention staff and workshops', 'Drill library',
		]);
	});

	it('publishes every rate and the student-rate definition', () => {
		const { container } = render(CoachingPage);
		['$80', '$65', '$100', '$50', studentRateDefinition].forEach((text) => {
			expect(container.textContent).toContain(text);
		});
	});

	it('links both venues without a schedule', () => {
		const { container } = render(CoachingPage);
		expect(screen.getByRole('link', { name: 'Dance with Joy Studios' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Norse Hall' })).toBeInTheDocument();
		expect(container.textContent).not.toMatch(/some (Saturdays|Wednesdays)/);
	});

	it('books private lessons through the booking button', () => {
		const { container } = render(CoachingPage);
		const privateLessons = getSection(container, 'private-lessons');
		const bookingLink = [...privateLessons.querySelectorAll('a')].find((link) => link.textContent?.trim() === 'Book a lesson');
		expect(bookingLink).toHaveAttribute('href', privateLessonBookingUrl || lessonBookingEmailUrl);
	});

	it('sends the other offers to the contact form with their topic', () => {
		const { container } = render(CoachingPage);
		expect(getHrefs(getSection(container, 'monthly-coaching'))).toContain('/contact/?topic=monthly-coaching');
		expect(getHrefs(getSection(container, 'workshops'))).toContain('/contact/?topic=workshop');
		expect(getHrefs(getSection(container, 'conventions'))).toContain('/contact/?topic=event');
	});

	it('never calls monthly coaching a plan', () => {
		const { container } = render(CoachingPage);
		expect(container.textContent?.toLowerCase()).not.toContain('monthly plan');
	});

	it('shows the four drill topics and an email link for the drill library', () => {
		const { container } = render(CoachingPage);
		const drillSection = getSection(container, 'drills');
		const topicHeadings = [...drillSection.querySelectorAll('h3')].map((heading) => heading.textContent);
		expect(topicHeadings).toEqual(['Weight transfer', 'Rhythm and feetwork', 'Connection', 'Swing and shape']);
		expect(drillSection.querySelector('dl')).toBeNull();
		expect(getHrefs(drillSection)).toEqual([drillLibraryEmailUrl]);
	});
});
