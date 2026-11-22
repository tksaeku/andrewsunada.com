<script lang="ts">
	import ArrowLink from '$lib/components/ArrowLink/ArrowLink.svelte';

	const { status }: { status: number } = $props();
	const isNotFound = $derived(status === 404);
</script>

<svelte:head>
	<title>{isNotFound ? 'Page not found' : 'Something went wrong'} · Andrew Sunada</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="error-message">
	<p class="status">{status}</p>
	<h1>{isNotFound ? 'This page has moved on.' : 'Something went wrong.'}</h1>
	<p class="body">
		{isNotFound
			? 'The page you were looking for isn’t here. Everything on the site is one step away from the menu above.'
			: 'Please try again in a moment.'}
	</p>
	<ArrowLink href="/">Back to the home page</ArrowLink>
</div>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.error-message {
		@include page-container;
		display: grid;
		gap: 1.5rem;
		justify-items: start;
		padding-block: clamp(4rem, 12vw, 8rem);
	}

	.status {
		@include small-label;
		color: $shu;
	}

	h1 {
		@include display-headline;
		font-size: clamp(2.6rem, 7vw, 4.5rem);
	}

	.body {
		max-width: 36rem;
		color: $usuzumi;
	}
</style>
