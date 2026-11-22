import { fileURLToPath } from 'node:url';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

const stylesDirectory = fileURLToPath(new URL('./src/lib/styles', import.meta.url));

export default defineConfig({
	envPrefix: ['VITE_', 'PUBLIC_'],
	plugins: [enhancedImages(), sveltekit(), svelteTesting()],
	css: {
		preprocessorOptions: {
			scss: {
				loadPaths: [stylesDirectory],
			},
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
		include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
		setupFiles: ['./vitest.setup.ts'],
	},
});
