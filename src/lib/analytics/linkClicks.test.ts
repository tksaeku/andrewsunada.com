import { classifyLinkClick, listenForLinkClicks } from './linkClicks';

const pageUrl = 'https://www.andrewsunada.com/coaching/';

/** jsdom cannot navigate, so the test page cancels every click after the tracker has seen it. */
const preventNavigation = (event: MouseEvent): void => {
	event.preventDefault();
};

describe('classifyLinkClick', () => {
	describe('email links', () => {
		it('records a coaching link subject as a coaching email lead', () => {
			const event = classifyLinkClick('mailto:andrew@andrewsunada.com?subject=Book%20a%20lesson', 'https://www.andrewsunada.com/');
			expect(event).toEqual({
				name: 'generate_lead',
				parameters: { method: 'email', email_subject: 'Book a lesson', lead_type: 'coaching' },
			});
		});

		it('records a link without a subject by the page area', () => {
			expect(classifyLinkClick('mailto:andrew@andrewsunada.com', 'https://www.andrewsunada.com/resume/')?.parameters).toEqual({
				method: 'email', email_subject: 'none', lead_type: 'software',
			});
			expect(classifyLinkClick('mailto:andrew@andrewsunada.com', 'https://www.andrewsunada.com/contact/')?.parameters.lead_type)
				.toBe('general');
		});
	});

	it('records the resume PDF as a download', () => {
		expect(classifyLinkClick('/andrew-sunada-resume.pdf', 'https://www.andrewsunada.com/resume/')).toEqual({
			name: 'resume_download', parameters: {},
		});
	});

	it('records an app site link and an app code link with the app name', () => {
		expect(classifyLinkClick('https://www.meekoapp.com', pageUrl)).toEqual({
			name: 'app_link_click', parameters: { app_name: 'Meeko', link_kind: 'site' },
		});
		expect(classifyLinkClick('https://github.com/tksaeku/bingo', pageUrl)).toEqual({
			name: 'app_link_click', parameters: { app_name: 'Bingo', link_kind: 'code' },
		});
	});

	it('records each profile link, with or without a trailing slash', () => {
		const profiles = [
			['https://github.com/tksaeku', 'GitHub'],
			['https://www.linkedin.com/in/andrewsunada/', 'LinkedIn'],
			['https://www.instagram.com/andrewsunada/', 'Instagram'],
			['https://www.facebook.com/tksaeku/', 'Facebook'],
			['https://www.youtube.com/@AndrewSunada', 'YouTube'],
			['https://www.ebay.com/usr/topknotcomics', 'eBay'],
		];
		profiles.forEach(([url, profile]) => {
			expect(classifyLinkClick(url, pageUrl)).toEqual({ name: 'profile_link_click', parameters: { profile } });
		});
	});

	it('sends nothing for links of no tracked kind', () => {
		['/coaching/', 'https://dougsilton.com/', 'https://www.youtube.com/watch?v=efsA9uA58Ss', '#main', '', 'https://github.com/tksaeku/other']
			.forEach((href) => {
				expect(classifyLinkClick(href, pageUrl)).toBeNull();
			});
	});

	it('never matches an app with an empty link', () => {
		expect(classifyLinkClick('https://www.andrewsunada.com/coaching/', pageUrl)).toBeNull();
	});
});

describe('listenForLinkClicks', () => {
	it('sends the event for a clicked link, including a click on an element inside it', () => {
		const gtag = vi.fn();
		window.gtag = gtag;
		document.body.innerHTML = '<a href="https://www.meekoapp.com"><span>Meeko</span></a><a href="/elsewhere/">Other</a>';
		const stopListening = listenForLinkClicks(document);
		document.addEventListener('click', preventNavigation);
		document.querySelector('span')?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
		(document.querySelector('a[href="/elsewhere/"]') as HTMLAnchorElement).dispatchEvent(
			new MouseEvent('click', { bubbles: true, cancelable: true }),
		);
		expect(gtag).toHaveBeenCalledTimes(1);
		expect(gtag).toHaveBeenCalledWith('event', 'app_link_click', expect.objectContaining({ app_name: 'Meeko' }));
		stopListening();
		document.removeEventListener('click', preventNavigation);
		document.body.innerHTML = '';
		delete window.gtag;
	});

	it('stops sending once the listener is removed', () => {
		const gtag = vi.fn();
		window.gtag = gtag;
		document.body.innerHTML = '<a href="https://www.meekoapp.com">Meeko</a>';
		const stopListening = listenForLinkClicks(document);
		stopListening();
		document.addEventListener('click', preventNavigation);
		document.querySelector('a')?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
		expect(gtag).not.toHaveBeenCalled();
		document.removeEventListener('click', preventNavigation);
		document.body.innerHTML = '';
		delete window.gtag;
	});
});
