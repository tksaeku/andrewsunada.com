<script lang="ts">
	import SocialLinks from '$lib/components/SocialLinks/SocialLinks.svelte';
	import { personName, photographerCredit, socialLinks } from '$lib/content/site';

	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="inner">
		<div class="meta">
			<p>© {currentYear} {personName}</p>
			<p>Photography by <a href={photographerCredit.url} rel="noopener">{photographerCredit.name}</a></p>
		</div>
		<nav aria-label="Profiles">
			<SocialLinks links={socialLinks} />
		</nav>
	</div>
</footer>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.footer {
		padding-block: 2.5rem 3rem;
	}

	.inner {
		@include page-container;
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem 3rem;
		align-items: flex-start;
		justify-content: space-between;
		padding-top: 2rem;
		border-top: 1px solid $hairline;
	}

	.meta {
		display: grid;
		gap: 0.35rem;

		p {
			@include small-label;
			color: $usuzumi;
			font-size: 0.6875rem;
			font-weight: 500;
		}

		a {
			color: $usuzumi;

			&:hover {
				color: $shu;
			}
		}
	}
</style>
