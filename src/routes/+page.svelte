<script lang="ts">
	import ArrowLink from '$lib/components/ArrowLink/ArrowLink.svelte';
	import BookingButton from '$lib/components/BookingButton/BookingButton.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import Photo from '$lib/components/Photo/Photo.svelte';
	import Section from '$lib/components/Section/Section.svelte';
	import VideoEmbed from '$lib/components/VideoEmbed/VideoEmbed.svelte';
	import { appProjects } from '$lib/content/apps';
	import { coachingOffers } from '$lib/content/coaching';
	import { homeCopy } from '$lib/content/home';
	import { sitePhotos } from '$lib/content/photos';
	import { engineeringIntroduction } from '$lib/content/resume';
	import {
		contactEmail, heroIntroduction, lessonBookingEmailUrl, privateLessonBookingUrl, shortBio, youtubeChannelUrl,
	} from '$lib/content/site';
	import { getFeaturedVideos } from '$lib/content/videos';
	import { danceIntroduction } from '$lib/content/wsdc';

	const homeOffers = coachingOffers.filter(({ slug }) => slug !== 'conventions');
	const featuredVideos = getFeaturedVideos();
	const featuredApp = appProjects[0];
</script>

<div class="hero">
	<div class="hero-text">
		<p class="hero-label">{homeCopy.heroLabel}</p>
		<h1 class="hero-name">Andrew <em>Sunada.</em></h1>
		<p class="hero-introduction">{heroIntroduction}</p>
		<div class="hero-actions">
			<BookingButton bookingUrl={privateLessonBookingUrl} fallbackPath={lessonBookingEmailUrl} />
			<ArrowLink href={youtubeChannelUrl}>Watch me dance</ArrowLink>
		</div>
		<p class="hero-note">{homeCopy.heroNote}</p>
	</div>
	<div class="hero-photo">
		<Photo photo={sitePhotos.hero} hasCornerLine isEager sizes="(min-width: 64rem) 30rem, (min-width: 40rem) 45vw, 100vw" />
	</div>
</div>

