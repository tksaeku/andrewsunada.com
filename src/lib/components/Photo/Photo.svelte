<script lang="ts">
	import type { SitePhoto } from '$lib/content/photos';

	type PhotoProps = {
		photo: SitePhoto;
		hasCornerLine?: boolean;
		sizes?: string;
		isEager?: boolean;
	};

	const { photo, hasCornerLine = false, sizes = '(min-width: 64rem) 32rem, 100vw', isEager = false }: PhotoProps =
		$props();
</script>

<figure class="photo" class:has-corner-line={hasCornerLine}>
	<div class="frame">
		<enhanced:img
			src={photo.source}
			alt={photo.alt}
			{sizes}
			loading={isEager ? 'eager' : 'lazy'}
			fetchpriority={isEager ? 'high' : undefined}
		/>
	</div>
	<figcaption class="caption">{photo.caption}</figcaption>
</figure>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.photo {
		margin: 0;
	}

	.frame {
		position: relative;
	}

	.has-corner-line .frame::before {
		content: '';
		position: absolute;
		top: -1.5rem;
		left: -1.5rem;
		width: 45%;
		height: 45%;
		border-top: 1px solid $usuzumi;
		border-left: 1px solid $usuzumi;
		pointer-events: none;
	}

	.frame :global(img) {
		width: 100%;
		height: auto;
	}

	.caption {
		@include small-label;
		margin-top: 0.75rem;
		color: $usuzumi;
		font-size: 0.6875rem;
		font-weight: 500;
	}
</style>
