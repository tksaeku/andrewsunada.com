import { buildSitemap } from '$lib/seo/siteFiles';

export const prerender = true;
export const trailingSlash = 'never';

export const GET = (): Response => {
	const lastModified = new Date().toISOString().slice(0, 10);

	return new Response(buildSitemap(lastModified), {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