<Section id="coaching" number="01" label={homeCopy.coaching.label} headline={homeCopy.coaching.headline}>
	<p class="lead">{shortBio}</p>
	<div class="dance-photo">
		<Photo photo={sitePhotos.dance} sizes="(min-width: 40rem) 24rem, 100vw" />
	</div>
	<div class="pair">
		{#each [homeCopy.coaching.asDancer, homeCopy.coaching.asCoach] as point (point.title)}
			<div class="pair-item">
				<h3>{point.title}</h3>
				<p>{point.body}</p>
			</div>
		{/each}
	</div>
	<ol class="offer-rows">
		{#each homeOffers as offer, index (offer.slug)}
			<li class="offer-row">
				<span class="offer-number">0{index + 1}</span>
				<a class="offer-title" href="/coaching/#{offer.slug}">{offer.title}</a>
				<p class="offer-summary">{offer.summary}</p>
			</li>
		{/each}
	</ol>
</Section>

<Section id="dance" number="02" label={homeCopy.dance.label} headline={homeCopy.dance.headline} isBanded>
	<p class="lead">{danceIntroduction}</p>
	<div class="video-grid">
		{#each featuredVideos as video (video.youtubeId)}
			<VideoEmbed {video} />
		{/each}
	</div>
	<div>
		<ArrowLink href="/dance/">{homeCopy.dance.linkLabel}</ArrowLink>
	</div>
</Section>

<Section id="engineering" number="03" label={homeCopy.engineering.label} headline={homeCopy.engineering.headline}>
	<p class="lead">{engineeringIntroduction}</p>
	<div class="featured-app">
		<Card title={featuredApp.name} href={featuredApp.linkUrl} eyebrow={featuredApp.status}>
			<p>{featuredApp.pitch}</p>
			<ul class="stack">
				{#each featuredApp.stack as technology (technology)}
					<li>{technology}</li>
				{/each}
			</ul>
		</Card>
	</div>
	<div class="link-row">
		<ArrowLink href="/apps/">{homeCopy.engineering.appsLinkLabel}</ArrowLink>
		<ArrowLink href="/resume/">{homeCopy.engineering.resumeLinkLabel}</ArrowLink>
	</div>
</Section>

<Section id="contact" number="04" label={homeCopy.contact.label} headline={homeCopy.contact.headline}>
	<p class="lead">{homeCopy.contact.body}</p>
	<a class="mail-link" href="mailto:{contactEmail}">
		{contactEmail}
		<svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false">
			<path d="M5 27 27 5M11 5h16v16" fill="none" stroke="currentColor" stroke-width="1.2" />
		</svg>
	</a>
	<div>
		<ArrowLink href="/contact/">{homeCopy.contact.linkLabel}</ArrowLink>
	</div>
</Section>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.hero {
		@include page-container;
		display: grid;
		gap: 3rem;
		align-items: center;
		padding-block: clamp(3rem, 8vw, 6rem) clamp(4rem, 9vw, 7rem);

		@media (min-width: $narrow) {
			grid-template-columns: 1.1fr 1fr;
			gap: clamp(2rem, 6vw, 6rem);
		}
	}

	.hero-label {
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

	.hero-name {
		@include display-headline;
		margin-block: 1.25rem 2rem;
		font-size: clamp(4rem, 11vw, 7.5rem);
		line-height: 0.92;

		em {
			display: block;
			padding-left: 0.08em;
			color: $shu;
			font-style: italic;
		}
	}

	.hero-introduction {
		max-width: 30rem;
		color: $sumi;
		font-size: 1.125rem;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem 2rem;
		align-items: center;
		margin-top: 2.5rem;
	}

	.hero-note {
		margin-top: 1.5rem;
		color: $usuzumi;
		font-size: 0.8125rem;
	}

	.hero-photo {
		max-width: 30rem;
		padding: 1.5rem 0 0 1.5rem;

		@media (min-width: $narrow) {
			justify-self: end;
			width: 100%;
		}
	}

	.lead {
		max-width: 40rem;
		color: $usuzumi;
		font-size: 1.0625rem;
	}

	.dance-photo {
		max-width: 24rem;
	}

	.pair {
		display: grid;
		gap: 2rem;

		@media (min-width: $narrow) {
			grid-template-columns: 1fr 1fr;
			gap: 2.5rem;
		}
	}

	.pair-item {
		display: grid;
		gap: 0.6rem;
		padding-top: 1.25rem;
		border-top: 1px solid $hairline;

		h3 {
			font-size: 1.5rem;
		}

		p {
			color: $usuzumi;
			font-size: 0.9375rem;
		}
	}

	.offer-rows {
		margin: 1rem 0 0;
		padding: 0;
		list-style: none;
		border-top: 1px solid $hairline;
	}

	.offer-row {
		display: grid;
		grid-template-columns: 2.5rem 1fr;
		gap: 0.5rem 1rem;
		align-items: baseline;
		padding-block: 1.5rem;
		border-bottom: 1px solid $hairline;

		@media (min-width: $wide) {
			grid-template-columns: 2.5rem 1fr 1.1fr;
		}
	}

	.offer-number {
		@include small-label;
		color: $shu;
	}

	.offer-title {
		color: $sumi;
		font-family: $font-display;
		font-size: 1.6rem;
		text-decoration: none;

		&:hover {
			color: $shu;
		}
	}

	.offer-summary {
		grid-column: 2;
		color: $usuzumi;
		font-size: 0.875rem;

		@media (min-width: $wide) {
			grid-column: 3;
		}
	}

	.video-grid {
		display: grid;
		gap: 2rem;

		@media (min-width: $wide) {
			grid-template-columns: repeat(3, 1fr);
			gap: 1.5rem;
		}
	}

	.featured-app {
		max-width: 34rem;
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;

		li {
			padding: 0.3rem 0.65rem;
			border: 1px solid $hairline;
			color: $sumi;
			font-size: 0.75rem;
			font-weight: 600;
		}
	}

	.link-row {
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem 2.5rem;
	}

	.mail-link {
		display: inline-flex;
		gap: 1rem;
		align-items: center;
		justify-self: start;
		max-width: 100%;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid $shu;
		color: $sumi;
		font-family: $font-display;
		font-size: clamp(1.5rem, 5vw, 3rem);
		letter-spacing: -0.02em;
		overflow-wrap: anywhere;
		text-decoration: none;

		svg {
			flex-shrink: 0;
			width: clamp(1.25rem, 3vw, 2rem);
			height: auto;
		}

		&:hover {
			color: $shu;
		}
	}
</style>
