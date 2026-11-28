import { appProjects } from '$lib/content/apps';
import { resumePdfPath } from '$lib/content/resume';
import { footerLinks, getVisibleSocialLinks } from '$lib/content/site';
import { getSiteArea } from '$lib/seo/pageMeta';
import { getEmailLeadType, getEmailSubject } from './leads';
import { trackEvent } from './tracking';
import { AnalyticsEventName, AppLinkKind, LeadMethod } from './types';
import type { AnalyticsEvent } from './types';

type LinkTarget = { url: string; event: AnalyticsEvent };

const parseUrl = (url: string, baseUrl?: string): URL | null => {
	try {
		return new URL(url, baseUrl);
	} catch {
		return null;
	}
};

/** Reduces a URL to the parts that identify the page, so `https://x.com/a/` and `https://x.com/a` match. */
const normalizeUrl = (url: string): string => {
	const parsedUrl = parseUrl(url);
	if (!parsedUrl || url.trim() === '') {
		return '';
	}
	return `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname.replace(/\/+$/, '')}${parsedUrl.search}`;
};

const appLinkTargets: LinkTarget[] = appProjects.flatMap(({ name, linkUrl, codeUrl }) => {
	return [
		{ url: linkUrl, linkKind: AppLinkKind.Site },
		{ url: codeUrl, linkKind: AppLinkKind.Code },
	].map(({ url, linkKind }) => ({
		url: normalizeUrl(url),
		event: { name: AnalyticsEventName.AppLinkClick, parameters: { app_name: name, link_kind: linkKind } },
	}));
});

const profileLinkTargets: LinkTarget[] = getVisibleSocialLinks(footerLinks)
	.filter(({ url }) => /^https?:\/\//.test(url))
	.map(({ name, url }) => ({
		url: normalizeUrl(url),
		event: { name: AnalyticsEventName.ProfileLinkClick, parameters: { profile: name } },
	}));

const linkTargets = [...appLinkTargets, ...profileLinkTargets].filter(({ url }) => url !== '');

const buildEmailLead = (emailUrl: string, pageUrl: URL): AnalyticsEvent => {
	const subject = getEmailSubject(emailUrl);
	return {
		name: AnalyticsEventName.GenerateLead,
		parameters: {
			method: LeadMethod.Email,
			email_subject: subject === '' ? 'none' : subject,
			lead_type: getEmailLeadType(subject, getSiteArea(pageUrl.pathname)),
		},
	};
};

/**
 * Works out which analytics event, if any, a click on a link with this `href` stands for. `pageUrl` is
 * the page the click happened on. Links that are none of the tracked kinds return `null`.
 */
export const classifyLinkClick = (href: string, pageUrl: string): AnalyticsEvent | null => {
	const parsedPageUrl = parseUrl(pageUrl);
	const linkUrl = parsedPageUrl ? parseUrl(href, parsedPageUrl.href) : null;
	if (!parsedPageUrl || !linkUrl || href.trim() === '') {
		return null;
	}

	if (linkUrl.protocol === 'mailto:') {
		return buildEmailLead(linkUrl.href, parsedPageUrl);
	}
	if (linkUrl.origin === parsedPageUrl.origin && linkUrl.pathname === resumePdfPath) {
		return { name: AnalyticsEventName.ResumeDownload, parameters: {} };
	}

	const normalizedLinkUrl = normalizeUrl(linkUrl.href);
	return linkTargets.find(({ url }) => url === normalizedLinkUrl)?.event ?? null;
};

/**
 * Listens for clicks on links anywhere in the document and sends the event each one stands for.
 * Returns a function that stops listening.
 */
export const listenForLinkClicks = (root: Document): (() => void) => {
	const handleClick = (event: MouseEvent): void => {
		if (!(event.target instanceof Element)) {
			return;
		}
		const link = event.target.closest('a[href]');
		if (!link) {
			return;
		}
		const linkEvent = classifyLinkClick(link.getAttribute('href') ?? '', window.location.href);
		if (linkEvent) {
			trackEvent(linkEvent.name, linkEvent.parameters);
		}
	};

	root.addEventListener('click', handleClick, { capture: true });
	return (): void => {
		root.removeEventListener('click', handleClick, { capture: true });
	};
};
