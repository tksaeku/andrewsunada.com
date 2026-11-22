<script lang="ts">
	import { siteName } from '$lib/content/site';
	import { serializeJsonLd } from '$lib/seo/jsonLd';
	import { getCanonicalUrl, shareImagePath } from '$lib/seo/pageMeta';
	import type { JsonLd, PageMeta } from '$lib/seo/types';

	const { meta, structuredData }: { meta: PageMeta; structuredData: JsonLd[] } = $props();

	const canonicalUrl = $derived(getCanonicalUrl(meta.path));
	const shareImageUrl = getCanonicalUrl(shareImagePath);
	const siteVerification = import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION ?? '';
	const jsonLdScripts = $derived(
		structuredData.map((data) => `<script type="application/ld+json">${serializeJsonLd(data)}</` + 'script>'),
	);
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={shareImageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Andrew Sunada, West Coast Swing coach and software engineer" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={shareImageUrl} />
	{#if siteVerification}
		<meta name="google-site-verification" content={siteVerification} />
	{/if}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- serialised by serializeJsonLd, which escapes '<' -->
	{@html jsonLdScripts.join('')}
</svelte:head>
