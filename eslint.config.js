import javascript from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import typescript from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default typescript.config(
	javascript.configs.recommended,
	...typescript.configs.recommended,
	...svelte.configs.recommended,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
		rules: {
			'prefer-const': 'error',
			'no-var': 'error',
			curly: ['error', 'all'],
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'always'],
			'svelte/no-navigation-without-resolve': 'off',
		},
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: typescript.parser,
				svelteConfig,
			},
		},
	},
	{
		ignores: ['build/', '.svelte-kit/', 'node_modules/', '.superpowers/'],
	},
);
