import { appProjects } from './apps';

describe('appProjects', () => {
	it('lists the four apps in order', () => {
		expect(appProjects.map(({ name }) => name)).toEqual(['Meeko', 'TK Wallet', 'WeMove', 'Bingo']);
	});

	it('links Meeko to its live site', () => {
		expect(appProjects.find(({ name }) => name === 'Meeko')?.linkUrl).toBe('https://www.meekoapp.com');
	});

	it('links no private app', () => {
		const privateApps = appProjects.filter(({ name }) => name === 'TK Wallet' || name === 'WeMove');
		expect(privateApps.map(({ linkUrl }) => linkUrl)).toEqual(['', '']);
	});

	it('links Bingo to its public repository', () => {
		expect(appProjects.find(({ name }) => name === 'Bingo')?.linkUrl).toBe('https://github.com/tksaeku/bingo');
	});
});
