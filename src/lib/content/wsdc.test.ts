import { wsdcRecord } from './wsdc';

describe('wsdcRecord', () => {
	it('records the WSDC id and division', () => {
		expect(wsdcRecord.wsdcId).toBe(8715);
		expect(wsdcRecord.division).toBe('All-Stars');
	});

	it('links the public registry and the dancer-specific record', () => {
		expect(wsdcRecord.registryUrl).toMatch(/^https:\/\/www\.worldsdc\.com\//);
		expect(wsdcRecord.registryRecordUrl).toMatch(/^https:\/\/.+8715/);
	});
});
