import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';
import { appsPageCopy } from '../src/lib/content/apps';
import { coachingPageCopy } from '../src/lib/content/coaching';
import { contactPageCopy, navigationItems } from '../src/lib/content/site';
import { dancePageCopy } from '../src/lib/content/wsdc';

export type BuiltPage = { filePath: string; html: string };

const forbiddenFragments = ['samuraijs', 'SwingCoder911', 'docs/research'];
const textFileExtensions = ['.html', '.js', '.css', '.txt', '.xml', '.json', '.webmanifest', '.svg', '.htaccess'];

/** Each route's prerendered file and the heading text it must contain without running any script. */
const expectedRoutes: { filePath: string; heading: string }[] = [
	{ filePath: 'index.html', heading: 'Sunada' },
	{ filePath: 'coaching/index.html', heading: coachingPageCopy.headline },
	{ filePath: 'dance/index.html', heading: dancePageCopy.headline },
	{ filePath: 'apps/index.html', heading: appsPageCopy.headline },
	{ filePath: 'resume/index.html', heading: 'Resume' },
	{ filePath: 'contact/index.html', heading: contactPageCopy.headline },
];

const requiredSiteFiles = ['404.html', 'sitemap.xml', 'robots.txt', 'llms.txt', 'site.webmanifest', '.htaccess'];

const getIsInternalPath = (url: string): boolean => {
	return url.startsWith('/') && !url.startsWith('//');
};

