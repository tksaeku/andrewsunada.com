import { coachingOffers, venues } from '$lib/content/coaching';
import {
	contactEmail, getVisibleSocialLinks, personName, serviceAreas, shortBio, siteName, siteOrigin,
} from '$lib/content/site';
import type { AppProject, Video } from '$lib/content/types';
import { getVideoLabel, getVideoThumbnailUrl, getVideoWatchUrl } from '$lib/content/videos';
import { wsdcRecord } from '$lib/content/wsdc';
import { getCanonicalUrl, pageMetaByPath, portraitImagePath } from './pageMeta';
import type {
	BreadcrumbListJsonLd, JsonLd, OfferJsonLd, PageMeta, PersonJsonLd, ServiceJsonLd, VideoObjectJsonLd,
} from './types';

const schemaContext = 'https://schema.org';
const personId = `${siteOrigin}/#person`;
const websiteId = `${siteOrigin}/#website`;
const servicedOfferSlugs = ['private-lessons', 'monthly-coaching', 'workshops'];

const personReference: JsonLd = { '@type': 'Person', '@id': personId };

export const buildWebSite = (): JsonLd => {
	return {
		'@context': schemaContext,
		'@type': 'WebSite',
		'@id': websiteId,
		name: siteName,
		url: getCanonicalUrl('/'),
		inLanguage: 'en',
		publisher: personReference,
	};
};

export const buildPerson = (): PersonJsonLd => {
	const profileUrls = getVisibleSocialLinks().map(({ url }) => url);
	const sameAs = [...profileUrls, wsdcRecord.registryUrl].filter((url) => url.trim() !== '');

	return {
		'@context': schemaContext,
		'@type': 'Person',
		'@id': personId,
		name: personName,
		url: getCanonicalUrl('/'),
		image: getCanonicalUrl(portraitImagePath),
		email: `mailto:${contactEmail}`,
		jobTitle: ['West Coast Swing coach', 'Software engineer'],
		description: shortBio,
		homeLocation: { '@type': 'Place', name: 'Portland, OR' },
		knowsAbout: ['West Coast Swing', 'Partner dance coaching', 'Software engineering', 'Web development'],
		sameAs,
	};
};

const buildAreaServed = (): JsonLd[] => {
	return serviceAreas.map(({ locality, region }) => ({
		'@type': 'City',
		name: `${locality}, ${region}`,
	}));
};

const buildVenuePlaces = (): JsonLd[] => {
	return venues.map((venue) => ({
		'@type': 'Place',
		name: venue.name,
		url: venue.url,
		address: { '@type': 'PostalAddress', addressLocality: venue.locality, addressRegion: venue.region, addressCountry: 'US' },
	}));
};

export const buildCoachingServices = (): ServiceJsonLd[] => {
	return coachingOffers
		.filter(({ slug }) => servicedOfferSlugs.includes(slug))
		.map((offer) => {
			const offers: OfferJsonLd[] = offer.rates.map((rate) => ({
				'@type': 'Offer',
				name: rate.label,
				price: String(rate.amountUsd),
				priceCurrency: 'USD',
				...(rate.note ? { description: rate.note } : {}),
				priceSpecification: {
					'@type': 'UnitPriceSpecification',
					price: String(rate.amountUsd),
					priceCurrency: 'USD',
					unitText: rate.unit,
				},
			}));
			const service: ServiceJsonLd = {
				'@context': schemaContext,
				'@type': 'Service',
				name: offer.title,
				serviceType: 'West Coast Swing coaching',
				description: offer.summary,
				url: `${getCanonicalUrl('/coaching/')}#${offer.slug}`,
				provider: personReference,
				areaServed: buildAreaServed(),
				offers,
			};

			return offer.slug === 'workshops' ? { ...service, location: buildVenuePlaces() } : service;
		});
};

export const buildVideoObjects = (videos: Video[]): VideoObjectJsonLd[] => {
	return videos.map((video) => ({
		'@context': schemaContext,
		'@type': 'VideoObject',
		name: `${personName} — ${getVideoLabel(video)}`,
		description: `${personName} competing at ${video.event} ${video.year}: ${video.title}.`,
		thumbnailUrl: getVideoThumbnailUrl(video),
		uploadDate: video.uploadedAt,
		contentUrl: getVideoWatchUrl(video),
		embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
		creator: personReference,
	}));
};

export const buildSoftwareApplications = (apps: AppProject[]): JsonLd[] => {
	return apps.map((app) => ({
		'@context': schemaContext,
		'@type': 'SoftwareApplication',
		name: app.name,
		description: app.pitch,
		applicationCategory: 'WebApplication',
		operatingSystem: 'Web',
		author: personReference,
		...(app.linkUrl ? { url: app.linkUrl } : {}),
	}));
};

export const buildBreadcrumbList = (meta: PageMeta): BreadcrumbListJsonLd => {
	const home = pageMetaByPath['/'];

	return {
		'@context': schemaContext,
		'@type': 'BreadcrumbList',
		itemListElement: [home, meta].map((entry, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: entry.breadcrumbLabel,
			item: getCanonicalUrl(entry.path),
		})),
	};
};

export const buildProfilePage = (): JsonLd => {
	return {
		'@context': schemaContext,
		'@type': 'ProfilePage',
		url: getCanonicalUrl('/resume/'),
		name: pageMetaByPath['/resume/'].title,
		mainEntity: personReference,
	};
};

export const buildContactPage = (): JsonLd => {
	return {
		'@context': schemaContext,
		'@type': 'ContactPage',
		url: getCanonicalUrl('/contact/'),
		name: pageMetaByPath['/contact/'].title,
		about: personReference,
	};
};
