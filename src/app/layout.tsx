import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { organizationSchema, websiteSchema, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Premium Landscaping & Lawn Care Services | OUTLAND Commercial',
    template: '%s',
  },
  description: "Transform your landscape with expert lawn care & landscaping services in Waukesha County. Trust OUTLAND Commercial's premier services. Contact us today!",
  keywords: [
    'landscaping Waukesha County', 'lawn care Waukesha', 'snow removal Waukesha',
    'commercial landscaping Wisconsin', 'residential landscaping', 'tree care',
    'fertilization services', 'patio installation', 'landscape maintenance',
    'OUTLAND Commercial', 'Waukesha landscaper',
  ],
  authors: [{ name: 'OUTLAND Commercial' }],
  creator: 'OUTLAND Commercial',
  publisher: 'OUTLAND Commercial',
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'OUTLAND Commercial',
    title: 'Premium Landscaping & Lawn Care Services | OUTLAND Commercial',
    description: "Transform your landscape with expert lawn care & landscaping services in Waukesha County. Trust OUTLAND Commercial's premier services. Contact us today!",
    images: [
      {
        url: '/images/image_67c9dd40432c4764167caac0.jpg',
        width: 1920,
        height: 1080,
        alt: 'OUTLAND Commercial — Premium landscaping in Waukesha County',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Landscaping & Lawn Care Services | OUTLAND Commercial',
    description: 'Expert lawn care, landscaping, and snow removal across Waukesha County, WI.',
    images: ['/images/image_67c9dd40432c4764167caac0.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.webp', type: 'image/webp' },
    ],
    apple: '/logo.webp',
    shortcut: '/favicon.svg',
  },
  verification: {
    // google: 'google-site-verification-token-here',
  },
  category: 'Landscaping Services',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
