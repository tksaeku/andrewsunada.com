<script lang="ts">
	import ArrowLink from '$lib/components/ArrowLink/ArrowLink.svelte';
	import BookingButton from '$lib/components/BookingButton/BookingButton.svelte';
	import Photo from '$lib/components/Photo/Photo.svelte';
	import RateList from '$lib/components/RateList/RateList.svelte';
	import Section from '$lib/components/Section/Section.svelte';
	import { coachingIntroduction, coachingOffers, coachingPageCopy, venues, workshops } from '$lib/content/coaching';
	import { drills } from '$lib/content/drills';
	import { sitePhotos } from '$lib/content/photos';
	import { getContactPath, lessonContactPath, privateLessonBookingUrl } from '$lib/content/site';

	const drillTopics = [...new Set(drills.map(({ topic }) => topic))];
	const getDrillsForTopic = (topic: string): typeof drills => {
		return drills.filter((drill) => drill.topic === topic);
	};
	const getSectionNumber = (index: number): string => {
		return String(index + 1).padStart(2, '0');
	};
</script>

<div class="page-header">
	<div class="header-text">
		<p class="header-label">{coachingPageCopy.heroLabel}</p>
		<h1>{coachingPageCopy.headline}</h1>
		<p class="introduction">{coachingIntroduction}</p>
		<div class="header-actions">
			<BookingButton bookingUrl={privateLessonBookingUrl} fallbackPath={lessonContactPath} />
		</div>
	</div>
	<div class="header-photo">
		<Photo photo={sitePhotos.coachingLessons} isEager sizes="(min-width: 40rem) 26rem, 100vw" />
	</div>
</div>

