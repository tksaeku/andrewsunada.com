<script lang="ts">
	import ArrowLink from '$lib/components/ArrowLink/ArrowLink.svelte';
	import BookingButton from '$lib/components/BookingButton/BookingButton.svelte';
	import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
	import Photo from '$lib/components/Photo/Photo.svelte';
	import RateList from '$lib/components/RateList/RateList.svelte';
	import Section from '$lib/components/Section/Section.svelte';
	import { coachingIntroduction, coachingOffers, coachingPageCopy, venues, workshops } from '$lib/content/coaching';
	import { drillTopics } from '$lib/content/drills';
	import { sitePhotos } from '$lib/content/photos';
	import {
		drillLibraryEmailUrl, getContactPath, lessonBookingEmailUrl, privateLessonBookingUrl,
	} from '$lib/content/site';

	const getSectionNumber = (index: number): string => {
		return String(index + 1).padStart(2, '0');
	};
</script>

<PageHeader label={coachingPageCopy.heroLabel} headline={coachingPageCopy.headline} photo={sitePhotos.coachingLessons}>
	<p>{coachingIntroduction}</p>
	{#snippet actions()}
		<BookingButton bookingUrl={privateLessonBookingUrl} fallbackPath={lessonBookingEmailUrl} />
	{/snippet}
</PageHeader>

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
				<div class="workshops-details">
					<div class="venues">
						<h3>{coachingPageCopy.venuesHeading}</h3>
						<ul>
							{#each venues as venue (venue.name)}
								<li>
									<a href={venue.url} target="_blank" rel="noopener noreferrer">{venue.name}</a>
									<span>{venue.locality}, {venue.region}</span>
								</li>
							{/each}
						</ul>
					</div>
					<div>
						<h3>{coachingPageCopy.workshopsHeading}</h3>
						<ul class="workshop-list">
							{#each workshops as workshop (workshop.slug)}
								<li><h4>{workshop.title}</h4></li>
							{/each}
						</ul>
					</div>
				</div>
				<div class="workshops-photo">
					<Photo photo={sitePhotos.coachingWorkshops} sizes="(min-width: 40rem) 18rem, 100vw" />
				</div>
			</div>
		{/if}

		<div class="actions">
			{#if offer.slug === 'private-lessons'}
				<BookingButton bookingUrl={privateLessonBookingUrl} fallbackPath={lessonBookingEmailUrl} />
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
	<ul class="drill-topics">
		{#each drillTopics as topic (topic)}
			<li><h3>{topic}</h3></li>
		{/each}
	</ul>
	<div class="actions">
		<BookingButton bookingUrl="" fallbackPath={drillLibraryEmailUrl} label={coachingPageCopy.drillLibrary.emailLabel} />
	</div>
</Section>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

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

	.workshops-details {
		display: grid;
		gap: 2.5rem;
	}

	.workshop-list {
		margin: 1rem 0 0;
		padding: 0;
		list-style: none;

		li {
			padding-block: 0.75rem;
			border-top: 1px solid $hairline;
		}

		h4 {
			font-size: 1.35rem;
			font-weight: 400;
		}
	}

	.actions {
		margin-top: 0.5rem;
	}

	.drill-topics {
		display: grid;
		gap: 0 2.5rem;
		margin: 0;
		padding: 0;
		list-style: none;

		@media (min-width: $wide) {
			grid-template-columns: 1fr 1fr;
		}

		li {
			padding-block: 1rem;
			border-bottom: 1px solid $hairline;
		}
	}
</style>
