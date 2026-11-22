<script lang="ts">
	const { size = 28 }: { size?: number } = $props();
</script>

<svg class="seal" width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
	<rect x="2" y="2" width="96" height="96" rx="9" fill="currentColor" />
	<rect x="9" y="9" width="82" height="82" rx="5" fill="none" stroke="#f8f7f3" stroke-width="3" />
	<text x="50" y="47" text-anchor="middle" class="kanji">砂</text>
	<text x="50" y="83" text-anchor="middle" class="kanji">田</text>
	<g fill="currentColor">
		<circle cx="18" cy="6" r="2.2" />
		<circle cx="83" cy="95" r="2.6" />
		<circle cx="5" cy="62" r="1.6" />
	</g>
	<circle cx="76" cy="15" r="0.9" fill="#f8f7f3" />
</svg>

<style lang="scss">
	@use 'tokens' as *;

	.seal {
		flex-shrink: 0;
		color: $shu;
		transform: rotate(-2deg);
	}

	.kanji {
		fill: $paper;
		font-family: $font-seal;
		font-size: 36px;
		font-weight: 600;
	}
</style>
