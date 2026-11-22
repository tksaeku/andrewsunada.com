export type PageMeta = { path: string; title: string; description: string; breadcrumbLabel: string };

export type JsonLd = { '@context'?: string; '@type': string; [key: string]: unknown };

export type OfferJsonLd = JsonLd & { price: string; priceCurrency: 'USD'; name: string };

export type ServiceJsonLd = JsonLd & { name: string; offers: OfferJsonLd[]; areaServed: JsonLd[] };

export type PersonJsonLd = JsonLd & { name: string; sameAs: string[] };

export type ListItemJsonLd = JsonLd & { position: number; name: string; item: string };

export type BreadcrumbListJsonLd = JsonLd & { itemListElement: ListItemJsonLd[] };

export type VideoObjectJsonLd = JsonLd & { name: string; uploadDate: string };
