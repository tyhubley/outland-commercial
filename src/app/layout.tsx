import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://outlandmanagement.com'),
  title: {
    default: 'Premium Landscaping & Lawn Care Services | OUTLAND Commercial',
    template: '%s',
  },
  description: "Transform your landscape with expert lawn care & landscaping services in Waukesha County. Trust OUTLAND Commercial's premier services. Contact us today!",
  openGraph: {
    type: 'website',
    siteName: 'OUTLAND Commercial',
    images: ['/images/image_67c9dd40432c4764167caac0.jpg'],
  },
  icons: { icon: '/google-g-logo.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
