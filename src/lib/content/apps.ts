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
	},
	{
		slug: 'tk-wallet',
		name: 'TK Wallet',
		pitch: 'A household finance app that syncs bank accounts, sorts transactions with rules, tags and categories, and tells the story of where the money goes.',
		stack: ['React', 'Express', 'TypeScript', 'MongoDB', 'Plaid', 'Auth0'],
		status: 'In household use',
		linkUrl: '',
		linkLabel: '',
	},
	{
		slug: 'wemove',
		name: 'WeMove',
		pitch: 'An event app for the West Coast Swing community: dancer profiles, WSDC points and division lookup, and partner matching for competitions.',
		stack: ['React', 'TypeScript', 'Express', 'Firebase'],
		status: 'Paused',
		linkUrl: '',
		linkLabel: '',
	},
	{
		slug: 'bingo',
		name: 'Bingo',
		pitch: 'A full-stack bingo game with custom board options and a leaderboard.',
		stack: ['React', 'TypeScript', 'SCSS', 'Node', 'Firebase'],
		status: 'Open source',
		linkUrl: 'https://github.com/tksaeku/bingo',
		linkLabel: 'View the code on GitHub',
	},
];
