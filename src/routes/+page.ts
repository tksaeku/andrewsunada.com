import { getFeaturedVideos } from '$lib/content/videos';
import { buildVideoObjects } from '$lib/seo/structuredData';
import type { JsonLd } from '$lib/seo/types';

export const load = (): { structuredData: JsonLd[] } => {
	return { structuredData: buildVideoObjects(getFeaturedVideos()) };
};
