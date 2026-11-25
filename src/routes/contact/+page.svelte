<script lang="ts">
	import BookingButton from '$lib/components/BookingButton/BookingButton.svelte';
	import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
	import SocialLinks from '$lib/components/SocialLinks/SocialLinks.svelte';
	import { sitePhotos } from '$lib/content/photos';
	import {
		contactEmail, contactPageCopy, lessonBookingEmailUrl, privateLessonBookingUrl, socialLinks,
	} from '$lib/content/site';
</script>

<PageHeader label={contactPageCopy.heroLabel} headline={contactPageCopy.headline} photo={sitePhotos.contact}>
	<p>{contactPageCopy.introduction}</p>
	{#snippet actions()}
		<BookingButton bookingUrl={privateLessonBookingUrl} fallbackPath={lessonBookingEmailUrl} />
	{/snippet}
</PageHeader>

<div class="contact">
	<section class="block" aria-labelledby="email-heading">
		<h2 id="email-heading" class="block-heading">{contactPageCopy.emailHeading}</h2>
		<div>
			<a class="mail-link" href="mailto:{contactEmail}">
				{contactEmail}
				<svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false">
					<path d="M5 27 27 5M11 5h16v16" fill="none" stroke="currentColor" stroke-width="1.2" />
				</svg>
			</a>
		</div>
	</section>

	<section class="block" aria-labelledby="profiles-heading">
		<h2 id="profiles-heading" class="block-heading">{contactPageCopy.profilesHeading}</h2>
		<SocialLinks links={socialLinks} isLarge />
	</section>
</div>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.contact {
		@include page-container;
		padding-bottom: clamp(3rem, 8vw, 6rem);
	}

	.block {
		@include label-gutter;
		padding-block: 2.5rem;
		border-top: 1px solid $hairline;
	}

	.block-heading {
		@include small-label;
		padding-top: 0.35rem;
		color: $shu;
		font-family: $font-body;
		font-size: 0.75rem;
	}

	.mail-link {
		display: inline-flex;
		gap: 1rem;
		align-items: center;
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
