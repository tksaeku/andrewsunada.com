import { render, screen } from '@testing-library/svelte';
import PrivacyPage from './+page.svelte';

describe('Privacy page', () => {
	it('has one h1', () => {
		const { container } = render(PrivacyPage);
		expect(container.querySelectorAll('h1')).toHaveLength(1);
	});

	it('says the site uses Google Analytics and how to opt out', () => {
		const { container } = render(PrivacyPage);
		expect(container.textContent).toContain('Google Analytics');
		const optOut = screen.getByRole('link', { name: /opt-out add-on/ });
		expect(optOut).toHaveAttribute('href', 'https://tools.google.com/dlpage/gaoptout');
		expect(optOut).toHaveAttribute('target', '_blank');
		expect(optOut).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('links the contact address in the same tab', () => {
		render(PrivacyPage);
		const email = screen.getByRole('link', { name: 'andrew@andrewsunada.com' });
		expect(email).toHaveAttribute('href', 'mailto:andrew@andrewsunada.com');
		expect(email).not.toHaveAttribute('target');
	});
});
