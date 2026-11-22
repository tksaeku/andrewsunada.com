import { resumeEducation, resumeLocation, resumePdfPath, resumeRoles, resumeSkills, resumeSummary } from './resume';

describe('resume', () => {
	it('opens with the current role', () => {
		expect(resumeRoles[0]).toMatchObject({ employer: 'Quantum Metric', title: 'Senior Staff Software Engineer' });
	});

	it('shows only the city', () => {
		expect(resumeLocation).toBe('Portland, OR');
	});

	it('links the PDF in static/', () => {
		expect(resumePdfPath).toBe('/andrew-sunada-resume.pdf');
	});

	it('has a summary, skills and education', () => {
		expect(resumeSummary.length).toBeGreaterThan(100);
		expect(resumeSkills.length).toBeGreaterThan(0);
		expect(resumeEducation[0].school).toBe('Oregon State University');
	});

	it('never signals a job search', () => {
		const text = JSON.stringify({ resumeSummary, resumeRoles }).toLowerCase();
		expect(['looking for', 'seeking', 'open to'].some((phrase) => text.includes(phrase))).toBe(false);
	});
});
