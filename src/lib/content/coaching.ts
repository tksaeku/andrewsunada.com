import { ContactTopic } from './types';
import type { CoachingOffer, Venue, Workshop } from './types';

export const studentRateDefinition =
	'The student rate is for anyone who is currently an active student at a university or school.';

export const coachingIntroduction =
	'I coach science before art: clean posture, timing, weight transfer and connection first, then the personal movement that makes your dancing yours. High-level creativity is built on clarity.';

export const coachingOffers: CoachingOffer[] = [
	{
		slug: 'private-lessons',
		title: 'Private lessons',
		summary: 'One-on-one lessons built around what you want to work on, from your first fundamentals to All-Star competition.',
		details: [
			'Lessons happen in Portland, OR and Vancouver, WA.',
			'We start with the fundamentals under whatever you bring — a pattern, a competition clip, a feeling that something is off — and fix the cause, not the symptom.',
			'Book a single lesson whenever you want one; there is no commitment.',
		],
		rates: [
			{ label: 'Private lesson', amountUsd: 80, unit: 'hour' },
			{ label: 'Student rate', amountUsd: 65, unit: 'hour', note: studentRateDefinition },
		],
		contactTopic: ContactTopic.Lesson,
	},
	{
		slug: 'monthly-coaching',
		title: 'Monthly coaching',
		summary: 'A full coaching package: one to three sessions a month, with drills and video feedback in between.',
		details: [
			'You get your own drill sheet with the minimum time and reps for each drill, and every session starts by working through it — correcting, adding and removing drills.',
			'The rest of the session targets the areas you most want to grow, and I record video of the specific things to practise.',
			'Between sessions, send me video of your drills or any dancing over WhatsApp. I reply with written notes, a marked-up video or a demo.',
			'One to three sessions a month works best; more than that gives diminishing returns.',
		],
		rates: [
			{
				label: 'Coaching',
				amountUsd: 100,
				unit: 'hour',
				note: 'Per hour of coaching sessions in the month, however much video feedback you send.',
			},
			{ label: 'Half-hour session', amountUsd: 50, unit: 'session', note: 'For smaller budgets.' },
		],
		contactTopic: ContactTopic.MonthlyCoaching,
	},
	{
		slug: 'workshops',
		title: 'Workshops',
		summary: 'Group workshops from Level 1 to an All-Star bootcamp, taught at Portland studios and weekend events.',
		details: [
			'Each workshop takes one idea and builds it from the body up, with drills you can keep using after the class.',
			'Dates are announced through the venues; get in touch to hear about the next one or to bring a workshop to your scene.',
		],
		rates: [],
		contactTopic: ContactTopic.Workshop,
	},
	{
		slug: 'conventions',
		title: 'Convention staff and workshops',
		summary: 'I’m available to teach workshops and serve on staff at West Coast Swing conventions and weekend events.',
		details: [
			'I can teach any of the workshops on this page or build a series around your event’s levels.',
		],
		rates: [],
		contactTopic: ContactTopic.Event,
	},
];

export const venues: Venue[] = [
	{
		name: 'Dance with Joy Studios',
		url: 'https://dancewithjoystudios.com/',
		schedule: 'some Saturdays',
		locality: 'Portland',
		region: 'OR',
	},
	{
		name: 'Norse Hall',
		url: 'https://www.grieglodge.org/',
		schedule: 'some Wednesdays',
		locality: 'Portland',
		region: 'OR',
	},
];

export const workshops: Workshop[] = [
	{
		slug: 'rhythm-and-rhyme',
		title: 'Rhythm and Rhyme',
		level: 'Level 1',
		outline: [
			'Find the pulse of the music and put your body on it.',
			'Three kinds of weight change: full, even and delayed.',
			'The tripod foot, a stable base for every step.',
			'The “and” as a half-beat placeholder.',
		],
	},
	{
		slug: 'the-volume-dial',
		title: 'The Volume Dial',
		level: 'Level 2',
		outline: [
			'Connection as a dial from 1 to 10, not an on-off switch.',
			'Who owns which counts: the leader through 4, the follower on 5 and 6.',
			'Compression and extension without manufacturing tension.',
			'When to be the gas and when to be the brake.',
		],
	},
	{
		slug: 'exit-and-enter-swing',
		title: 'Exit and Enter Swing',
		level: 'Advanced',
		outline: [
			'The 99% solo shift: step into your own movement without leaving the partnership.',
			'Posting on 4.',
			'A decaying tail that brings you back together on a shared 1.',
			'For dancers with command of the four fundamental patterns: sugar push, left-side pass, underarm turn and whip.',
		],
	},
	{
		slug: 'all-star-bootcamp',
		title: 'All-Star bootcamp',
		level: 'All-Star',
		outline: [
			'A four-hour intensive that opens with an assessment dance.',
			'All-Star mechanics and the connection chain from floor to hand.',
			'Follower influence and a system for varying your footwork.',
			'Musical risk in green, yellow and red.',
			'Review rounds and a spotlight critique.',
		],
	},
];

export const coachingPageCopy = {
	heroLabel: 'Lessons · Coaching · Workshops',
	headline: 'West Coast Swing coaching',
	sectionLabels: {
		'private-lessons': 'One-on-one',
		'monthly-coaching': 'Ongoing',
		workshops: 'Groups',
		conventions: 'Events',
		drills: 'Practice',
	} as Record<string, string>,
	callToActionLabels: {
		'monthly-coaching': 'Ask about monthly coaching',
		workshops: 'Ask about workshop dates',
		conventions: 'Invite me to your event',
	} as Record<string, string>,
	venuesHeading: 'Where I teach',
	workshopsHeading: 'The workshop series',
	paymentNote: 'Pay by cash or Venmo, monthly or per session.',
	drillLibrary: {
		headline: 'Drill library',
		introduction: 'A few of the drills I give students. Each one isolates a single skill, so you can practise it alone in a few minutes a day.',
	},
};
