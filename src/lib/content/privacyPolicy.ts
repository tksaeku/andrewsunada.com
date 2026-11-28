import { contactEmail } from './site';
import type { PrivacySection } from './types';

export const privacyPagePath = '/privacy/';

export const privacyPageCopy = {
	heroLabel: 'Privacy',
	headline: 'Privacy',
	introduction: 'This site counts visits so I can see what people find useful. Here is what that means for you.',
	footerLinkLabel: 'Privacy',
};

export const privacySections: PrivacySection[] = [
	{
		heading: 'Analytics',
		paragraphs: [
			'I use Google Analytics to count visits and to see which pages and links people use. Google Analytics sets cookies in your browser so it can tell one visit from the next.',
		],
		links: [{ label: 'Google’s privacy policy', url: 'https://policies.google.com/privacy' }],
	},
	{
		heading: 'What is collected',
		paragraphs: [
			'The pages you open, the links and buttons you click, your approximate location (city and country), your device and browser, and the site that sent you here. Google signals adds age and interest groups, which I only ever see as totals across many visitors.',
			'Nothing you type into the site is sent to Google Analytics, and I can’t see who you are from it.',
		],
		links: [],
	},
	{
		heading: 'Messages',
		paragraphs: [
			'A message sent through the contact form reaches me by email through Formspree. It is never sent to Google Analytics.',
		],
		links: [{ label: 'Formspree’s privacy policy', url: 'https://formspree.io/legal/privacy-policy/' }],
	},
	{
		heading: 'Calendly and YouTube',
		paragraphs: [
			'Booking a lesson opens Calendly, and playing a video loads it from YouTube. Each has its own privacy policy, which applies when you use them.',
		],
		links: [
			{ label: 'Calendly’s privacy notice', url: 'https://calendly.com/legal/privacy-notice' },
			{ label: 'YouTube (Google) privacy policy', url: 'https://policies.google.com/privacy' },
		],
	},
	{
		heading: 'Opting out',
		paragraphs: [
			'A tracker or content blocker in your browser stops Google Analytics on this site, and so does Google’s opt-out browser add-on.',
		],
		links: [{ label: 'Google Analytics opt-out add-on', url: 'https://tools.google.com/dlpage/gaoptout' }],
	},
	{
		heading: 'Questions',
		paragraphs: [`Write to me at ${contactEmail} with any question about your data.`],
		links: [{ label: contactEmail, url: `mailto:${contactEmail}` }],
	},
];
