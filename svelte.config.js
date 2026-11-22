import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		typescript: {
			config: (tsconfig) => ({
				...tsconfig,
				include: [...tsconfig.include, '../scripts/**/*.ts'],
			}),
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			strict: true,
		}),
		// Root-absolute asset URLs, so 404.html still loads its styles when Apache serves it at a nested path.
		paths: {
			relative: false,
		},
		prerender: {
			handleHttpError: 'fail',
			handleMissingId: 'fail',
			entries: ['*', '/404', '/sitemap.xml', '/robots.txt', '/llms.txt'],
		},
	},
};

export default config;
