<script lang="ts">
	import ArrowLink from '$lib/components/ArrowLink/ArrowLink.svelte';
	import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
	import { privacyPageCopy, privacySections } from '$lib/content/privacyPolicy';
</script>

<PageHeader label={privacyPageCopy.heroLabel} headline={privacyPageCopy.headline}>
	<p>{privacyPageCopy.introduction}</p>
</PageHeader>

<div class="privacy">
	{#each privacySections as section, index (section.heading)}
		<section class="block" aria-labelledby="privacy-section-{index}">
			<h2 id="privacy-section-{index}" class="block-heading">{section.heading}</h2>
			<div class="body">
				{#each section.paragraphs as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
				{#if section.links.length > 0}
					<ul class="links">
						{#each section.links as link (link.url)}
							<li><ArrowLink href={link.url}>{link.label}</ArrowLink></li>
						{/each}
					</ul>
				{/if}
			</div>
		</section>
	{/each}
</div>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.privacy {
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

	.body {
		display: grid;
		gap: 1rem;
		max-width: 44rem;
		font-size: 1.0625rem;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 2rem;
		margin: 0.5rem 0 0;
		padding: 0;
		list-style: none;
	}
</style>
