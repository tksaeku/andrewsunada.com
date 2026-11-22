import { ContactTopic } from '$lib/content/types';

export type ContactFormValues = { name: string; email: string; topic: ContactTopic | ''; message: string };

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const contactTopicLabels: Record<ContactTopic, string> = {
	[ContactTopic.Lesson]: 'Lesson',
	[ContactTopic.MonthlyCoaching]: 'Monthly coaching',
	[ContactTopic.Workshop]: 'Workshop',
	[ContactTopic.Event]: 'Convention or event',
	[ContactTopic.Software]: 'Software',
	[ContactTopic.Other]: 'Other',
};

const contactTopics = Object.values(ContactTopic);
const minimumMessageLength = 10;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Reads a `topic` query value. Anything that is not a known topic falls back to no preselection.
 */
export const parseTopic = (value: string | null): ContactTopic | '' => {
	const topic = contactTopics.find((candidate) => candidate === value);
	return topic ?? '';
};

const trimValues = (values: ContactFormValues): ContactFormValues => {
	return {
		name: values.name.trim(),
		email: values.email.trim(),
		topic: values.topic,
		message: values.message.trim(),
	};
};

export const validateContactForm = (values: ContactFormValues): ContactFormErrors => {
	const { name, email, topic, message } = trimValues(values);
	const errors: ContactFormErrors = {};

	if (name === '') {
		errors.name = 'Please enter your name.';
	}
	if (!emailPattern.test(email)) {
		errors.email = 'Please enter an email address I can reply to.';
	}
	if (topic === '') {
		errors.topic = 'Please choose what you’re writing about.';
	}
	if (message.length < minimumMessageLength) {
		errors.message = `Please write a message of at least ${minimumMessageLength} characters.`;
	}

	return errors;
};

/**
 * Posts the message to the form service. Resolves to `isSuccessful: false` on any network or service
 * failure so the form can keep the visitor's values and offer a retry.
 */
export const submitContactForm = async (
	values: ContactFormValues,
	turnstileToken: string,
	endpoint: string,
): Promise<{ isSuccessful: boolean }> => {
	if (endpoint.trim() === '') {
		return { isSuccessful: false };
	}

	const trimmedValues = trimValues(values);
	const topicLabel = trimmedValues.topic === '' ? 'General' : contactTopicLabels[trimmedValues.topic];

	try {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				...trimmedValues,
				_subject: `andrewsunada.com: ${topicLabel} enquiry from ${trimmedValues.name}`,
				_replyto: trimmedValues.email,
				'cf-turnstile-response': turnstileToken,
			}),
		});
		return { isSuccessful: response.ok };
	} catch {
		return { isSuccessful: false };
	}
};
