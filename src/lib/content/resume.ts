import type { ResumeEducation, ResumeRole, ResumeSkillGroup } from './types';

export const resumeHeadline = 'Senior Staff Software Engineer · Browser Platform · Distributed Systems · AI Engineering';
export const resumeLocation = 'Portland, OR';
export const resumePdfPath = '/andrew-sunada-resume.pdf';

export const engineeringIntroduction =
	'Senior Staff engineer with 15 years on the web. I work across the full depth of the stack, from DOM and iframe internals in the browser to Go services, Kubernetes and multi-region data pipelines.';

export const resumeSummary =
	'Senior Staff engineer with 15 years on the web, the last six building the capture-and-replay platform behind billions of user sessions a month for Fortune 500 customers. I work across the full depth of the stack, from DOM and iframe internals in the browser to Go services, Kubernetes, and multi-region data pipelines. Teams send me the problems with no clear owner or no clear path. I also bring AI-native engineering into how teams ship: about half of my engineering org uses my standards and Claude Code tooling.';

export const resumeRoles: ResumeRole[] = [
	{
		employer: 'Quantum Metric',
		title: 'Senior Staff Software Engineer',
		start: 'Jan 2026',
		end: 'Present',
		location: 'Remote',
		highlights: [
			'Led a data governance platform from a single-region prototype to production in all 5 regional clusters in 5 weeks: a modular detector framework, shared Go packages, per-customer BigQuery results, data-residency routing, an authenticated API, and Helm/Terraform. A new detector now takes about 760 lines and no infra changes, versus 2,100–3,100 before.',
			'Core builder across the Replay product: Interactions (page-overlay foundations and API), the Renderer (including a rendering service that feeds the company’s AI product), and Download/Export. Much of it was delivered through AI-native agent workflows.',
			'Architect of the replay platform separation. Traced the capture → ingest → storage → replay path across 5 services, defined the storage contract as the boundary, and designed the extraction of a ~50k-LOC frontend behind enforced import boundaries and API contracts.',
			'Cut peak replay memory 10× (7 GB → 700 MB), ending freezes and out-of-memory crashes, by reworking the active-page model and isolating injected SVG from the DOM path walker.',
			'Turned a cross-frame focus bug into an architectural boundary. The analytics UI now reaches replay only through the session API.',
			'Built the team Claude Code plugin (skills, agents, debugging workflows) and an agent groom → gate → dispatch pipeline. About half of engineering uses them.',
			'Owner of the capture/ingest logging service. Standardized log payloads after auditing ~370 SDK call sites across web, iOS, Android, and Flutter.',
		],
	},
	{
		employer: 'Quantum Metric',
		title: 'Staff Software Engineer',
		start: 'Jan 2023',
		end: 'Jan 2026',
		location: 'Remote',
		highlights: [
			'Built replay’s quality foundation from scratch: a staging environment, real-user error and performance telemetry, and a Playwright E2E suite with a synthetic-site data-mocking harness.',
			'Wrote a codebase-wide ESLint rule that banned an expensive data pattern and removed a class of dashboard data-loss bugs.',
			'Re-architected the session-details API with a phased rollout. Rewrote event-collapse as an O(n) algorithm.',
			'Owned the page-overlay visualization layer and its integrator API. Led replay download and export, including native-app replay.',
			'Go-to engineer across teams for iframe, webview, shadow-DOM, and selector-generation problems.',
		],
	},
	{
		employer: 'Quantum Metric',
		title: 'Senior Software Engineer',
		start: 'Nov 2020',
		end: 'Jan 2023',
		location: 'Remote',
		highlights: [
			'Delivered the Visible product launch. Built backend integrations, OAuth, and security, and solved element-visibility detection. The manager said it “would not have been released on time if it were not for his efforts.”',
			'Acting tech lead during the manager’s leave. Mentored three engineers. Won a 2022 Hack Week category.',
		],
	},
	{
		employer: 'Mozilla',
		title: 'Senior Frontend Software Engineer',
		start: 'Jul 2019',
		end: 'Oct 2020',
		location: 'Portland, OR',
		highlights: [
			'Built a serverless HLS/WebRTC video streaming service on AWS (Lambda, S3, DynamoDB, Elemental, API Gateway) with a Vue frontend.',
			'Contributed to Mozilla’s internal IAM application, a Vue frontend over microservices.',
			'Created a shared component framework shipped as both Vue components and framework-agnostic Web Components. Served on the org-wide release and standards team.',
		],
	},
	{
		employer: 'Conexess Group → Cigna',
		title: 'JavaScript Developer',
		start: 'Jun 2018',
		end: 'Jun 2019',
		location: 'Portland, OR',
		highlights: [
			'Built Angular/NgRx and Node services for internal content management and a public flow serving ML-driven personalized content. Wrote internal VS Code extensions.',
		],
	},
	{
		employer: 'Beyondsoft → HP',
		title: 'Front End Developer',
		start: 'Oct 2017',
		end: 'Jun 2018',
		location: 'Vancouver, WA',
		highlights: ['Took a React/Redux/Node/PHP product from half-built to MVP release across two stacks with a small team.'],
	},
	{
		employer: 'AltSource',
		title: 'Front End Developer',
		start: 'Aug 2015',
		end: 'Oct 2017',
		location: 'Portland, OR',
		highlights: [
			'Frontend architect across client teams in a .NET consultancy: AngularJS, KnockoutJS, D3, and TypeScript. Wrote architecture docs and UI mockups and ran client demos.',
		],
	},
	{
		employer: 'Abacast / WideOrbit',
		title: 'Web Developer',
		start: 'May 2013',
		end: 'Jul 2015',
		location: 'Vancouver, WA',
		highlights: [
			'Built and scaled Clarity, an ad-scheduling platform for digital audio streams (clients included ESPN), and a web radio player. Optimized reporting performance.',
		],
	},
	{
		employer: 'Earlier experience',
		title: 'Web and software developer',
		start: '2010',
		end: '2013',
		highlights: [
			'Encapsys (JasperServer reporting, Java/Spring) · MotoSport (PHP, 3-domain e-commerce, on-call) · Hybrid Industries · Business Solutions Group (C#/.NET)',
		],
	},
];

export const resumeSkills: ResumeSkillGroup[] = [
	{ label: 'Languages', items: ['TypeScript', 'JavaScript', 'Go', 'Python', 'SQL'] },
	{
		label: 'Browser platform',
		items: ['DOM capture/replay', 'MutationObserver', 'shadow DOM', 'iframes & postMessage', 'webviews', 'SVG', 'headless rendering', 'extensions', 'Web Components'],
	},
	{
		label: 'Infrastructure',
		items: ['Kubernetes', 'Helm', 'Terraform', 'Docker', 'GCP', 'BigQuery', 'AWS', 'Postgres', 'MariaDB', 'MongoDB', 'message bus', 'caching', 'SSO/IAP'],
	},
	{ label: 'AI engineering', items: ['Claude Code (plugins, agents, skills, MCP)', 'agent workflow design', 'Cursor'] },
	{ label: 'Quality & ops', items: ['Playwright', 'ESLint rule authoring', 'Grafana/Loki/Prometheus', 'ADRs'] },
	{ label: 'Frameworks', items: ['React', 'Svelte', 'Vue', 'Angular', 'Node', 'Express', 'Bun'] },
];

export const resumeEducation: ResumeEducation[] = [
	{ school: 'Oregon State University', degree: 'B.S. Computer Science', year: '2012', note: 'Senior capstone with McAfee' },
];
