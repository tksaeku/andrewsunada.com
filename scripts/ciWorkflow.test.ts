import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const workflow = readFileSync(join(process.cwd(), '.github/workflows/ci.yml'), 'utf8');

describe('deploy workflow', () => {
	it('never deletes host-managed files in the web directory', () => {
		const rsyncCommand = workflow.slice(workflow.indexOf('rsync -'));
		expect(rsyncCommand).toContain('--delete');
		expect(rsyncCommand).toContain("--exclude='.well-known/'");
	});
});
