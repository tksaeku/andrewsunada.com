import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const workflow = readFileSync(join(process.cwd(), '.github/workflows/ci.yml'), 'utf8');
const appTypes = readFileSync(join(process.cwd(), 'src/app.d.ts'), 'utf8');
const publicVariableNames = [...appTypes.matchAll(/readonly (PUBLIC_\w+)\?: string;/g)].map(([, name]) => name);

describe('deploy workflow', () => {
	it('never deletes host-managed files in the web directory', () => {
		const rsyncCommand = workflow.slice(workflow.indexOf('rsync -'));
		expect(rsyncCommand).toContain('--delete');
		expect(rsyncCommand).toContain("--exclude='.well-known/'");
	});

	it('passes every public build variable from the repository variables of the same name', () => {
		expect(publicVariableNames).toContain('PUBLIC_GA_MEASUREMENT_ID');
		publicVariableNames.forEach((name) => {
			expect(workflow).toContain(`${name}: \${{ vars.${name} }}`);
		});
	});
});