{#each coachingOffers as offer, index (offer.slug)}
	<Section
		id={offer.slug}
		number={getSectionNumber(index)}
		label={coachingPageCopy.sectionLabels[offer.slug]}
		headline={offer.title}
		isBanded={index % 2 === 1}
	>
		<p class="lead">{offer.summary}</p>
		<ul class="details">
			{#each offer.details as detail (detail)}
				<li>{detail}</li>
			{/each}
		</ul>

		{#if offer.rates.length > 0}
			<div class="rates">
				<RateList rates={offer.rates} />
			</div>
		{/if}

		{#if offer.slug === 'monthly-coaching'}
			<p class="payment-note">{coachingPageCopy.paymentNote}</p>
		{/if}

		{#if offer.slug === 'workshops'}
			<div class="workshops-layout">
				<div class="venues">
					<h3>{coachingPageCopy.venuesHeading}</h3>
					<ul>
						{#each venues as venue (venue.name)}
							<li>
								<a href={venue.url} rel="noopener">{venue.name}</a>
								<span>{venue.locality}, {venue.region} · {venue.schedule}</span>
							</li>
						{/each}
					</ul>
				</div>
				<div class="workshops-photo">
					<Photo photo={sitePhotos.coachingWorkshops} sizes="(min-width: 40rem) 18rem, 100vw" />
				</div>
			</div>
			<h3 class="series-heading">{coachingPageCopy.workshopsHeading}</h3>
			<ol class="workshop-list">
				{#each workshops as workshop (workshop.slug)}
					<li class="workshop">
						<p class="workshop-level">{workshop.level}</p>
						<h4>{workshop.title}</h4>
						<ul>
							{#each workshop.outline as point (point)}
								<li>{point}</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ol>
		{/if}

		<div class="actions">
			{#if offer.slug === 'private-lessons'}
				<BookingButton bookingUrl={privateLessonBookingUrl} fallbackPath={lessonContactPath} />
			{:else}
				<ArrowLink href={getContactPath(offer.contactTopic)}>{coachingPageCopy.callToActionLabels[offer.slug]}</ArrowLink>
			{/if}
		</div>
	</Section>
{/each}

<Section
	id="drills"
	number={getSectionNumber(coachingOffers.length)}
	label={coachingPageCopy.sectionLabels.drills}
	headline={coachingPageCopy.drillLibrary.headline}
>
	<p class="lead">{coachingPageCopy.drillLibrary.introduction}</p>
	<div class="drill-topics">
		{#each drillTopics as topic (topic)}
			<div class="drill-topic">
				<h3>{topic}</h3>
				<dl>
					{#each getDrillsForTopic(topic) as drill (drill.title)}
						<dt>{drill.title}</dt>
						<dd>{drill.description}</dd>
					{/each}
				</dl>
			</div>
		{/each}
	</div>
</Section>

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
			grid-template-columns: 1.3fr 1fr;
		}
	}

	.header-label {
		@include small-label;
		color: $shu;
		font-size: 0.6875rem;
	}

	h1 {
		@include display-headline;
		margin-block: 1rem 1.5rem;
		font-size: clamp(3rem, 8vw, 5.5rem);
	}

	.introduction {
		max-width: 34rem;
		font-size: 1.125rem;
	}

	.header-actions {
		margin-top: 2rem;
	}

	.header-photo {
		max-width: 26rem;
		justify-self: end;
		width: 100%;
	}

	.lead {
		max-width: 40rem;
		font-size: 1.125rem;
	}

	.details {
		display: grid;
		gap: 0.75rem;
		max-width: 40rem;
		margin: 0;
		padding: 0;
		list-style: none;
		color: $usuzumi;

		li {
			position: relative;
			padding-left: 1.25rem;

			&::before {
				content: '';
				position: absolute;
				top: 0.7em;
				left: 0;
				width: 0.35rem;
				height: 0.35rem;
				background: $shu;
			}
		}
	}

	.rates {
		max-width: 32rem;
	}

	.payment-note {
		color: $usuzumi;
		font-size: 0.875rem;
	}

	.workshops-layout {
		display: grid;
		gap: 2rem;
		align-items: start;

		@media (min-width: $narrow) {
			grid-template-columns: 1fr 18rem;
		}
	}

	h3 {
		font-size: 1.5rem;
	}

	.venues ul {
		display: grid;
		gap: 1rem;
		margin: 1rem 0 0;
		padding: 0;
		list-style: none;

		li {
			display: grid;
			gap: 0.2rem;
			padding-top: 1rem;
			border-top: 1px solid $hairline;
		}

		a {
			font-family: $font-display;
			font-size: 1.35rem;
		}

		span {
			color: $usuzumi;
			font-size: 0.875rem;
		}
	}

	.series-heading {
		margin-top: 1rem;
	}

	.workshop-list {
		display: grid;
		gap: 0;
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: 1px solid $hairline;

		@media (min-width: $wide) {
			grid-template-columns: 1fr 1fr;
			column-gap: 2.5rem;
		}
	}

	.workshop {
		display: grid;
		gap: 0.5rem;
		align-content: start;
		padding-block: 1.5rem;
		border-bottom: 1px solid $hairline;

		h4 {
			font-size: 1.4rem;
		}

		ul {
			display: grid;
			gap: 0.35rem;
			margin: 0.25rem 0 0;
			padding-left: 1.1rem;
			color: $usuzumi;
			font-size: 0.9375rem;
		}
	}

	.workshop-level {
		@include small-label;
		color: $shu;
		font-size: 0.6875rem;
	}

	.actions {
		margin-top: 0.5rem;
	}

	.drill-topics {
		display: grid;
		gap: 2.5rem;

		@media (min-width: $wide) {
			grid-template-columns: 1fr 1fr;
		}
	}

	.drill-topic dl {
		margin: 1rem 0 0;
		border-top: 1px solid $hairline;
	}

	dt {
		margin-top: 1rem;
		font-weight: 600;
	}

	dd {
		margin: 0.25rem 0 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid $hairline;
		color: $usuzumi;
		font-size: 0.9375rem;
	}
</style>
