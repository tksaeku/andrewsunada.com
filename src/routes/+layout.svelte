<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Header from '$lib/components/Header/Header.svelte';
	import Seo from '$lib/components/Seo/Seo.svelte';
	import { pageMetaByPath } from '$lib/seo/pageMeta';
	import { buildBreadcrumbList, buildPerson, buildWebSite } from '$lib/seo/structuredData';
	import type { JsonLd } from '$lib/seo/types';
	import '$lib/styles/base.scss';

	const { children }: { children: Snippet } = $props();

	const pageMeta = $derived(pageMetaByPath[page.url.pathname]);
	const structuredData = $derived.by((): JsonLd[] => {
		if (!pageMeta) {
			return [];
		}
		const breadcrumbs = pageMeta.path === '/' ? [] : [buildBreadcrumbList(pageMeta)];
		return [buildWebSite(), buildPerson(), ...breadcrumbs, ...(page.data.structuredData ?? [])];
	});
</script>

{#if pageMeta}
	<Seo meta={pageMeta} {structuredData} />
{/if}

<a class="skip-link" href="#main">Skip to content</a>
<Header currentPath={page.url.pathname} />
<main id="main" tabindex="-1">
	{@render children()}
</main>
<Footer />

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.skip-link {
		@include small-label;
		position: absolute;
		top: 0.75rem;
		left: 0.75rem;
		z-index: 10;
		padding: 0.75rem 1rem;
		background: $sumi;
		color: $paper;
		transform: translateY(-200%);

		&:focus {
			transform: none;
		}
	}

	main:focus {
		outline: none;
	}
</style>
