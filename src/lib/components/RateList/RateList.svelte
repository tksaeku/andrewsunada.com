<script lang="ts">
	import type { Rate } from '$lib/content/types';

	const { rates }: { rates: Rate[] } = $props();
</script>

<ul class="rate-list">
	{#each rates as rate (rate.label)}
		<li class="rate">
			<span class="label">{rate.label}</span>
			<span class="price"><span class="amount">${rate.amountUsd}</span> <span class="unit">/ {rate.unit}</span></span>
			{#if rate.note}
				<span class="note">{rate.note}</span>
			{/if}
		</li>
	{/each}
</ul>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.rate-list {
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: 1px solid $hairline;
	}

	.rate {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.25rem 1rem;
		align-items: baseline;
		padding-block: 1rem;
		border-bottom: 1px solid $hairline;
	}

	.label {
		@include small-label;
		color: $usuzumi;
	}

	.amount {
		font-family: $font-display;
		font-size: 2rem;
		line-height: 1;
	}

	.unit {
		color: $usuzumi;
		font-size: 0.875rem;
	}

	.note {
		grid-column: 1 / -1;
		color: $usuzumi;
		font-size: 0.875rem;
	}
</style>
