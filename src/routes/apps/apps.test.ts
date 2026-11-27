import { render, screen } from '@testing-library/svelte';
import AppsPage from './+page.svelte';

const getCard = (container: HTMLElement, name: string): HTMLElement => {
	const cards = [...container.querySelectorAll<HTMLElement>('article.card')];
	return cards.find((card) => card.querySelector('h3')?.textContent?.trim() === name) as HTMLElement;
};

describe('Apps page', () => {
	it('has one h1', () => {
		const { container } = render(AppsPage);
		expect(container.querySelectorAll('h1')).toHaveLength(1);
	});

	it('shows the four cards in order', () => {
		const { container } = render(AppsPage);
		const names = [...container.querySelectorAll('article.card h3')].map((title) => title.textContent?.trim());
		expect(names).toEqual(['Meeko', 'TK Wallet', 'WeMove', 'Bingo']);
	});

	it('links the live apps and leaves WeMove unlinked', () => {
		const { container } = render(AppsPage);
		expect(getCard(container, 'Meeko').querySelector('a')).toHaveAttribute('href', 'https://www.meekoapp.com');
		expect(getCard(container, 'TK Wallet').querySelector('a')).toHaveAttribute('href', 'https://tkwallet.me/home');
		expect(getCard(container, 'WeMove').querySelector('a')).toBeNull();
	});

	it('links Bingo to its live site and its public repository', () => {
		const { container } = render(AppsPage);
		const hrefs = Array.from(getCard(container, 'Bingo').querySelectorAll('a')).map((link) => link.getAttribute('href'));
		expect(hrefs).toEqual(['https://bingo.wemove.dance', 'https://github.com/tksaeku/bingo']);
	});

	it('links the GitHub profile', () => {
		render(AppsPage);
		expect(screen.getAllByRole('link').some((link) => link.getAttribute('href') === 'https://github.com/tksaeku')).toBe(true);
	});
});
