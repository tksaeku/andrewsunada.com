/** The site area a page belongs to, sent to GA4 as `content_group`. */
export enum SiteArea {
	Home = 'Home',
	Coaching = 'Coaching',
	Software = 'Software',
	Contact = 'Contact',
	Site = 'Site',
	NotFound = 'Not found',
}

export enum AnalyticsEventName {
	PageView = 'page_view',
	GenerateLead = 'generate_lead',
	BookingOpened = 'booking_opened',
	VideoPlay = 'video_play',
	ResumeDownload = 'resume_download',
	AppLinkClick = 'app_link_click',
	ProfileLinkClick = 'profile_link_click',
}

export enum LeadType {
	Coaching = 'coaching',
	Software = 'software',
	General = 'general',
}

export enum LeadMethod {
	ContactForm = 'contact_form',
	Email = 'email',
	Calendly = 'calendly',
}

export enum AppLinkKind {
	Site = 'site',
	Code = 'code',
}

export type AnalyticsParameters = Record<string, string>;

export type AnalyticsEvent = { name: AnalyticsEventName; parameters: AnalyticsParameters };
