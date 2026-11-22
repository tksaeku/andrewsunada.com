import { ContactTopic } from '$lib/content/types';
import { parseTopic, submitContactForm, validateContactForm } from './contactSubmission';
import type { ContactFormValues } from './contactSubmission';

const validValues: ContactFormValues = {
	name: 'Sam Dancer',
	email: 'sam@example.com',
	topic: ContactTopic.Lesson,
	message: 'I would love a private lesson next month.',
};

const endpoint = 'https://formspree.io/f/test';

describe('parseTopic', () => {
	it('reads a known topic', () => {
		expect(parseTopic('lesson')).toBe(ContactTopic.Lesson);
		expect(parseTopic('event')).toBe(ContactTopic.Event);
	});

	it('falls back to no topic for anything else', () => {
		expect(parseTopic('nonsense')).toBe('');
		expect(parseTopic('')).toBe('');
		expect(parseTopic(null)).toBe('');
	});
});

describe('validateContactForm', () => {
	it('accepts valid values', () => {
		expect(validateContactForm(validValues)).toEqual({});
	});

	it('requires a name, a topic and a real email', () => {
		const errors = validateContactForm({ ...validValues, name: '', email: 'not-an-email', topic: '' });
		expect(Object.keys(errors).sort()).toEqual(['email', 'name', 'topic']);
	});

	it('requires a message of at least ten characters', () => {
		expect(validateContactForm({ ...validValues, message: 'Hi there' }).message).toBeDefined();
	});

	it('trims whitespace before judging', () => {
		const errors = validateContactForm({ ...validValues, name: '   ', message: '   short    ' });
		expect(errors.name).toBeDefined();
		expect(errors.message).toBeDefined();
		expect(validateContactForm({ ...validValues, email: '  sam@example.com  ' }).email).toBeUndefined();
	});
});

describe('submitContactForm', () => {
	it('fails when the network request rejects', async () => {
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
		await expect(submitContactForm(validValues, 'token', endpoint)).resolves.toEqual({ isSuccessful: false });
		vi.unstubAllGlobals();
	});

	it('fails when the service responds with an error', async () => {
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 422 })));
		await expect(submitContactForm(validValues, 'token', endpoint)).resolves.toEqual({ isSuccessful: false });
		vi.unstubAllGlobals();
	});

	it('fails without calling the network when no endpoint is configured', async () => {
		const fetchStub = vi.fn();
		vi.stubGlobal('fetch', fetchStub);
		await expect(submitContactForm(validValues, 'token', '')).resolves.toEqual({ isSuccessful: false });
		expect(fetchStub).not.toHaveBeenCalled();
		vi.unstubAllGlobals();
	});

	it('succeeds on a 200 and sends the trimmed values with the Turnstile token', async () => {
		const fetchStub = vi.fn().mockResolvedValue(new Response('{"ok":true}', { status: 200 }));
		vi.stubGlobal('fetch', fetchStub);
		const result = await submitContactForm({ ...validValues, name: '  Sam Dancer ' }, 'token-123', endpoint);
		expect(result).toEqual({ isSuccessful: true });
		const [url, request] = fetchStub.mock.calls[0];
		expect(url).toBe(endpoint);
		expect(JSON.parse(request.body)).toMatchObject({
			name: 'Sam Dancer', email: 'sam@example.com', topic: 'lesson', 'cf-turnstile-response': 'token-123',
		});
		vi.unstubAllGlobals();
	});
});
