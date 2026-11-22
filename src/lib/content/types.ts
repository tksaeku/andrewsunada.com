export enum ContactTopic {
	Lesson = 'lesson',
	MonthlyCoaching = 'monthly-coaching',
	Workshop = 'workshop',
	Event = 'event',
	Software = 'software',
	Other = 'other',
}

export type SocialLink = { name: string; url: string };

export type NavigationItem = { label: string; path: string };

export type Rate = { label: string; amountUsd: number; unit: string; note?: string };

export type CoachingOffer = {
	slug: string;
	title: string;
	summary: string;
	details: string[];
	rates: Rate[];
	contactTopic: ContactTopic;
};

export type Venue = { name: string; url: string; schedule: string; locality: string; region: string };

export type Workshop = { slug: string; title: string; level: string; outline: string[] };

export type Drill = { title: string; topic: string; description: string };

export type Video = {
	youtubeId: string;
	title: string;
	event: string;
	year: number;
	uploadedAt: string;
	isFeatured: boolean;
};

export type Placement = { event: string; year: number; division: string; place: number };

export type WsdcRecord = { wsdcId: number; division: string; registryUrl: string; placements: Placement[] };

export type AppProject = {
	slug: string;
	name: string;
	pitch: string;
	stack: string[];
	status: string;
	linkUrl: string;
	linkLabel: string;
};

export type ResumeRole = {
	employer: string;
	title: string;
	start: string;
	end: string;
	location?: string;
	highlights: string[];
};

export type ResumeSkillGroup = { label: string; items: string[] };

export type ResumeEducation = { school: string; degree: string; year: string; note?: string };
