<script lang="ts">
	import { page } from '$app/state';
	import ErrorMessage from '$lib/components/ErrorMessage/ErrorMessage.svelte';
</script>

<svelte:head>
	<title>Page not found · Andrew Sunada</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<ErrorMessage status={page.status} />
