import { drillLibraryEmailUrl, lessonBookingEmailUrl } from '$lib/content/site';
import { ContactTopic } from '$lib/content/types';
import { LeadType, SiteArea } from './types';

const leadTypeByContactTopic: Record<ContactTopic, LeadType> = {
	[ContactTopic.Lesson]: LeadType.Coaching,
	[ContactTopic.MonthlyCoaching]: LeadType.Coaching,
	[ContactTopic.Workshop]: LeadType.Coaching,
	[ContactTopic.Event]: LeadType.Coaching,
	[ContactTopic.Software]: LeadType.Software,
	[ContactTopic.Other]: LeadType.General,
};

/**
 * Returns the `subject` of a `mailto:` link, or an empty string when it has none or is not a mailto link.
 */
export const getEmailSubject = (mailtoUrl: string): string => {
	try {
		return new URL(mailtoUrl).searchParams.get('subject')?.trim() ?? '';
	} catch {
		return '';
	}
};

const coachingEmailSubjects = [lessonBookingEmailUrl, drillLibraryEmailUrl].map(getEmailSubject);

export const getContactLeadType = (topic: ContactTopic | ''): LeadType => {
	return topic === '' ? LeadType.General : leadTypeByContactTopic[topic];
};

const getSiteAreaLeadType = (siteArea: SiteArea): LeadType => {
	if (siteArea === SiteArea.Coaching) {
		return LeadType.Coaching;
	}
	if (siteArea === SiteArea.Software) {
		return LeadType.Software;
	}
	return LeadType.General;
};

/**
 * A subject written for a coaching link marks a coaching lead wherever it is clicked; any other email
 * link takes its lead type from the area of the page it was clicked on.
 */
export const getEmailLeadType = (subject: string, siteArea: SiteArea): LeadType => {
	if (coachingEmailSubjects.includes(subject)) {
		return LeadType.Coaching;
	}
	return getSiteAreaLeadType(siteArea);
};
