import type { AppProject } from './types';

export const appsIntroduction =
	'I build software the way I teach dance: fundamentals first, then the details that make it feel effortless. These are the products I build and run on my own time.';

export const appProjects: AppProject[] = [
	{
		slug: 'meeko',
		name: 'Meeko',
		pitch: 'Nanny hours and household pay, kept tax-ready: log hours, calculate pay and overtime, track time off and withholdings, and export records for your tax preparer.',
		stack: ['Svelte 5', 'Express 5', 'TypeScript', 'MariaDB', 'Stripe'],
		status: 'Live',
		linkUrl: 'https://www.meekoapp.com',
		linkLabel: 'Visit meekoapp.com',
		codeUrl: '',
		codeLabel: '',
	},
	{
		slug: 'tk-wallet',
		name: 'TK Wallet',
		pitch: 'A household finance app that syncs bank accounts, sorts transactions with rules, tags and categories, and tells the story of where the money goes.',
		stack: ['React', 'Express', 'TypeScript', 'MongoDB', 'Plaid', 'Auth0'],
		status: 'Live',
		linkUrl: 'https://tkwallet.me/home',
		linkLabel: 'Visit tkwallet.me',
		codeUrl: '',
		codeLabel: '',
	},
	{
		slug: 'wemove',
		name: 'WeMove',
		pitch: 'An event app for the West Coast Swing community: dancer profiles, WSDC points and division lookup, and partner matching for competitions.',
		stack: ['React', 'TypeScript', 'Express', 'Firebase'],
		status: 'Paused',
		linkUrl: '',
		linkLabel: '',
		codeUrl: '',
		codeLabel: '',
	},
	{
		slug: 'bingo',
		name: 'Bingo',
		pitch: 'A 5×5 bingo game for The Open: boards saved across reloads, automatic win detection, a shared leaderboard, and first-party analytics with no cookies or third-party scripts.',
		stack: ['React 19', 'Express 5', 'TypeScript', 'Firestore', 'Firebase App Hosting'],
		status: 'Live',
		linkUrl: 'https://bingo.wemove.dance',
		linkLabel: 'Play at bingo.wemove.dance',
		codeUrl: 'https://github.com/tksaeku/bingo',
		codeLabel: 'View the code on GitHub',
	},
];

export const appsPageCopy = {
	heroLabel: 'Software',
	headline: 'Apps I build and run',
	projects: {
		label: 'Projects',
		headline: 'Built end to end.',
	},
	github: {
		label: 'Code',
		headline: 'More on GitHub.',
		body: 'Most of these apps are private because they hold real household and payroll data. My public experiments and older projects are on GitHub.',
		linkLabel: 'Visit github.com/tksaeku',
	},
};
