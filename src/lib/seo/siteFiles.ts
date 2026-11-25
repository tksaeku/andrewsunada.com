import { coachingOffers, studentRateDefinition, venues } from '$lib/content/coaching';
import { contactEmail, getVisibleSocialLinks, personName, shortBio, siteOrigin } from '$lib/content/site';
import type { Rate } from '$lib/content/types';
import { wsdcRecord } from '$lib/content/wsdc';
import { getCanonicalUrl, pageMetaByPath } from './pageMeta';

const aiCrawlers = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'];

export const buildSitemap = (lastModified: string): string => {
	const urls = Object.keys(pageMetaByPath).map((path) => {
		return `\t<url>\n\t\t<loc>${getCanonicalUrl(path)}</loc>\n\t\t<lastmod>${lastModified}</lastmod>\n\t</url>`;
	});

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...urls,
		'</urlset>',
		'',
	].join('\n');
};

export const buildRobots = (): string => {
	const crawlerGroups = aiCrawlers.map((agent) => `User-agent: ${agent}\nAllow: /`);

	return [...crawlerGroups, 'User-agent: *\nAllow: /', `Sitemap: ${siteOrigin}/sitemap.xml`].join('\n\n') + '\n';
};

const formatRate = (rate: Rate): string => {
	const note = rate.note ? ` (${rate.note})` : '';
	return `${rate.label}: $${rate.amountUsd} per ${rate.unit}${note}`;
};

export const buildLlmsText = (): string => {
	const offerLines = coachingOffers.map((offer) => {
		const rateLines = offer.rates.map((rate) => `  - ${formatRate(rate)}`);
		return [`- **${offer.title}** — ${offer.summary}`, ...rateLines].join('\n');
	});
	const venueLines = venues.map((venue) => {
		return `- ${venue.name} (${venue.url}), ${venue.locality}, ${venue.region}`;
	});
	const pageLines = Object.values(pageMetaByPath).map((meta) => {
		return `- [${meta.breadcrumbLabel}](${getCanonicalUrl(meta.path)}): ${meta.description}`;
	});
	const profileLines = getVisibleSocialLinks().map(({ name, url }) => `- ${name}: ${url}`);

	return [
		`# ${personName}`,
		'> West Coast Swing coach and All-Star competitor in Portland, OR and Vancouver, WA, and a Senior Staff Software Engineer.',
		shortBio,
		'## Coaching',
		offerLines.join('\n'),
		studentRateDefinition,
		'Payment is made directly to Andrew, by cash or Venmo.',
		'## Workshop venues',
		venueLines.join('\n'),
		'## Dance',
		`WSDC #${wsdcRecord.wsdcId}, ${wsdcRecord.division} division. Registry: ${wsdcRecord.registryUrl}`,
		'## Pages',
		pageLines.join('\n'),
		'## Profiles',
		profileLines.join('\n'),
		'## Contact',
		`Email ${contactEmail} or use the form at ${getCanonicalUrl('/contact/')}.`,
	].join('\n\n') + '\n';
};
