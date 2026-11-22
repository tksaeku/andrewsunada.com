<script lang="ts">
	import ArrowLink from '$lib/components/ArrowLink/ArrowLink.svelte';
	import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
	import {
		resumeEducation, resumeHeadline, resumeLocation, resumePdfPath, resumeRoles, resumeSkills, resumeSummary,
	} from '$lib/content/resume';
	import { contactEmail, githubProfileUrl } from '$lib/content/site';
	import type { ResumeRole } from '$lib/content/types';

	type EmployerGroup = { employer: string; location: string; roles: ResumeRole[] };

	const employerGroups = resumeRoles.reduce<EmployerGroup[]>((groups, role) => {
		const previous = groups.at(-1);
		if (previous && previous.employer === role.employer) {
			return [...groups.slice(0, -1), { ...previous, roles: [...previous.roles, role] }];
		}
		return [...groups, { employer: role.employer, location: role.location ?? '', roles: [role] }];
	}, []);
</script>

<PageHeader label={resumeLocation} headline="Resume">
	<p class="headline">{resumeHeadline}</p>
	{#snippet actions()}
		<a class="download" href={resumePdfPath} download>Download PDF</a>
		<ArrowLink href="mailto:{contactEmail}">{contactEmail}</ArrowLink>
		<ArrowLink href={githubProfileUrl}>GitHub</ArrowLink>
	{/snippet}
</PageHeader>

<div class="resume">
	<section class="block" aria-labelledby="summary-heading">
		<h2 id="summary-heading" class="block-heading">Summary</h2>
		<p class="summary">{resumeSummary}</p>
	</section>

	<section class="block" aria-labelledby="experience-heading">
		<h2 id="experience-heading" class="block-heading">Experience</h2>
		<div class="entries">
			{#each employerGroups as group (`${group.employer}-${group.roles[0].start}`)}
				<article class="employer">
					<h3 class="employer-name">
						{group.employer}
						{#if group.location}
							<span class="employer-location">· {group.location}</span>
						{/if}
					</h3>
					{#each group.roles as role (`${role.title}-${role.start}`)}
						<div class="role">
							<p class="dates">{role.start} – {role.end}</p>
							<div class="role-body">
								<h4 class="role-title">{role.title}</h4>
								<ul>
									{#each role.highlights as highlight (highlight)}
										<li>{highlight}</li>
									{/each}
								</ul>
							</div>
						</div>
					{/each}
				</article>
			{/each}
		</div>
	</section>

	<section class="block" aria-labelledby="skills-heading">
		<h2 id="skills-heading" class="block-heading">Skills</h2>
		<dl class="skills">
			{#each resumeSkills as group (group.label)}
				<div class="skill-row">
					<dt>{group.label}</dt>
					<dd>{group.items.join(', ')}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<section class="block" aria-labelledby="education-heading">
		<h2 id="education-heading" class="block-heading">Education</h2>
		{#each resumeEducation as education (education.school)}
			<div class="role">
				<p class="dates">{education.year}</p>
				<div class="role-body">
					<h3 class="role-title">{education.school}</h3>
					<p>{education.degree}{education.note ? ` · ${education.note}` : ''}</p>
				</div>
			</div>
		{/each}
	</section>
</div>

<style lang="scss">
	@use 'tokens' as *;
	@use 'mixins' as *;

	.headline {
		color: $usuzumi;
	}

	.download {
		@include small-label;
		display: inline-flex;
		align-items: center;
		min-height: 3rem;
		padding: 0.9rem 1.6rem;
		background: $shu;
		color: $paper;
		text-decoration: none;

		&:hover {
			background: $sumi;
			color: $paper;
		}
	}

	.resume {
		@include page-container;
		padding-bottom: clamp(3rem, 8vw, 6rem);
	}

	.block {
		@include label-gutter;
		padding-block: 2.5rem;
		border-top: 1px solid $hairline;
	}

	.block-heading {
		@include small-label;
		padding-top: 0.35rem;
		color: $shu;
		font-family: $font-body;
		font-size: 0.75rem;
	}

	.summary {
		max-width: 44rem;
		font-size: 1.0625rem;
	}

	.entries {
		display: grid;
		gap: 2.5rem;
	}

	.employer {
		display: grid;
		gap: 1.25rem;
	}

	.employer-name {
		font-size: 1.6rem;
	}

	.employer-location {
		color: $usuzumi;
		font-family: $font-body;
		font-size: 0.875rem;
	}

	.role {
		display: grid;
		gap: 0.4rem 1.5rem;

		@media (min-width: $narrow) {
			grid-template-columns: 8rem 1fr;
		}
	}

	.dates {
		@include small-label;
		padding-top: 0.3rem;
		color: $usuzumi;
		font-size: 0.6875rem;
		font-weight: 500;
	}

	.role-body {
		display: grid;
		gap: 0.5rem;
		min-width: 0;

		ul {
			display: grid;
			gap: 0.45rem;
			margin: 0;
			padding-left: 1.1rem;
			color: $usuzumi;
			font-size: 0.9375rem;
		}

		p {
			color: $usuzumi;
		}
	}

	.role-title {
		font-family: $font-body;
		font-size: 1rem;
		font-weight: 600;
	}

	.skills {
		display: grid;
		gap: 0;
		margin: 0;
	}

	.skill-row {
		display: grid;
		gap: 0.25rem 1.5rem;
		padding-block: 0.75rem;
		border-bottom: 1px solid $hairline;

		@media (min-width: $narrow) {
			grid-template-columns: 8rem 1fr;
		}
	}

	dt {
		@include small-label;
		padding-top: 0.2rem;
		font-size: 0.6875rem;
	}

	dd {
		margin: 0;
		color: $usuzumi;
		font-size: 0.9375rem;
	}
</style>
