import { drillTopics } from './drills';

describe('drillTopics', () => {
	it('lists the four drill library topics in order', () => {
		expect(drillTopics).toEqual(['Weight transfer', 'Rhythm and feetwork', 'Connection', 'Swing and shape']);
	});
});
