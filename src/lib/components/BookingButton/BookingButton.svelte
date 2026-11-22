<script lang="ts">
	import { browserNavigation, openCalendlyPopup } from './calendly';

	type BookingButtonProps = {
		bookingUrl: string;
		fallbackPath: string;
		label?: string;
		isSecondary?: boolean;
	};

	const { bookingUrl, fallbackPath, label = 'Book a lesson', isSecondary = false }: BookingButtonProps = $props();

	const hasBookingUrl = $derived(bookingUrl.trim() !== '');

	const handleClick = async (event: MouseEvent): Promise<void> => {
		if (!hasBookingUrl) {
			return;
		}
		event.preventDefault();
		try {
			await openCalendlyPopup(bookingUrl);
		} catch {
			browserNavigation.navigateTo(bookingUrl);
		}
	};
</script>

<a
	class="booking-button"
	class:is-secondary={isSecondary}
	href={hasBookingUrl ? bookingUrl : fallbackPath}
	rel={hasBookingUrl ? 'noopener' : undefined}
	onclick={handleClick}
>
	{label}
</a>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.booking-button {
		@include small-label;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 3rem;
		padding: 0.9rem 1.6rem;
		background: $shu;
		border: 1px solid $shu;
		color: $paper;
		text-decoration: none;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;

		&:hover {
			background: $sumi;
			border-color: $sumi;
			color: $paper;
		}

		&.is-secondary {
			background: transparent;
			color: $shu;

			&:hover {
				background: $shu;
				color: $paper;
			}
		}
	}
</style>
