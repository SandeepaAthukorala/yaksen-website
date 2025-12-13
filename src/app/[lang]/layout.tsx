import type { Metadata } from "next";
import { Poppins, Noto_Sans_Sinhala } from "next/font/google";
import "../globals.css";
import Cursor from "@/components/Cursor";
import ChatWidget from "@/components/ChatWidget";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const notoSansSinhala = Noto_Sans_Sinhala({
  variable: "--font-noto-sans-sinhala",
  weight: ["400", "500", "600", "700"],
  subsets: ["sinhala"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yaksen.com'),
  title: {
    default: "Yaksen Creative Studio | AI-First Creative Agency",
    template: "%s | Yaksen Creative Studio"
  },
  description: "Sri Lanka's #1 AI-First Creative Studio. We combine Design, Technology, and Strategy to elevate your brand.",
  keywords: ["AI Agency Sri Lanka", "Web Design Sri Lanka", "Creative Studio", "Next.js Developers", "Yaksen Solutions"],
  authors: [{ name: "Yaksen Solutions" }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yaksen.com',
    siteName: 'Yaksen Creative Studio',
    title: 'Yaksen Creative Studio | AI-First Creative Agency',
    description: "Sri Lanka's #1 AI-First Creative Studio. We combine Design, Technology, and Strategy to elevate your brand.",
    images: [
      {
        url: '/og-image.jpg', // Ensure this exists or use a generic one
        width: 1200,
        height: 630,
        alt: 'Yaksen Creative Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yaksen Creative Studio',
    description: "Sri Lanka's #1 AI-First Creative Studio.",
    creator: '@yaksen_studio',
  },
  icons: {
    icon: '/logo.svg',
  },
};

import { LanguageProvider } from "@/context/LanguageContext";
import GeoLanguageDetector from "@/components/GeoLanguageDetector";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Yaksen Solutions',
    url: 'https://yaksen.com',
    logo: 'https://yaksen.com/logo.svg',
    sameAs: [
      'https://www.linkedin.com/company/yaksen',
      'https://facebook.com/yaksen'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+94 76 666 4004',
      contactType: 'customer service',
      areaServed: 'LK',
      availableLanguage: ['en', 'si']
    }
  }

  return (
    <html lang={lang} className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${notoSansSinhala.variable} antialiased bg-yaksen-black text-white font-sans selection:bg-yaksen-red selection:text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider initialLang={lang as 'en' | 'si'}>
          <GeoLanguageDetector />
          <Cursor />
          {children}
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'si' }];
}
