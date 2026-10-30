import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://namor-wellness-spa.vercel.app'),
  title: 'Namor Wellness Spa | Lakeside wellness in Akosombo, Ghana',
  description: 'Step away, slow down and reconnect at Namor Wellness Spa in Akosombo, Ghana. Discover lakeside serenity, restorative rituals and warm hospitality.',
  openGraph: { title: 'Namor Wellness Spa — A softer pace by the lake', description: 'A lakeside pause in Akosombo, Ghana.', type: 'website', images: [{ url: '/images/hero-lake.jpg', width: 576, height: 260, alt: 'Sunset through the trees beside the Volta Lake in Akosombo' }] },
  twitter: { card: 'summary_large_image', title: 'Namor Wellness Spa | Akosombo, Ghana', description: 'A lakeside pause in Akosombo, Ghana.', images: ['/images/hero-lake.jpg'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
