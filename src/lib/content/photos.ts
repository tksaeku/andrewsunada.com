import type { Picture } from 'vite-imagetools';
import coachingLessonsSource from '$lib/images/andrew-sunada-dance-point.jpg?enhanced';
import coachingWorkshopsSource from '$lib/images/andrew-sunada-dance-arms-extended.jpg?enhanced';
import contactSource from '$lib/images/andrew-sunada-seated-white-tee.jpg?enhanced';
import danceHeaderSource from '$lib/images/andrew-sunada-reaching.jpg?enhanced';
import danceSource from '$lib/images/andrew-sunada-dance-lean.jpg?enhanced';
import heroSource from '$lib/images/andrew-sunada-portrait-black-tee.jpg?enhanced';
import professionalSource from '$lib/images/andrew-sunada-grey-blazer.jpg?enhanced';

export type SitePhoto = {
	key: string;
	source: Picture;
	alt: string;
	caption: string;
};

export const sitePhotos: Record<string, SitePhoto> = {
	hero: {
		key: 'hero',
		source: heroSource,
		alt: 'Andrew Sunada in a black t-shirt, leaning toward the camera with a slight smile',
		caption: 'Present and connected',
	},
	dance: {
		key: 'dance',
		source: danceSource,
		alt: 'Andrew Sunada leaning into a dance step, one knee lifted and one arm curved in front of him',
		caption: 'Movement in practice',
	},
	coachingLessons: {
		key: 'coachingLessons',
		source: coachingLessonsSource,
		alt: 'Andrew Sunada balancing on one leg and pointing across his body, a stage light behind him',
		caption: 'One step at a time',
	},
	coachingWorkshops: {
		key: 'coachingWorkshops',
		source: coachingWorkshopsSource,
		alt: 'Andrew Sunada mid-step with both arms extended, a stage light flaring behind him',
		caption: 'Workshops',
	},
	danceHeader: {
		key: 'danceHeader',
		source: danceHeaderSource,
		alt: 'Andrew Sunada in a floral t-shirt, reaching both arms toward the camera',
		caption: 'Form follows feeling',
	},
	professional: {
		key: 'professional',
		source: professionalSource,
		alt: 'Andrew Sunada smiling in a grey blazer against a light background',
		caption: 'Engineering',
	},
	contact: {
		key: 'contact',
		source: contactSource,
		alt: 'Andrew Sunada seated in a white t-shirt, smiling warmly',
		caption: 'Let’s talk',
	},
};
