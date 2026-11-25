import type { WsdcRecord } from './types';

export const wsdcRecord: WsdcRecord = {
	wsdcId: 8715,
	division: 'All-Stars',
	registryUrl: 'https://www.worldsdc.com/registry-points/',
	registryRecordUrl: 'https://points.worldsdc.com/lookup2020/find?num=8715',
};

export const danceIntroduction =
	'I compete as a leader in the All-Stars division of the World Swing Dance Council, travelling to Jack and Jill and Strictly competitions across North America, Europe, and Asia.';

export const dancePageCopy = {
	heroLabel: `WSDC #${wsdcRecord.wsdcId} · ${wsdcRecord.division}`,
	headline: 'Competition dancing',
	videos: {
		label: 'Videos',
		headline: 'Watch the dancing.',
		body: 'My most-watched Jack and Jill heats.',
	},
	channel: {
		label: 'Channel',
		headline: 'There’s more on YouTube.',
		body: 'Nearly every event I compete at ends up on my channel, along with social dances and demos.',
		linkLabel: 'Visit my YouTube channel',
	},
};
