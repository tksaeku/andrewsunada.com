<script lang="ts">
	import { onMount } from 'svelte';
	import { contactEmail } from '$lib/content/site';
	import { ContactTopic } from '$lib/content/types';
	import { contactTopicLabels, submitContactForm, validateContactForm } from './contactSubmission';
	import type { ContactFormErrors, ContactFormValues } from './contactSubmission';
	import { mountTurnstile } from './turnstile';
	import type { TurnstileWidget } from './turnstile';

	type ContactFormProps = {
		endpoint: string;
		turnstileSiteKey: string;
		initialTopic: ContactTopic | '';
	};

	const { endpoint, turnstileSiteKey, initialTopic }: ContactFormProps = $props();

	const topics = Object.values(ContactTopic);
	const fieldIds = { name: 'contact-name', email: 'contact-email', topic: 'contact-topic', message: 'contact-message' };

	// The topic is read once, when the form mounts, so a later prop change never overwrites the visitor's choice.
	// svelte-ignore state_referenced_locally
	const values: ContactFormValues = $state({ name: '', email: '', topic: initialTopic, message: '' });
	let errors: ContactFormErrors = $state({});
	let isSending = $state(false);
	let hasSent = $state(false);
	let hasFailed = $state(false);
	let turnstileToken = $state('');
	let turnstileContainer: HTMLDivElement | undefined = $state();
	let turnstileWidget: TurnstileWidget | null = null;

	const hasTurnstile = $derived(turnstileSiteKey.trim() !== '');

	onMount(() => {
		if (!hasTurnstile || !turnstileContainer) {
			return;
		}
		const container = turnstileContainer;
		void (async (): Promise<void> => {
			try {
				turnstileWidget = await mountTurnstile(container, turnstileSiteKey, (token) => {
					turnstileToken = token;
				});
			} catch {
				turnstileWidget = null;
			}
		})();

		return (): void => {
			turnstileWidget?.remove();
		};
	});

	const getErrorId = (field: keyof ContactFormValues): string => {
		return `${fieldIds[field]}-error`;
	};

	const handleSubmit = async (event: SubmitEvent): Promise<void> => {
		event.preventDefault();
		hasFailed = false;
		errors = validateContactForm(values);
		const firstInvalidField = (Object.keys(errors) as (keyof ContactFormValues)[])[0];
		if (firstInvalidField) {
			document.getElementById(fieldIds[firstInvalidField])?.focus();
			return;
		}

		isSending = true;
		const { isSuccessful } = await submitContactForm(values, turnstileToken, endpoint);
		isSending = false;

		if (isSuccessful) {
			hasSent = true;
			return;
		}
		hasFailed = true;
		turnstileWidget?.reset();
	};
</script>

{#if hasSent}
	<div class="confirmation" role="status">
		<p class="confirmation-title">Thank you — your message is on its way.</p>
		<p>I’ll reply to {values.email} as soon as I can, usually within a couple of days.</p>
	</div>
{:else}
	<form class="contact-form" novalidate onsubmit={handleSubmit}>
		<div class="field">
			<label for={fieldIds.name}>Name</label>
			<input
				id={fieldIds.name}
				name="name"
				type="text"
				autocomplete="name"
				bind:value={values.name}
				aria-invalid={errors.name ? 'true' : undefined}
				aria-describedby={errors.name ? getErrorId('name') : undefined}
			/>
			{#if errors.name}
				<p class="error" id={getErrorId('name')}>{errors.name}</p>
			{/if}
		</div>

		<div class="field">
			<label for={fieldIds.email}>Email</label>
			<input
				id={fieldIds.email}
				name="email"
				type="email"
				autocomplete="email"
				bind:value={values.email}
				aria-invalid={errors.email ? 'true' : undefined}
				aria-describedby={errors.email ? getErrorId('email') : undefined}
			/>
			{#if errors.email}
				<p class="error" id={getErrorId('email')}>{errors.email}</p>
			{/if}
		</div>

		<div class="field">
			<label for={fieldIds.topic}>Topic</label>
			<select
				id={fieldIds.topic}
				name="topic"
				bind:value={values.topic}
				aria-invalid={errors.topic ? 'true' : undefined}
				aria-describedby={errors.topic ? getErrorId('topic') : undefined}
			>
				<option value="">Choose a topic</option>
				{#each topics as topic (topic)}
					<option value={topic}>{contactTopicLabels[topic]}</option>
				{/each}
			</select>
			{#if errors.topic}
				<p class="error" id={getErrorId('topic')}>{errors.topic}</p>
			{/if}
		</div>

		<div class="field">
			<label for={fieldIds.message}>Message</label>
			<textarea
				id={fieldIds.message}
				name="message"
				rows="6"
				bind:value={values.message}
				aria-invalid={errors.message ? 'true' : undefined}
				aria-describedby={errors.message ? getErrorId('message') : undefined}
			></textarea>
			{#if errors.message}
				<p class="error" id={getErrorId('message')}>{errors.message}</p>
			{/if}
		</div>

		{#if hasTurnstile}
			<div class="turnstile" bind:this={turnstileContainer}></div>
		{/if}

		{#if hasFailed}
			<div class="failure" role="alert">
				Your message didn’t send. Everything you wrote is still here — please try again, or email
				<a href="mailto:{contactEmail}">{contactEmail}</a>.
			</div>
		{/if}

		<button class="submit" type="submit" disabled={isSending}>
			{isSending ? 'Sending…' : 'Send message'}
		</button>
	</form>
{/if}

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.contact-form {
		display: grid;
		gap: 1.5rem;
		max-width: 36rem;
	}

	.field {
		display: grid;
		gap: 0.45rem;
	}

	label {
		@include small-label;
		font-size: 0.6875rem;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 0.8rem 0.9rem;
		background: #fff;
		border: 1px solid $hairline;
		border-radius: 0;
		color: $sumi;
		font: inherit;
		font-size: 1rem;

		&:focus-visible {
			border-color: $shu;
		}

		&[aria-invalid='true'] {
			border-color: $shu;
		}
	}

	textarea {
		resize: vertical;
	}

	.error {
		color: $shu;
		font-size: 0.875rem;
	}

	.failure {
		padding: 1rem 1.1rem;
		border-left: 3px solid $shu;
		background: $paper-band;
		font-size: 0.9375rem;
	}

	.submit {
		@include small-label;
		justify-self: start;
		min-height: 3rem;
		padding: 0.9rem 1.8rem;
		background: $sumi;
		border: 0;
		color: $paper;
		cursor: pointer;

		&:hover:not(:disabled) {
			background: $shu;
		}

		&:disabled {
			cursor: progress;
			opacity: 0.7;
		}
	}

	.confirmation {
		display: grid;
		gap: 0.6rem;
		max-width: 36rem;
		padding: 1.5rem;
		border: 1px solid $hairline;
		background: $paper-band;
	}

	.confirmation-title {
		font-family: $font-display;
		font-size: 1.6rem;
	}
</style>
