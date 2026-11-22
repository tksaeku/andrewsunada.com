import type { NavigationItem, SocialLink } from './types';

export const siteOrigin = 'https://www.andrewsunada.com';
export const siteName = 'Andrew Sunada';
export const personName = 'Andrew Sunada';
export const contactEmail = 'andrew@andrewsunada.com';

export const tagline = 'West Coast Swing coaching that keeps you present and connected.';

export const heroIntroduction =
	'I’m a West Coast Swing coach, an All-Star competitor, and a software engineer. I help dancers build clean fundamentals so they can stay present and connected with their partner — and find their own rhythm on top.';

export const shortBio =
	'I’ve danced my whole life, but West Coast Swing caught me at Oregon State University and never let go. I compete internationally in the All-Stars division and have performed two Rising Star routines, one at the US Open. I teach because strong fundamentals free dancers to find their own rhythm. Social dancing is still my favourite part, so ask me to dance.';

export const socialLinks: SocialLink[] = [
	{ name: 'Instagram', url: 'https://www.instagram.com/andrewsunada/' },
	{ name: 'Facebook', url: 'https://www.facebook.com/tksaeku/' },
	{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/andrewsunada' },
	{ name: 'YouTube', url: 'https://www.youtube.com/@AndrewSunada' },
	{ name: 'GitHub', url: 'https://github.com/tksaeku' },
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

export const lessonContactPath = '/contact/?topic=lesson';

export const serviceAreas = [
	{ locality: 'Portland', region: 'OR' },
	{ locality: 'Vancouver', region: 'WA' },
];
