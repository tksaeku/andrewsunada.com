import { coachingOffers, studentRateDefinition, venues, workshops } from './coaching';

describe('coachingOffers', () => {
	it('lists the four offers in order', () => {
		expect(coachingOffers.map(({ slug }) => slug)).toEqual([
			'private-lessons', 'monthly-coaching', 'workshops', 'conventions',
		]);
	});

	it('prices private lessons at $80 and the student rate at $65', () => {
		const privateLessons = coachingOffers.find(({ slug }) => slug === 'private-lessons');
		expect(privateLessons?.rates.map(({ amountUsd }) => amountUsd)).toEqual([80, 65]);
	});

	it('prices monthly coaching at $100 an hour and $50 a half hour', () => {
		const monthlyCoaching = coachingOffers.find(({ slug }) => slug === 'monthly-coaching');
		expect(monthlyCoaching?.title).toBe('Monthly coaching');
		expect(monthlyCoaching?.rates.map(({ amountUsd }) => amountUsd)).toEqual([100, 50]);
	});

	it('never calls monthly coaching a plan', () => {
		expect(JSON.stringify(coachingOffers).toLowerCase()).not.toContain('monthly plan');
	});
});

describe('studentRateDefinition', () => {
	it('defines who gets the student rate', () => {
		expect(studentRateDefinition).toContain('active student at a university or school');
	});
});

describe('venues', () => {
	it('names both workshop venues with their websites', () => {
		expect(venues.map(({ name }) => name)).toEqual(['Dance with Joy Studios', 'Norse Hall']);
		expect(venues.every(({ url }) => url.startsWith('https://'))).toBe(true);
	});
});

describe('workshops', () => {
	it('lists the three workshops by title', () => {
		expect(workshops.map(({ title }) => title)).toEqual(['Rhythm and Rhyme', 'The Volume Dial', 'Exit and Enter Swing']);
	});
});
