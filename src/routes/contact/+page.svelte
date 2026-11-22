<script lang="ts">
	import { onMount } from 'svelte';
	import BookingButton from '$lib/components/BookingButton/BookingButton.svelte';
	import ContactForm from '$lib/components/ContactForm/ContactForm.svelte';
	import { parseTopic } from '$lib/components/ContactForm/contactSubmission';
	import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
	import SocialLinks from '$lib/components/SocialLinks/SocialLinks.svelte';
	import { sitePhotos } from '$lib/content/photos';
	import {
		contactEmail, contactPageCopy, lessonContactPath, privateLessonBookingUrl, socialLinks,
	} from '$lib/content/site';
	import type { ContactTopic } from '$lib/content/types';

	const contactFormEndpoint = import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT ?? '';
	const turnstileSiteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '';

	// The page is prerendered, so the topic is read from the address bar once the page is in the browser.
	let initialTopic: ContactTopic | '' = $state('');

	onMount(() => {
		initialTopic = parseTopic(new URLSearchParams(window.location.search).get('topic'));
	});
</script>

<PageHeader label={contactPageCopy.heroLabel} headline={contactPageCopy.headline} photo={sitePhotos.contact}>
	<p>{contactPageCopy.introduction}</p>
	{#snippet actions()}
		<BookingButton bookingUrl={privateLessonBookingUrl} fallbackPath={lessonContactPath} />
	{/snippet}
</PageHeader>

<div class="contact">
	<section class="block" aria-labelledby="form-heading">
		<h2 id="form-heading" class="block-heading">{contactPageCopy.formHeading}</h2>
		<div>
			{#key initialTopic}
				<ContactForm endpoint={contactFormEndpoint} {turnstileSiteKey} {initialTopic} />
			{/key}
		</div>
	</section>

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
