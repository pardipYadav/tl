import type { Metadata } from 'next';

export const SITE_NAME = 'Divine Simparna Holidays';
export const LEGAL_NAME = 'Divine Simparna Pvt. Ltd.';
export const SITE_TAGLINE = 'Premium Tour & Travel · Import · Export';
export const SUPPORT_PHONE = '+91 82848 79420';
export const SUPPORT_PHONE_E164 = '+918284879420';
export const SUPPORT_EMAIL = 'info@divinesimparna.com';
export const GSTIN = '06AAMCD0334P1ZF';
export const CIN = 'U52291HR2025PTC136386';
export const DEFAULT_OG_IMAGE = '/logo.png';

/** Production site URL. Set NEXT_PUBLIC_SITE_URL in env (no trailing slash). */
export function getSiteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.NEXTAUTH_URL ||
    'https://divinesimparna.com';

  return fromEnv.replace(/\/$/, '');
}

export function absoluteUrl(path = '/'): string {
  const base = getSiteUrl();
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export const TRAVEL_KEYWORDS = [
  'tour packages',
  'holiday packages India',
  'international tour packages',
  'Dubai tour package',
  'Bali honeymoon package',
  'Thailand holiday package',
  'Maldives vacation',
  'Europe tour from India',
  'Goa holiday package',
  'Himachal tour package',
  'travel agency India',
  'best travel company Haryana',
  'Divine Simparna Holidays',
  'book tour online',
  'family holiday packages',
  'luxury travel packages'
];

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string | null;
  keywords?: string[];
  type?: 'website' | 'article';
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  keywords = TRAVEL_KEYWORDS,
  type = 'website',
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image?.startsWith('http') ? image : absoluteUrl(image || DEFAULT_OG_IMAGE);
  // Page title only — root layout applies `title.template` (`%s | Divine Simparna Holidays`)
  const pageTitle = title;
  const socialTitle =
    title.includes(SITE_NAME) || title.includes('Divine Simparna')
      ? title
      : `${title} | ${SITE_NAME}`;

  return {
    title: pageTitle,
    description,
    keywords,
    authors: authors?.map((name) => ({ name })),
    creator: LEGAL_NAME,
    publisher: LEGAL_NAME,
    category: 'travel',
    alternates: {
      canonical: url
    },
    openGraph: {
      type,
      locale: 'en_IN',
      url,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: socialTitle
        }
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {})
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [ogImage]
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1
          }
        }
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'Organization'],
    '@id': `${getSiteUrl()}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: getSiteUrl(),
    logo: absoluteUrl('/logo.png'),
    image: absoluteUrl('/logo.png'),
    description:
      'Premium tour and travel packages for domestic and international destinations, plus import-export logistics services.',
    email: SUPPORT_EMAIL,
    telephone: SUPPORT_PHONE,
    taxID: GSTIN,
    identifier: CIN,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Haryana'
    },
    areaServed: ['IN', 'AE', 'ID', 'TH', 'MV', 'EU'],
    priceRange: '₹₹₹',
    sameAs: [] as string[]
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${getSiteUrl()}/#website`,
    url: getSiteUrl(),
    name: SITE_NAME,
    description: SITE_TAGLINE,
    publisher: { '@id': `${getSiteUrl()}/#organization` },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${getSiteUrl()}/packages?destination={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export type PackageSchemaInput = {
  title: string;
  description: string;
  slug: string;
  image: string;
  destination: string;
  priceINR: number;
  rating?: number;
  reviewsCount?: number;
  durationDays?: number;
  faq?: Array<{ q: string; a: string }>;
};

export function tourPackageSchema(pkg: PackageSchemaInput) {
  const url = absoluteUrl(`/packages/${pkg.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pkg.title,
    description: pkg.description,
    image: [pkg.image],
    sku: pkg.slug,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME
    },
    category: 'TravelPackage',
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'INR',
      price: pkg.priceINR,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${getSiteUrl()}/#organization` }
    },
    ...(pkg.rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: pkg.rating,
            reviewCount: pkg.reviewsCount || 1,
            bestRating: 5,
            worstRating: 1
          }
        }
      : {}),
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Destination',
        value: pkg.destination
      },
      ...(pkg.durationDays
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Duration',
              value: `${pkg.durationDays} days`
            }
          ]
        : [])
    ]
  };
}

export function faqSchema(faq: Array<{ q: string; a: string }>) {
  if (!faq?.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  slug: string;
  image: string;
  author: string;
  publishedAt: string;
  modifiedAt?: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    image: [input.image],
    author: {
      '@type': 'Person',
      name: input.author
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.png')
      }
    },
    datePublished: input.publishedAt,
    dateModified: input.modifiedAt || input.publishedAt,
    mainEntityOfPage: absoluteUrl(`/blog/${input.slug}`),
    keywords: input.tags?.join(', ')
  };
}

export function destinationSchema(input: {
  name: string;
  slug: string;
  country: string;
  description: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: input.name,
    description: input.description,
    url: absoluteUrl(`/destinations/${input.slug}`),
    image: input.image,
    touristType: ['Leisure travelers', 'Families', 'Honeymoon couples'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: input.country
    }
  };
}
