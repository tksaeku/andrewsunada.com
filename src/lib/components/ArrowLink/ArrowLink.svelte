<script lang="ts">
	import type { Snippet } from 'svelte';

	const { href, children }: { href: string; children: Snippet } = $props();
	const isExternal = $derived(/^https?:\/\//.test(href));
</script>

<a class="arrow-link" {href} rel={isExternal ? 'noopener' : undefined}>
	{@render children()}
	<svg class="arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
		<path d="M3 13 13 3M6 3h7v7" fill="none" stroke="currentColor" stroke-width="1.4" />
	</svg>
</a>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.arrow-link {
		@include small-label;
		display: inline-flex;
		gap: 0.5rem;
		align-items: center;
		padding-bottom: 0.35rem;
		border-bottom: 1px solid currentColor;
		color: $sumi;
		text-decoration: none;

		&:hover {
			color: $shu;
		}
	}

	.arrow {
		transition: transform 0.2s ease;
	}

	.arrow-link:hover .arrow {
		transform: translate(2px, -2px);
	}
</style>
