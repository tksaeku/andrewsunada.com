declare global {
	namespace App {
		interface PageData {
			structuredData?: import('$lib/seo/types').JsonLd[];
		}
	}

	interface ImportMetaEnv {
		readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
		readonly PUBLIC_CONTACT_FORM_ENDPOINT?: string;
		readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
	}

	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}
}

export {};
