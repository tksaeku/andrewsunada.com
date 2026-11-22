<script lang="ts">
	import type { Snippet } from 'svelte';
	import '$lib/styles/base.scss';

	const { children }: { children: Snippet } = $props();
</script>

{@render children()}
