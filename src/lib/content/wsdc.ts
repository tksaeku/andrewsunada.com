import type { WsdcRecord } from './types';

export const wsdcRecord: WsdcRecord = {
	wsdcId: 8715,
	division: 'All-Stars',
	registryUrl: 'https://points.worldsdc.com/lookup2020/find?num=8715',
	placements: [
		{ event: 'The Bend Connection', year: 2025, division: 'All-Stars', place: 2 },
		{ event: 'SwingCouver', year: 2020, division: 'All-Stars', place: 3 },
		{ event: 'BridgeTown Swing', year: 2019, division: 'All-Stars', place: 2 },
		{ event: 'SwingCouver', year: 2018, division: 'All-Stars', place: 1 },
		{ event: 'Dance N Play', year: 2016, division: 'All-Stars', place: 2 },
	],
};

export const danceIntroduction =
	'I compete as a leader in the All-Stars division of the World Swing Dance Council, travelling to Jack and Jill and Strictly competitions across North America and Asia.';

const placeLabels: Record<number, string> = { 1: '1st', 2: '2nd', 3: '3rd' };

export const getPlaceLabel = (place: number): string => {
	return placeLabels[place] ?? `${place}th`;
};

export const dancePageCopy = {
	heroLabel: `WSDC #${wsdcRecord.wsdcId} · ${wsdcRecord.division}`,
	headline: 'Competition dancing',
	record: {
		label: 'Record',
		headline: 'All-Stars since 2016.',
		body: 'I worked up through Novice, Intermediate and Advanced to the All-Stars division. These are my All-Star podium finishes; the registry has every result.',
		registryLinkLabel: 'See my WSDC record',
	},
	videos: {
		label: 'Videos',
		headline: 'Watch the dancing.',
		body: 'A hand-picked set of Jack and Jill and Strictly heats, newest first.',
	},
	channel: {
		label: 'Channel',
		headline: 'There’s more on YouTube.',
		body: 'Nearly every event I compete at ends up on my channel, along with social dances and demos.',
		linkLabel: 'Visit my YouTube channel',
	},
};
