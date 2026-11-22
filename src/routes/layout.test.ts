import { prerender, trailingSlash } from './+layout';

describe('root layout options', () => {
	it('prerenders every route as a directory', () => {
		expect(prerender).toBe(true);
		expect(trailingSlash).toBe('always');
	});
});
