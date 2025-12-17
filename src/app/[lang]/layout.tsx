import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Sinhala } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import GeoLanguageDetector from "@/components/GeoLanguageDetector";
import Script from 'next/script';
import CookieConsent from "@/components/CookieConsent";
import ScrollProgress from "@/components/ScrollProgress";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const notoSansSinhala = Noto_Sans_Sinhala({
  variable: "--font-noto-sans-sinhala",
  subsets: ["sinhala"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
  preload: true,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang;

  const titles = {
    en: "Yaksen - Sri Lanka's AI-First Digital Agency",
    si: "යක්සෙන් - ශ්‍රී ලංකාවේ AI-First ඩිජිටල් ඒජන්සිය"
  };

  const descriptions = {
    en: "Transform your business with AI-powered solutions. We build intelligent websites, automate workflows, and create data-driven digital experiences.",
    si: "AI බලයෙන් ඔබේ ව්‍යාපාරය පරිවර්තනය කරන්න. අපි බුද්ධිමත් වෙබ් අඩවි තනන්නෙමු, කාර්ය ප්‍රවාහ ස්වයංක්‍රීය කරන්නෙමු සහ දත්ත මත පදනම් වූ ඩිජිටල් අත්දැකීම් නිර්මාණය කරන්නෙමු."
  };

  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
    metadataBase: new URL('https://yaksen.cloud'),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'si': '/si',
      },
    },
    openGraph: {
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      url: `https://yaksen.cloud/${lang}`,
      siteName: 'Yaksen Creative Studio',
      images: [{
        url: '/og-image.webp',
        width: 1200,
        height: 630,
      }],
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      creator: '@yaksenstudio',
      images: ['/og-image.webp'],
    },
    icons: {
      icon: '/logo.svg',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const lang = (await params).lang;

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} ${notoSansSinhala.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        {/* Preload critical assets */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        <LanguageProvider initialLang={lang as "en" | "si"}>
          <JsonLd />
          <ScrollProgress />
          <GeoLanguageDetector />
          {children}
        </LanguageProvider>

        {/* Load analytics and external scripts after page load */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"
        />
        <CookieConsent />
      </body>
    </html>
  );
}
