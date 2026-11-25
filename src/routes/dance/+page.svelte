<script lang="ts">
	import ArrowLink from '$lib/components/ArrowLink/ArrowLink.svelte';
	import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
	import Section from '$lib/components/Section/Section.svelte';
	import VideoEmbed from '$lib/components/VideoEmbed/VideoEmbed.svelte';
	import { sitePhotos } from '$lib/content/photos';
	import { shortBio, youtubeChannelUrl } from '$lib/content/site';
	import { mostWatchedVideos } from '$lib/content/videos';
	import { dancePageCopy, danceIntroduction } from '$lib/content/wsdc';

</script>

<PageHeader label={dancePageCopy.heroLabel} headline={dancePageCopy.headline} photo={sitePhotos.danceHeader}>
	<p>{danceIntroduction}</p>
	<p class="bio">{shortBio}</p>
</PageHeader>

<Section id="videos" number="01" label={dancePageCopy.videos.label} headline={dancePageCopy.videos.headline} isBanded>
	<p class="lead">{dancePageCopy.videos.body}</p>
	<div class="video-grid">
		{#each mostWatchedVideos as video (video.youtubeId)}
			<VideoEmbed {video} />
		{/each}
	</div>
</Section>

<Section id="channel" number="02" label={dancePageCopy.channel.label} headline={dancePageCopy.channel.headline}>
	<p class="lead">{dancePageCopy.channel.body}</p>
	<div>
		<ArrowLink href={youtubeChannelUrl}>{dancePageCopy.channel.linkLabel}</ArrowLink>
	</div>
</Section>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.bio {
		color: $usuzumi;
		font-size: 1rem;
	}

	.lead {
		max-width: 40rem;
		color: $usuzumi;
	}

	.video-grid {
		display: grid;
		gap: 2rem;

		@media (min-width: $narrow) {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
		}

		@media (min-width: $wide) {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
