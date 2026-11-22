import type { JsonLd } from './types';

/**
 * Serialises structured data for an inline script. Escaping `<` keeps a stray `</script>` in content
 * from closing the tag early; JSON parsers read `<` back as `<`.
 */
export const serializeJsonLd = (data: JsonLd): string => {
	return JSON.stringify(data).replace(/</g, '\\u003c');
};
