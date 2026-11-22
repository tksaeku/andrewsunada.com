import { drills } from './drills';

describe('drills', () => {
	it('holds eight to twelve drills', () => {
		expect(drills.length).toBeGreaterThanOrEqual(8);
		expect(drills.length).toBeLessThanOrEqual(12);
	});

	it('gives every drill a topic and a description', () => {
		expect(drills.every(({ topic, description }) => topic !== '' && description !== '')).toBe(true);
	});
});
