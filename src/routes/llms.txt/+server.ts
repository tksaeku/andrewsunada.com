import { buildLlmsText } from '$lib/seo/siteFiles';

export const prerender = true;
export const trailingSlash = 'never';

export const GET = (): Response => {
	return new Response(buildLlmsText(), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
};
