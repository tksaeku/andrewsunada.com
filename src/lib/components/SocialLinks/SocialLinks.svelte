<script lang="ts">
	import type { SocialLink } from '$lib/content/types';
	import { getVisibleSocialLinks } from '$lib/content/site';

	const { links, isLarge = false }: { links: SocialLink[]; isLarge?: boolean } = $props();
	const visibleLinks = $derived(getVisibleSocialLinks(links));
</script>

<ul class="social-links" class:is-large={isLarge}>
	{#each visibleLinks as link (link.name)}
		<li>
			<a href={link.url} rel="me noopener">{link.name}</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.social-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		@include small-label;
		color: $usuzumi;
		font-size: 0.6875rem;
		text-decoration: none;

		&:hover {
			color: $shu;
		}
	}

	.is-large a {
		color: $sumi;
		font-size: 0.8125rem;
		border-bottom: 1px solid $hairline;
		padding-bottom: 0.2rem;
	}
</style>
