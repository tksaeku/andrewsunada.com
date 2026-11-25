import { appProjects } from './apps';

describe('appProjects', () => {
	it('lists the four apps in order', () => {
		expect(appProjects.map(({ name }) => name)).toEqual(['Meeko', 'TK Wallet', 'WeMove', 'Bingo']);
	});

	it('links Meeko to its live site', () => {
		expect(appProjects.find(({ name }) => name === 'Meeko')?.linkUrl).toBe('https://www.meekoapp.com');
	});

	it('links TK Wallet and leaves WeMove unlinked', () => {
		const linkUrlByName = Object.fromEntries(appProjects.map(({ name, linkUrl }) => [name, linkUrl]));
		expect(linkUrlByName['TK Wallet']).toBe('https://tkwallet.me/home');
		expect(linkUrlByName.WeMove).toBe('');
	});

	it('links Bingo to its public repository', () => {
		expect(appProjects.find(({ name }) => name === 'Bingo')?.linkUrl).toBe('https://github.com/tksaeku/bingo');
	});
});
