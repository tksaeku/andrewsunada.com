<script lang="ts">
	import type { Snippet } from 'svelte';

	type CardProps = {
		title: string;
		href: string;
		eyebrow?: string;
		children: Snippet;
	};

	const { title, href, eyebrow = '', children }: CardProps = $props();

	const hasLink = $derived(href.trim() !== '');
	const isExternal = $derived(/^https?:\/\//.test(href));
</script>

<article class="card" class:has-link={hasLink}>
	{#if eyebrow}
		<p class="eyebrow">{eyebrow}</p>
	{/if}
	<h3 class="title">
		{#if hasLink}
			<a {href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>{title}</a>
		{:else}
			{title}
		{/if}
	</h3>
	<div class="body">
		{@render children()}
	</div>
</article>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.card {
		position: relative;
		display: grid;
		gap: 0.9rem;
		align-content: start;
		padding: 1.75rem;
		background: $paper;
		border: 1px solid $hairline;
		transition: border-color 0.2s ease;

		&.has-link:hover {
			border-color: $shu;
		}
	}

	.eyebrow {
		@include small-label;
		color: $shu;
		font-size: 0.6875rem;
	}

	.title {
		font-family: $font-display;
		font-size: 1.75rem;
		letter-spacing: -0.01em;

		a {
			color: $sumi;
			text-decoration: none;

			// The whole card is the link's hit area.
			&::after {
				content: '';
				position: absolute;
				inset: 0;
			}

			&:hover {
				color: $shu;
			}
		}
	}

	.body {
		display: grid;
		gap: 0.75rem;
		color: $usuzumi;
		font-size: 0.9375rem;
	}
</style>
