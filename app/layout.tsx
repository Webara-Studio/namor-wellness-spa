import type { Metadata } from 'next';
import './globals.css';
import { INSTAGRAM_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './site-config';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: 'en-GH',
      publisher: { '@id': `${SITE_URL}/#spa` },
    },
    {
      '@type': 'DaySpa',
      '@id': `${SITE_URL}/#spa`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      image: `${SITE_URL}/images/hero-lake.jpg`,
      sameAs: [INSTAGRAM_URL],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Akosombo',
        addressCountry: 'GH',
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Namor Wellness Spa in Akosombo, Ghana | Lakeside Wellness',
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Namor Wellness Spa in Akosombo, Ghana',
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    locale: 'en_GH',
    type: 'website',
    images: [{ url: '/images/hero-lake.jpg', width: 576, height: 260, alt: 'Sunset through the trees beside the Volta Lake in Akosombo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Namor Wellness Spa in Akosombo, Ghana',
    description: SITE_DESCRIPTION,
    images: ['/images/hero-lake.jpg'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
