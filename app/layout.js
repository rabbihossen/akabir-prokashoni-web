import './globals.css';
import { CartProvider } from '@/lib/CartContext';
import { AuthProvider } from '@/lib/AuthContext';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

export const metadata = {
  metadataBase: new URL('https://akabirprokashoni.com'),
  title: {
    default: 'আকাবির প্রকাশনী — বাংলাদেশের বিশ্বস্ত অনলাইন বুকশপ',
    template: '%s | আকাবির প্রকাশনী',
  },
  description: 'আকাবির প্রকাশনী বাংলাদেশের অন্যতম সেরা অনলাইন বই বিক্রির ওয়েবসাইট। ইসলামিক, সাহিত্য, শিশু-কিশোর, আত্ম-উন্নয়নসহ সকল ধরনের বই পাওয়া যায়।',
  keywords: ['বই', 'অনলাইন বুকশপ', 'বাংলা বই', 'ইসলামিক বই', 'বই কিনুন', 'আকাবির প্রকাশনী', 'বাংলাদেশ'],
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: 'https://akabirprokashoni.com',
    siteName: 'আকাবির প্রকাশনী',
  },
};

export default function RootLayout({ children }) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Akabir Prokashoni',
    url: 'https://akabirprokashoni.com',
    logo: 'https://akabirprokashoni.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+8801718763978',
      contactType: 'customer service',
      areaServed: 'BD',
      availableLanguage: ['Bengali', 'English']
    },
    sameAs: [
      'https://www.facebook.com/akabirprokashoni',
    ]
  };

  return (
    <html lang="bn">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <AuthProvider>
          <CartProvider>
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
