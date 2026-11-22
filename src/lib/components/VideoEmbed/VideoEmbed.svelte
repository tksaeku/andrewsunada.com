<script lang="ts">
	import type { Video } from '$lib/content/types';
	import { getVideoLabel, getVideoThumbnailUrl, getVideoWatchUrl } from '$lib/content/videos';

	const { video }: { video: Video } = $props();

	let isPlaying = $state(false);

	const label = $derived(getVideoLabel(video));
	const embedUrl = $derived(`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`);

	const play = (): void => {
		isPlaying = true;
	};
</script>

<figure class="video-embed">
	<div class="frame">
		{#if isPlaying}
			<iframe
				src={embedUrl}
				title={label}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		{:else}
			<button class="play" type="button" aria-label="Play {label}" onclick={play}>
				<img src={getVideoThumbnailUrl(video)} alt={video.title} width="480" height="360" loading="lazy" decoding="async" />
				<span class="play-icon" aria-hidden="true"></span>
			</button>
		{/if}
	</div>
	<figcaption class="caption">
		<span class="event">{video.event} {video.year}</span>
		<span class="title">{video.title}</span>
		<a class="watch-link" href={getVideoWatchUrl(video)} rel="noopener">Watch on YouTube</a>
	</figcaption>
</figure>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.video-embed {
		display: grid;
		gap: 0.75rem;
		margin: 0;
		min-width: 0;
	}

	.frame {
		position: relative;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background: $sumi;
	}

	iframe,
	.play {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.play {
		padding: 0;
		background: $sumi;
		cursor: pointer;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(1);
			opacity: 0.85;
			transition:
				filter 0.3s ease,
				opacity 0.3s ease;
		}

		&:hover img,
		&:focus-visible img {
			filter: grayscale(0.4);
			opacity: 1;
		}
	}

	.play-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 3.5rem;
		height: 3.5rem;
		background: $shu;
		border-radius: 50%;
		transform: translate(-50%, -50%);

		&::after {
			content: '';
			position: absolute;
			top: 50%;
			left: 54%;
			border-top: 0.55rem solid transparent;
			border-bottom: 0.55rem solid transparent;
			border-left: 0.9rem solid $paper;
			transform: translate(-50%, -50%);
		}
	}

	.caption {
		display: grid;
		gap: 0.2rem;
	}

	.event {
		@include small-label;
		color: $shu;
		font-size: 0.6875rem;
	}

	.title {
		font-size: 0.9375rem;
	}

	.watch-link {
		color: $usuzumi;
		font-size: 0.8125rem;
	}
</style>
