<script lang="ts">
	import ArrowLink from '$lib/components/ArrowLink/ArrowLink.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
	import Section from '$lib/components/Section/Section.svelte';
	import { appProjects, appsIntroduction, appsPageCopy } from '$lib/content/apps';
	import { sitePhotos } from '$lib/content/photos';
	import { githubProfileUrl } from '$lib/content/site';
</script>

<PageHeader label={appsPageCopy.heroLabel} headline={appsPageCopy.headline} photo={sitePhotos.professional}>
	<p>{appsIntroduction}</p>
	{#snippet actions()}
		<ArrowLink href="/resume/">Read the resume</ArrowLink>
	{/snippet}
</PageHeader>

<Section id="projects" number="01" label={appsPageCopy.projects.label} headline={appsPageCopy.projects.headline}>
	<div class="card-grid">
		{#each appProjects as app (app.slug)}
			<Card title={app.name} href={app.linkUrl} eyebrow={app.status}>
				<p>{app.pitch}</p>
				<ul class="stack" aria-label="{app.name} stack">
					{#each app.stack as technology (technology)}
						<li>{technology}</li>
					{/each}
				</ul>
				{#if app.linkLabel}
					<p class="link-label" aria-hidden="true">{app.linkLabel} ↗</p>
				{/if}
			</Card>
		{/each}
	</div>
</Section>

<Section id="github" number="02" label={appsPageCopy.github.label} headline={appsPageCopy.github.headline} isBanded>
	<p class="lead">{appsPageCopy.github.body}</p>
	<div>
		<ArrowLink href={githubProfileUrl}>{appsPageCopy.github.linkLabel}</ArrowLink>
	</div>
</Section>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.card-grid {
		display: grid;
		gap: 1.5rem;

		@media (min-width: $wide) {
			grid-template-columns: 1fr 1fr;
		}
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

	.link-label {
		@include small-label;
		color: $shu;
		font-size: 0.6875rem;
	}

	.lead {
		max-width: 40rem;
		color: $usuzumi;
	}
</style>
