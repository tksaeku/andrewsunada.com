import { wsdcRecord } from './wsdc';

describe('wsdcRecord', () => {
	it('records the WSDC id and division', () => {
		expect(wsdcRecord.wsdcId).toBe(8715);
		expect(wsdcRecord.division).toBe('All-Stars');
	});

	it('lists podium finishes only', () => {
		expect(wsdcRecord.placements.length).toBeGreaterThan(0);
		expect(wsdcRecord.placements.every(({ place }) => place >= 1 && place <= 3)).toBe(true);
	});

	it('links the public registry and the dancer-specific record', () => {
		expect(wsdcRecord.registryUrl).toMatch(/^https:\/\/www\.worldsdc\.com\//);
		expect(wsdcRecord.registryRecordUrl).toMatch(/^https:\/\/.+8715/);
	});
});
