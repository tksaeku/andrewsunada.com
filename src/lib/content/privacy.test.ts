import * as apps from './apps';
import * as coaching from './coaching';
import * as drills from './drills';
import * as resume from './resume';
import * as site from './site';
import * as videos from './videos';
import * as wsdc from './wsdc';

const modules = { apps, coaching, drills, resume, site, videos, wsdc };

describe('public content', () => {
	it.each(Object.entries(modules))('%s never names the old accounts', (_name, contentModule) => {
		const text = JSON.stringify(contentModule);
		expect(text).not.toContain('samuraijs');
		expect(text).not.toContain('SwingCoder911');
	});

	it.each(Object.entries(modules))('%s prints no email but the domain address', (_name, contentModule) => {
		const addresses = JSON.stringify(contentModule).match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? [];
		expect(addresses.every((address) => address === 'andrew@andrewsunada.com')).toBe(true);
	});
});
