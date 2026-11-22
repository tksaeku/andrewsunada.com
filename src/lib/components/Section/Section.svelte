<script lang="ts">
	import type { Snippet } from 'svelte';

	type SectionProps = {
		number: string;
		label: string;
		headline: string;
		isBanded?: boolean;
		id?: string;
		children: Snippet;
	};

	const { number, label, headline, isBanded = false, id, children }: SectionProps = $props();
	const headingId = $derived(id ? `${id}-heading` : undefined);
</script>

<section class="section" class:is-banded={isBanded} {id} aria-labelledby={headingId}>
	<div class="inner">
		<p class="label">
			<span class="number">{number}</span>
			<span>{label}</span>
		</p>
		<div class="content">
			<h2 class="headline" id={headingId}>{headline}</h2>
			{@render children()}
		</div>
	</div>
</section>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.section {
		border-top: 1px solid $hairline;
		padding-block: clamp(3.5rem, 9vw, 6.5rem);

		&.is-banded {
			background: $paper-band;
			border-top-color: transparent;
		}
	}

	.inner {
		@include page-container;
		@include label-gutter;
	}

	.label {
		@include small-label;
		display: flex;
		gap: 0.9rem;
		align-items: baseline;
		padding-top: 0.6rem;
	}

	.number {
		color: $shu;
	}

	.content {
		display: grid;
		gap: 2rem;
		min-width: 0;
	}

	.headline {
		@include display-headline;
		font-size: clamp(2.4rem, 5.5vw, 4rem);
		max-width: 16ch;
	}
</style>
