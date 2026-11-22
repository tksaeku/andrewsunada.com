const turnstileScriptUrl = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type TurnstileRenderOptions = {
	sitekey: string;
	callback: (token: string) => void;
	'expired-callback': () => void;
	'error-callback': () => void;
};

type TurnstileApi = {
	render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
	reset: (widgetId: string) => void;
	remove: (widgetId: string) => void;
};

declare global {
	interface Window {
		turnstile?: TurnstileApi;
	}
}

let scriptPromise: Promise<TurnstileApi> | null = null;

const loadTurnstile = (): Promise<TurnstileApi> => {
	if (window.turnstile) {
		return Promise.resolve(window.turnstile);
	}
	if (scriptPromise) {
		return scriptPromise;
	}

	scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
		const script = document.createElement('script');
		script.src = turnstileScriptUrl;
		script.async = true;
		script.addEventListener('load', () => {
			if (window.turnstile) {
				resolve(window.turnstile);
			} else {
				reject(new Error('Turnstile loaded without its API.'));
			}
		});
		script.addEventListener('error', () => {
			script.remove();
			scriptPromise = null;
			reject(new Error('Turnstile failed to load.'));
		});
		document.head.append(script);
	});

	return scriptPromise;
};

export type TurnstileWidget = { reset: () => void; remove: () => void };

/**
 * Renders a Turnstile widget into the container and reports each new token (or '' when it expires).
 */
export const mountTurnstile = async (
	container: HTMLElement,
	siteKey: string,
	onToken: (token: string) => void,
): Promise<TurnstileWidget> => {
	const turnstile = await loadTurnstile();
	const widgetId = turnstile.render(container, {
		sitekey: siteKey,
		callback: onToken,
		'expired-callback': () => {
			onToken('');
		},
		'error-callback': () => {
			onToken('');
		},
	});

	return {
		reset: (): void => {
			onToken('');
			turnstile.reset(widgetId);
		},
		remove: (): void => {
			turnstile.remove(widgetId);
		},
	};
};
