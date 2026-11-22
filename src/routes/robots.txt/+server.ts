import { buildRobots } from '$lib/seo/siteFiles';

export const prerender = true;
export const trailingSlash = 'never';

export const GET = (): Response => {
	return new Response(buildRobots(), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
