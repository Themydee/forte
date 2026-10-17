import type { Metadata, Viewport } from 'next';
import '../styles.css';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://forteexperiences.com'),
  title: {
    default: 'FORTÉ — Corporate Events & Experiences',
    template: '%s | FORTÉ',
  },
  description:
    'FORTÉ turns an organisation’s brief into a polished, purposeful and memorable experience. Conferences, dinners, launches, activations and corporate events.',
  keywords: [
    'corporate events',
    'conferences',
    'gala dinners',
    'product launches',
    'brand activations',
    'event production London',
    'FORTÉ experiences',
  ],
  authors: [{ name: 'FORTÉ Experiences' }],
  creator: 'FORTÉ Experiences',
  publisher: 'FORTÉ Experiences',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://forteexperiences.com',
    siteName: 'FORTÉ Experiences',
    title: 'FORTÉ — Corporate Events & Experiences',
    description:
      'Corporate events and experiences, planned with purpose and delivered without a hitch. Give us the brief. We handle the rest.',
    images: [
      {
        url: '/images/forte-gala-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'FORTÉ Corporate Event Gala',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FORTÉ — Corporate Events & Experiences',
    description:
      'Corporate events and experiences, planned with purpose and delivered without a hitch.',
    images: ['/images/forte-gala-hero.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [{ url: '/favicon.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'FORTÉ Experiences',
    image: 'https://forteexperiences.com/images/forte-gala-hero.jpg',
    '@id': 'https://forteexperiences.com',
    url: 'https://forteexperiences.com',
    telephone: '+15551234567',
    priceRange: '$$$$',
    sameAs: ['https://www.instagram.com/forteexperiences/'],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-black antialiased selection:bg-black selection:text-white overflow-x-hidden min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
