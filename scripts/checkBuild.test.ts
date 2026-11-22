import { findBrokenInternalLinks, findForbiddenText, findMetadataProblems } from './checkBuild';

const validHead = `
	<title>Coaching · Andrew Sunada</title>
	<meta name="description" content="Private lessons and coaching.">
	<link rel="canonical" href="https://www.andrewsunada.com/coaching/">
	<meta property="og:image" content="https://www.andrewsunada.com/images/share-default.png">
	<script type="application/ld+json">{"@type":"WebSite"}</script>
`;

const buildPage = (head: string, body: string): string => {
	return `<!doctype html><html lang="en"><head>${head}</head><body>${body}</body></html>`;
};

describe('findBrokenInternalLinks', () => {
	const existingFiles = ['index.html', 'coaching/index.html', 'fonts/dm-sans.woff2', 'andrew-sunada-resume.pdf'];

	it('passes links that resolve to a directory index or a file', () => {
		const pages = [{
			filePath: 'index.html',
			html: buildPage('', '<a href="/coaching/">C</a><a href="/coaching/#rates">R</a><a href="/andrew-sunada-resume.pdf">P</a><link href="/fonts/dm-sans.woff2"><a href="/?x=1">H</a>'),
		}];
		expect(findBrokenInternalLinks(pages, existingFiles)).toEqual([]);
	});

	it('reports an internal link with no matching file', () => {
		const pages = [{ filePath: 'index.html', html: buildPage('', '<a href="/dance/">D</a><img src="/images/missing.jpg" alt="x">') }];
		expect(findBrokenInternalLinks(pages, existingFiles)).toEqual([
			'index.html → /dance/',
			'index.html → /images/missing.jpg',
		]);
	});

	it('ignores external, mail and fragment links', () => {
		const pages = [{
			filePath: 'index.html',
			html: buildPage('', '<a href="https://github.com/tksaeku">G</a><a href="mailto:andrew@andrewsunada.com">M</a><a href="#main">S</a>'),
		}];
		expect(findBrokenInternalLinks(pages, existingFiles)).toEqual([]);
	});

	it('checks every srcset candidate', () => {
		const pages = [{ filePath: 'index.html', html: buildPage('', '<img alt="x" src="/fonts/dm-sans.woff2" srcset="/a.avif 400w, /fonts/dm-sans.woff2 800w">') }];
		expect(findBrokenInternalLinks(pages, existingFiles)).toEqual(['index.html → /a.avif']);
	});
});

describe('findMetadataProblems', () => {
	it('passes a complete page', () => {
		expect(findMetadataProblems(buildPage(validHead, '<h1>Coaching</h1><img src="/a.jpg" alt="Andrew">'))).toEqual([]);
	});

	it('reports each missing piece', () => {
		const problems = findMetadataProblems(buildPage('<script type="application/ld+json">{broken</script>', '<img src="/a.jpg">'));
		expect(problems).toEqual([
			'missing <title>',
			'missing meta description',
			'missing canonical link',
			'missing og:image',
			'expected one h1, found 0',
			'1 img without alt',
			'unparseable JSON-LD',
		]);
	});

	it('reports more than one h1', () => {
		expect(findMetadataProblems(buildPage(validHead, '<h1>A</h1><h1>B</h1>'))).toEqual(['expected one h1, found 2']);
	});

	it('accepts an empty alt for decorative images', () => {
		expect(findMetadataProblems(buildPage(validHead, '<h1>A</h1><img src="/a.jpg" alt="">'))).toEqual([]);
	});
});

describe('findForbiddenText', () => {
	it('reports the old account names and private paths', () => {
		expect(findForbiddenText('see github.com/samuraijs and SwingCoder911 in docs/research/notes')).toEqual([
			'samuraijs', 'SwingCoder911', 'docs/research',
		]);
		expect(findForbiddenText('all clear')).toEqual([]);
	});
});
