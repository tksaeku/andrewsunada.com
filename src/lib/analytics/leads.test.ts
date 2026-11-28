import { ContactTopic } from '$lib/content/types';
import { getContactLeadType, getEmailLeadType, getEmailSubject } from './leads';
import { LeadType, SiteArea } from './types';

describe('getContactLeadType', () => {
	it('counts lesson, coaching, workshop and event enquiries as coaching', () => {
		[ContactTopic.Lesson, ContactTopic.MonthlyCoaching, ContactTopic.Workshop, ContactTopic.Event].forEach((topic) => {
			expect(getContactLeadType(topic)).toBe(LeadType.Coaching);
		});
	});

	it('counts software enquiries as software', () => {
		expect(getContactLeadType(ContactTopic.Software)).toBe(LeadType.Software);
	});

	it('counts other or no topic as general', () => {
		expect(getContactLeadType(ContactTopic.Other)).toBe(LeadType.General);
		expect(getContactLeadType('')).toBe(LeadType.General);
	});
});

describe('getEmailSubject', () => {
	it('reads and decodes the subject', () => {
		expect(getEmailSubject('mailto:andrew@andrewsunada.com?subject=Book%20a%20lesson')).toBe('Book a lesson');
	});

	it('returns an empty string without a subject', () => {
		expect(getEmailSubject('mailto:andrew@andrewsunada.com')).toBe('');
		expect(getEmailSubject('not a url')).toBe('');
	});
});

describe('getEmailLeadType', () => {
	it('counts the coaching link subjects as coaching on any page', () => {
		expect(getEmailLeadType('Book a lesson', SiteArea.Software)).toBe(LeadType.Coaching);
		expect(getEmailLeadType('Your drill library', SiteArea.Home)).toBe(LeadType.Coaching);
	});

	it('takes any other email lead type from the page area', () => {
		expect(getEmailLeadType('', SiteArea.Coaching)).toBe(LeadType.Coaching);
		expect(getEmailLeadType('', SiteArea.Software)).toBe(LeadType.Software);
		[SiteArea.Home, SiteArea.Contact, SiteArea.Site, SiteArea.NotFound].forEach((siteArea) => {
			expect(getEmailLeadType('Hello', siteArea)).toBe(LeadType.General);
		});
	});
});
