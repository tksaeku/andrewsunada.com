import { appProjects } from '$lib/content/apps';
import { buildSoftwareApplications } from '$lib/seo/structuredData';
import type { JsonLd } from '$lib/seo/types';

export const load = (): { structuredData: JsonLd[] } => {
	return { structuredData: buildSoftwareApplications(appProjects) };
};