const stripQueryAndFragment = (url: string): string => {
	return url.split(/[?#]/)[0];
};

const getResolvesToFile = (url: string, existingFiles: Set<string>): boolean => {
	const path = decodeURIComponent(stripQueryAndFragment(url)).replace(/^\//, '');
	if (path === '' || path.endsWith('/')) {
		return existingFiles.has(`${path}index.html`);
	}
	return existingFiles.has(path) || existingFiles.has(`${path}/index.html`);
};

const getReferencedUrls = (html: string): string[] => {
	const document = new JSDOM(html).window.document;
	const attributeUrls = [...document.querySelectorAll('[href], [src]')].flatMap((element) => {
		return [element.getAttribute('href'), element.getAttribute('src')].filter((url): url is string => url !== null);
	});
	const srcsetUrls = [...document.querySelectorAll('[srcset]')].flatMap((element) => {
		return (element.getAttribute('srcset') ?? '')
			.split(',')
			.map((candidate) => candidate.trim().split(/\s+/)[0])
			.filter((url) => url !== '');
	});
	return [...attributeUrls, ...srcsetUrls];
};

/**
 * Lists every internal href, src and srcset URL that has no matching file in the build.
 */
export const findBrokenInternalLinks = (pages: BuiltPage[], existingFiles: string[]): string[] => {
	const fileSet = new Set(existingFiles);
	return pages.flatMap(({ filePath, html }) => {
		const brokenUrls = getReferencedUrls(html)
			.filter(getIsInternalPath)
			.filter((url) => !getResolvesToFile(url, fileSet));
		return [...new Set(brokenUrls)].map((url) => `${filePath} → ${url}`);
	});
};

/**
 * Lists the search metadata and semantic problems in one prerendered page.
 */
export const findMetadataProblems = (html: string): string[] => {
	const document = new JSDOM(html).window.document;
	const problems: string[] = [];

	if ((document.querySelector('title')?.textContent ?? '').trim() === '') {
		problems.push('missing <title>');
	}
	if (!document.querySelector('meta[name="description"][content]')) {
		problems.push('missing meta description');
	}
	if (!document.querySelector('link[rel="canonical"][href]')) {
		problems.push('missing canonical link');
	}
	if (!document.querySelector('meta[property="og:image"][content]')) {
		problems.push('missing og:image');
	}

	const headingCount = document.querySelectorAll('h1').length;
	if (headingCount !== 1) {
		problems.push(`expected one h1, found ${headingCount}`);
	}

	const imagesWithoutAlt = [...document.querySelectorAll('img')].filter((image) => !image.hasAttribute('alt')).length;
	if (imagesWithoutAlt > 0) {
		problems.push(`${imagesWithoutAlt} img without alt`);
	}

	const jsonLdBlocks = [...document.querySelectorAll('script[type="application/ld+json"]')];
	const hasUnparseableJsonLd = jsonLdBlocks.some((script) => {
		try {
			JSON.parse(script.textContent ?? '');
			return false;
		} catch {
			return true;
		}
	});
	if (jsonLdBlocks.length === 0 || hasUnparseableJsonLd) {
		problems.push(jsonLdBlocks.length === 0 ? 'missing JSON-LD' : 'unparseable JSON-LD');
	}

	return problems;
};

/**
 * Lists relative href and src URLs. Apache serves 404.html at whatever path was requested, so a
 * relative asset URL there resolves against the wrong directory.
 */
export const findRelativeAssetReferences = (html: string): string[] => {
	const document = new JSDOM(html).window.document;
	return [...document.querySelectorAll('[href], [src]')]
		.flatMap((element) => [element.getAttribute('href'), element.getAttribute('src')])
		.filter((url): url is string => url !== null && (url.startsWith('./') || url.startsWith('../')));
};

export const findForbiddenText = (text: string): string[] => {
	return forbiddenFragments.filter((fragment) => text.includes(fragment));
};

const listFiles = (directory: string): string[] => {
	return readdirSync(directory).flatMap((entry) => {
		const fullPath = join(directory, entry);
		return statSync(fullPath).isDirectory() ? listFiles(fullPath) : [fullPath];
	});
};

const getIsTextFile = (filePath: string): boolean => {
	return textFileExtensions.some((extension) => filePath.endsWith(extension));
};

const checkBuild = (buildDirectory: string): string[] => {
	if (!existsSync(buildDirectory)) {
		return [`${buildDirectory} does not exist; run npm run build first`];
	}

	const existingFiles = listFiles(buildDirectory).map((filePath) => relative(buildDirectory, filePath));
	const pages: BuiltPage[] = existingFiles
		.filter((filePath) => filePath.endsWith('.html'))
		.map((filePath) => ({ filePath, html: readFileSync(join(buildDirectory, filePath), 'utf8') }));
	const getPage = (filePath: string): BuiltPage | undefined => pages.find((page) => page.filePath === filePath);

	const missingFiles = [...expectedRoutes.map(({ filePath }) => filePath), ...requiredSiteFiles]
		.filter((filePath) => !existingFiles.includes(filePath))
		.map((filePath) => `missing ${filePath}`);

	const routeProblems = expectedRoutes.flatMap(({ filePath, heading }) => {
		const page = getPage(filePath);
		if (!page) {
			return [];
		}
		const document = new JSDOM(page.html).window.document;
		const headingText = document.querySelector('h1')?.textContent ?? '';
		const menuHrefs = [...document.querySelectorAll('nav[aria-label="Main"] a')].map((link) => link.getAttribute('href'));
		const missingMenuLinks = navigationItems
			.filter(({ path }) => !menuHrefs.includes(path))
			.map(({ path }) => `${filePath}: menu link ${path} missing from prerendered HTML`);
		const headingProblems = headingText.includes(heading) ? [] : [`${filePath}: h1 does not contain "${heading}"`];
		const metadataProblems = findMetadataProblems(page.html).map((problem) => `${filePath}: ${problem}`);
		return [...headingProblems, ...missingMenuLinks, ...metadataProblems];
	});

	const notFoundPage = getPage('404.html');
	const notFoundHeadingProblems = notFoundPage && new JSDOM(notFoundPage.html).window.document.querySelectorAll('h1').length !== 1
		? ['404.html: expected one h1']
		: [];
	const notFoundAssetProblems = notFoundPage
		? findRelativeAssetReferences(notFoundPage.html).map((url) => `404.html: relative asset URL ${url}`)
		: [];
	const notFoundProblems = [...notFoundHeadingProblems, ...notFoundAssetProblems];

	const brokenLinks = findBrokenInternalLinks(pages, existingFiles).map((problem) => `broken link: ${problem}`);

	const forbiddenText = existingFiles.filter(getIsTextFile).flatMap((filePath) => {
		const text = readFileSync(join(buildDirectory, filePath), 'utf8');
		return findForbiddenText(text).map((fragment) => `${filePath}: contains "${fragment}"`);
	});

	return [...missingFiles, ...routeProblems, ...notFoundProblems, ...brokenLinks, ...forbiddenText];
};

const getIsRunDirectly = (): boolean => {
	return process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;
};

if (getIsRunDirectly()) {
	const problems = checkBuild(join(process.cwd(), 'build'));
	if (problems.length > 0) {
		console.error(`Build check found ${problems.length} problem(s):`);
		problems.forEach((problem) => {
			console.error(`  - ${problem}`);
		});
		process.exit(1);
	}
	console.log('Build check passed: routes, metadata, links and site files are in place.');
}
