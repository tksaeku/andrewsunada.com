<script lang="ts">
	import ArrowLink from '$lib/components/ArrowLink/ArrowLink.svelte';
	import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
	import Photo from '$lib/components/Photo/Photo.svelte';
	import Section from '$lib/components/Section/Section.svelte';
	import VideoEmbed from '$lib/components/VideoEmbed/VideoEmbed.svelte';
	import { sitePhotos } from '$lib/content/photos';
	import { shortBio, youtubeChannelUrl } from '$lib/content/site';
	import { videos } from '$lib/content/videos';
	import { dancePageCopy, danceIntroduction, getPlaceLabel, wsdcRecord } from '$lib/content/wsdc';

	const videoYears = [...new Set(videos.map(({ year }) => year))].sort((first, second) => second - first);
	const getVideosForYear = (year: number): typeof videos => {
		return videos.filter((video) => video.year === year);
	};
</script>

<PageHeader label={dancePageCopy.heroLabel} headline={dancePageCopy.headline} photo={sitePhotos.danceHeader}>
	<p>{danceIntroduction}</p>
	<p class="bio">{shortBio}</p>
</PageHeader>

<Section id="record" number="01" label={dancePageCopy.record.label} headline={dancePageCopy.record.headline}>
	<p class="lead">{dancePageCopy.record.body}</p>
	<div class="record-layout">
		<ol class="placements">
			{#each wsdcRecord.placements as placement (`${placement.event}-${placement.year}`)}
				<li class="placement">
					<span class="place">{getPlaceLabel(placement.place)}</span>
					<span class="event">{placement.event}</span>
					<span class="meta">{placement.division} · {placement.year}</span>
				</li>
			{/each}
		</ol>
		<div class="record-photo">
			<Photo photo={sitePhotos.bio} sizes="(min-width: 40rem) 16rem, 100vw" />
		</div>
	</div>
	<div>
		<ArrowLink href={wsdcRecord.registryUrl}>{dancePageCopy.record.registryLinkLabel}</ArrowLink>
	</div>
</Section>

<Section id="videos" number="02" label={dancePageCopy.videos.label} headline={dancePageCopy.videos.headline} isBanded>
	<p class="lead">{dancePageCopy.videos.body}</p>
	{#each videoYears as year (year)}
		<div class="year-group">
			<h3 class="year-heading">{year}</h3>
			<div class="video-grid">
				{#each getVideosForYear(year) as video (video.youtubeId)}
					<VideoEmbed {video} />
				{/each}
			</div>
		</div>
	{/each}
</Section>

<Section id="channel" number="03" label={dancePageCopy.channel.label} headline={dancePageCopy.channel.headline}>
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

	.record-layout {
		display: grid;
		gap: 2rem;
		align-items: start;

		@media (min-width: $narrow) {
			grid-template-columns: 1fr 16rem;
		}
	}

	.placements {
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: 1px solid $hairline;
	}

	.placement {
		display: grid;
		grid-template-columns: 3.5rem 1fr;
		gap: 0.15rem 1rem;
		align-items: baseline;
		padding-block: 1.1rem;
		border-bottom: 1px solid $hairline;
	}

	.place {
		grid-row: span 2;
		color: $shu;
		font-family: $font-display;
		font-size: 1.75rem;
		font-style: italic;
	}

	.event {
		font-family: $font-display;
		font-size: 1.35rem;
	}

	.meta {
		@include small-label;
		color: $usuzumi;
		font-size: 0.6875rem;
		font-weight: 500;
	}

	.year-group {
		display: grid;
		gap: 1.25rem;
		padding-top: 1.5rem;
		border-top: 1px solid $hairline;
	}

	.year-heading {
		color: $shu;
		font-size: 1.75rem;
		font-style: italic;
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
