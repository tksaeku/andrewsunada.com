import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { ContactTopic } from '$lib/content/types';
import ContactForm from './ContactForm.svelte';

const endpoint = 'https://formspree.io/f/test';

const fillValidForm = async (): Promise<void> => {
	await fireEvent.input(screen.getByLabelText('Name'), { target: { value: 'Sam Dancer' } });
	await fireEvent.input(screen.getByLabelText('Email'), { target: { value: 'sam@example.com' } });
	await fireEvent.change(screen.getByLabelText('Topic'), { target: { value: 'lesson' } });
	await fireEvent.input(screen.getByLabelText('Message'), { target: { value: 'I would love a private lesson.' } });
};

describe('ContactForm', () => {
	it('lists the six topics', () => {
		render(ContactForm, { endpoint, turnstileSiteKey: '', initialTopic: '' });
		const options = [...(screen.getByLabelText('Topic') as HTMLSelectElement).options]
			.filter((option) => option.value !== '')
			.map((option) => option.textContent?.trim());
		expect(options).toEqual(['Lesson', 'Monthly coaching', 'Workshop', 'Convention or event', 'Software', 'Other']);
	});

	it('preselects the initial topic', () => {
		render(ContactForm, { endpoint, turnstileSiteKey: '', initialTopic: ContactTopic.Workshop });
		expect(screen.getByLabelText('Topic')).toHaveValue('workshop');
	});

	it('shows linked errors and sends nothing when the values are invalid', async () => {
		const fetchStub = vi.fn();
		vi.stubGlobal('fetch', fetchStub);
		render(ContactForm, { endpoint, turnstileSiteKey: '', initialTopic: '' });
		await fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
		const nameInput = screen.getByLabelText('Name');
		expect(nameInput).toHaveAttribute('aria-invalid', 'true');
		const errorId = nameInput.getAttribute('aria-describedby') ?? '';
		expect(document.getElementById(errorId)?.textContent).toMatch(/name/i);
		expect(fetchStub).not.toHaveBeenCalled();
		vi.unstubAllGlobals();
	});

	it('keeps every value and shows an alert when sending fails', async () => {
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
		render(ContactForm, { endpoint, turnstileSiteKey: '', initialTopic: '' });
		await fillValidForm();
		await fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
		expect(await screen.findByRole('alert')).toHaveTextContent(/didn’t send/);
		expect(screen.getByLabelText('Name')).toHaveValue('Sam Dancer');
		expect(screen.getByLabelText('Email')).toHaveValue('sam@example.com');
		expect(screen.getByLabelText('Topic')).toHaveValue('lesson');
		expect(screen.getByLabelText('Message')).toHaveValue('I would love a private lesson.');
		expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
		vi.unstubAllGlobals();
	});

	it('disables the button while sending and confirms success', async () => {
		let resolveRequest: (response: Response) => void = () => {};
		vi.stubGlobal('fetch', vi.fn(() => new Promise<Response>((resolve) => {
			resolveRequest = resolve;
		})));
		render(ContactForm, { endpoint, turnstileSiteKey: '', initialTopic: '' });
		await fillValidForm();
		await fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
		expect(screen.getByRole('button', { name: /Sending/ })).toBeDisabled();
		resolveRequest(new Response('{"ok":true}', { status: 200 }));
		expect(await screen.findByRole('status')).toHaveTextContent(/Thank you/);
		await waitFor(() => {
			expect(screen.queryByLabelText('Name')).toBeNull();
		});
		vi.unstubAllGlobals();
	});
});
