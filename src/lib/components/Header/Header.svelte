<script lang="ts">
	import { onMount } from 'svelte';
	import Seal from '$lib/components/Seal/Seal.svelte';
	import { navigationItems, personName } from '$lib/content/site';

	const { currentPath }: { currentPath: string } = $props();

	let isMenuOpen = $state(false);
	let isEnhanced = $state(false);

	onMount(() => {
		isEnhanced = true;
	});

	const getIsCurrent = (path: string): boolean => {
		return currentPath === path || currentPath.startsWith(path);
	};

	const toggleMenu = (): void => {
		isMenuOpen = !isMenuOpen;
	};

	const closeMenu = (): void => {
		isMenuOpen = false;
	};
</script>

<header class="header" class:is-enhanced={isEnhanced} class:is-menu-open={isMenuOpen}>
	<div class="inner">
		<a class="wordmark" href="/" aria-label="{personName}, home" onclick={closeMenu}>
			<Seal size={26} />
			<span class="wordmark-text">{personName}</span>
		</a>
		<button
			class="menu-toggle"
			type="button"
			aria-expanded={isMenuOpen}
			aria-controls="main-menu"
			onclick={toggleMenu}
		>
			<span class="menu-toggle-label">Menu</span>
			<span class="menu-toggle-icon" aria-hidden="true"></span>
		</button>
		<nav class="navigation" aria-label="Main">
			<ul id="main-menu" class="menu">
				{#each navigationItems as item (item.path)}
					<li>
						<a
							href={item.path}
							aria-current={getIsCurrent(item.path) ? 'page' : undefined}
							onclick={closeMenu}>{item.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.inner {
		@include page-container;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;
		padding-block: 1.5rem;
		border-bottom: 1px solid $hairline;
	}

	.wordmark {
		display: inline-flex;
		gap: 0.75rem;
		align-items: center;
		color: $sumi;
		text-decoration: none;
	}

	.wordmark-text {
		font-family: $font-display;
		font-size: 1.125rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.menu {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.75rem;
		margin: 0;
		padding: 0;
		list-style: none;

		a {
			@include small-label;
			display: inline-block;
			padding-block: 0.35rem;
			color: $sumi;
			font-size: 0.6875rem;
			text-decoration: none;
			border-bottom: 1px solid transparent;

			&:hover,
			&[aria-current='page'] {
				color: $shu;
			}

			&[aria-current='page'] {
				border-bottom-color: $shu;
			}
		}
	}

	.menu-toggle {
		display: none;
		gap: 0.6rem;
		align-items: center;
		padding: 0.5rem 0;
		background: none;
		border: 0;
		color: $sumi;
		cursor: pointer;
		@include small-label;
		font-size: 0.6875rem;
	}

	.menu-toggle-icon {
		position: relative;
		width: 1.1rem;
		height: 1px;
		background: currentColor;

		&::before {
			content: '';
			position: absolute;
			top: -5px;
			left: 0;
			width: 100%;
			height: 1px;
			background: currentColor;
			transition: transform 0.2s ease;
		}
	}

	.is-menu-open .menu-toggle-icon::before {
		transform: translateY(5px);
	}

	// Without JavaScript the links stay visible and wrap; once the page is enhanced,
	// narrow screens collapse them behind the toggle.
	@media (max-width: calc(#{$narrow} - 0.01rem)) {
		.navigation {
			width: 100%;
		}

		.is-enhanced {
			.menu-toggle {
				display: inline-flex;
			}

			.navigation {
				display: none;
			}

			&.is-menu-open .navigation {
				display: block;
			}

			.menu {
				flex-direction: column;
				gap: 0;
				padding-top: 0.5rem;

				a {
					display: block;
					padding-block: 0.85rem;
					font-size: 0.8125rem;
					border-bottom: 1px solid $hairline;

					&[aria-current='page'] {
						border-bottom-color: $hairline;
					}
				}
			}
		}
	}
</style>
