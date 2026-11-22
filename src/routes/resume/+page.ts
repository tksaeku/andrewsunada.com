import { buildProfilePage } from '$lib/seo/structuredData';
import type { JsonLd } from '$lib/seo/types';

export const load = (): { structuredData: JsonLd[] } => {
	return { structuredData: [buildProfilePage()] };
};
