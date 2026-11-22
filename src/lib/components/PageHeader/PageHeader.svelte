<script lang="ts">
	import type { Snippet } from 'svelte';
	import Photo from '$lib/components/Photo/Photo.svelte';
	import type { SitePhoto } from '$lib/content/photos';

	type PageHeaderProps = {
		label: string;
		headline: string;
		photo?: SitePhoto;
		actions?: Snippet;
		children: Snippet;
	};

	const { label, headline, photo, actions, children }: PageHeaderProps = $props();
</script>

<div class="page-header" class:has-photo={photo !== undefined}>
	<div class="text">
		<p class="label">{label}</p>
		<h1>{headline}</h1>
		<div class="introduction">
			{@render children()}
		</div>
		{#if actions}
			<div class="actions">
				{@render actions()}
			</div>
		{/if}
	</div>
	{#if photo}
		<div class="photo">
			<Photo {photo} isEager sizes="(min-width: 40rem) 26rem, 100vw" />
		</div>
	{/if}
</div>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.page-header {
		@include page-container;
		display: grid;
		gap: 3rem;
		align-items: center;
		padding-block: clamp(3rem, 8vw, 6rem);

		@media (min-width: $narrow) {
			&.has-photo {
				grid-template-columns: 1.3fr 1fr;
			}
		}
	}

	.label {
		@include small-label;
		display: flex;
		gap: 0.6rem;
		align-items: center;
		color: $shu;
		font-size: 0.6875rem;

		&::before {
			content: '';
			width: 0.45rem;
			height: 0.45rem;
			background: $shu;
		}
	}

	h1 {
		@include display-headline;
		margin-block: 1rem 1.5rem;
		font-size: clamp(3rem, 8vw, 5.5rem);
	}

	.introduction {
		display: grid;
		gap: 1rem;
		max-width: 36rem;
		font-size: 1.125rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem 2rem;
		align-items: center;
		margin-top: 2rem;
	}

	.photo {
		justify-self: end;
		width: 100%;
		max-width: 26rem;
	}
</style>
