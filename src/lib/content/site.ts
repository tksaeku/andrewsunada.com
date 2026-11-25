import type { ContactTopic, NavigationItem, SocialLink } from './types';

export const siteOrigin = 'https://www.andrewsunada.com';
export const siteName = 'Andrew Sunada';
export const personName = 'Andrew Sunada';
export const contactEmail = 'andrew@andrewsunada.com';

export const tagline = 'West Coast Swing coaching that keeps you present and connected.';

export const heroIntroduction =
	'I’m a student of dance and engineering. I love solving problems, building things that help people, and getting lost in the flow — on the dance floor and in the code — and I love helping others find theirs.';

export const shortBio =
	'I’ve danced my whole life, but West Coast Swing caught me at Oregon State University and never let go. I compete internationally in the All-Stars division and have performed two Rising Star routines, one at the US Open. I teach because strong fundamentals free dancers to find their own rhythm. Social dancing is still my favourite part, so ask me to dance!';

export const socialLinks: SocialLink[] = [
	{ name: 'Instagram', url: 'https://www.instagram.com/andrewsunada/' },
	{ name: 'Facebook', url: 'https://www.facebook.com/tksaeku/' },
	{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/andrewsunada' },
	{ name: 'YouTube', url: 'https://www.youtube.com/@AndrewSunada' },
	{ name: 'GitHub', url: 'https://github.com/tksaeku' },
];

export const ebayStoreUrl = 'https://www.ebay.com/usr/topknotcomics';

/** The footer's links: every profile, then the eBay store and the email address. */
export const footerLinks: SocialLink[] = [
	...socialLinks,
	{ name: 'eBay', url: ebayStoreUrl },
	{ name: 'Email', url: `mailto:${contactEmail}` },
];

export const youtubeChannelUrl = 'https://www.youtube.com/@AndrewSunada';
export const githubProfileUrl = 'https://github.com/tksaeku';

/**
 * Returns the profile links that have a URL, so an unset profile never renders as a dead link.
 */
export const getVisibleSocialLinks = (links: SocialLink[] = socialLinks): SocialLink[] => {
	return links.filter(({ url }) => url.trim() !== '');
};

export const navigationItems: NavigationItem[] = [
	{ label: 'Coaching', path: '/coaching/' },
	{ label: 'Dance', path: '/dance/' },
	{ label: 'Apps', path: '/apps/' },
	{ label: 'Resume', path: '/resume/' },
	{ label: 'Contact', path: '/contact/' },
];

export const photographerCredit = { name: 'Doug Silton', url: 'https://dougsilton.com/' } as const;

/** Calendly scheduling link for a private lesson. Empty until the Calendly event type exists. */
export const privateLessonBookingUrl = '';

/**
 * Builds a mailto link to Andrew that opens the visitor's email app with the subject, and optionally the body, filled in.
 */
export const getEmailUrl = ({ subject, body }: { subject: string; body?: string }): string => {
	const subjectParameter = `subject=${encodeURIComponent(subject)}`;
	const bodyParameter = body === undefined ? '' : `&body=${encodeURIComponent(body)}`;
	return `mailto:${contactEmail}?${subjectParameter}${bodyParameter}`;
};

/** Opens the visitor's email app with a lesson request. Used while there is no Calendly link. */
export const lessonBookingEmailUrl = getEmailUrl({ subject: 'Book a lesson' });

/** Opens the visitor's email app with a drill library enquiry. */
export const drillLibraryEmailUrl = getEmailUrl({
	subject: 'Your drill library',
	body: 'Hey Andrew! I would love to learn more about your drill library.',
});

export const getContactPath = (topic: ContactTopic): string => {
	return `/contact/?topic=${topic}`;
};

export const serviceAreas = [
	{ locality: 'Portland', region: 'OR' },
	{ locality: 'Vancouver', region: 'WA' },
];

export const contactPageCopy = {
	heroLabel: 'Contact',
	headline: 'Let’s talk.',
	introduction: 'Book a private lesson, or send a message about monthly coaching, workshops, convention staffing or software work.',
	emailHeading: 'Or write to me directly',
	profilesHeading: 'Find me elsewhere',
};
