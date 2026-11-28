<script lang="ts">
	import { buildGtagBootstrap, getGtagScriptUrl } from '$lib/analytics/gtagSnippet';

	/** A measurement ID already checked by `getMeasurementId`; empty renders nothing. */
	const { measurementId }: { measurementId: string } = $props();

	const headScripts = $derived(
		measurementId === ''
			? ''
			: `<script async src="${getGtagScriptUrl(measurementId)}"></` + 'script>'
				+ `<script>${buildGtagBootstrap(measurementId)}</` + 'script>',
	);
</script>

<svelte:head>
	{#if headScripts}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- built from a measurement ID that getMeasurementId restricts to G- and capitals or digits -->
		{@html headScripts}
	{/if}
</svelte:head>
