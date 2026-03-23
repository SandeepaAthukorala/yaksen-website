import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const notoSansSinhala = Noto_Sans_Sinhala({
    variable: "--font-noto-sans-sinhala",
    subsets: ["sinhala"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Yaksen Creative Studio | AI-Powered Web Design, Branding & Marketing in Sri Lanka",
    description: "Yaksen builds AI-powered websites, brands, and marketing systems for Sri Lankan businesses. 25+ systems deployed. Get a free strategy call today.",
    metadataBase: new URL("https://yaksen.cloud"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Yaksen Creative Studio | AI-First Digital Agency in Sri Lanka",
        description: "Transform your business with AI-powered web design, branding, and digital marketing. Based in Kurunegala, serving all of Sri Lanka.",
        url: "https://yaksen.cloud",
        siteName: "Yaksen Creative Studio",
        images: [
            {
                url: "/og-image.svg",
                width: 1200,
                height: 630,
                alt: "Yaksen Creative Studio",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Yaksen Creative Studio | AI-First Digital Agency",
        description: "AI-powered web design, branding, and digital marketing for Sri Lankan businesses.",
        creator: "@yaksenstudio",
        images: ["/og-image.svg"],
    },
    icons: {
        icon: [
            { url: "/logo.svg?v=2", type: "image/svg+xml" },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${notoSansSinhala.variable}`}
            suppressHydrationWarning
        >
            <body className="antialiased">{children}</body>
        </html>
    );
}
