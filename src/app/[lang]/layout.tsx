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
    en: "Yaksen | AI-Powered Web Design, Branding & Digital Marketing in Sri Lanka",
    si: "යක්සෙන් | AI බලයෙන් වෙබ් නිර්මාණය, සන්නාමකරණය සහ ඩිජිටල් අලෙවිකරණය - ශ්‍රී ලංකාව"
  };

  const descriptions = {
    en: "Yaksen builds AI-powered websites, brands, and marketing systems for Sri Lankan businesses. 25+ systems deployed. Based in Kurunegala. Get a free strategy call today.",
    si: "AI බලයෙන් ශ්‍රී ලාංකික ව්‍යාපාර සඳහා වෙබ් අඩවි, සන්නාම සහ අලෙවිකරණ පද්ධති තනන්නෙමු. පද්ධති 25+ ක් යොදවා ඇත. අද නොමිලේ උපාය මාර්ග ඇමතුමක් ලබා ගන්න."
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
    manifest: '/manifest.json',
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const lang = (await params).lang;

  return (
    <LanguageProvider initialLang={lang as "en" | "si"}>
      <JsonLd />
      <ScrollProgress />
      <GeoLanguageDetector />
      {children}

      {/* Load analytics and external scripts after page load */}
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-placeholder"
      />
      <CookieConsent />
    </LanguageProvider>
  );
}
