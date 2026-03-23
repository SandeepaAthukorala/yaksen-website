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
    title: "Yaksen",
    description: "Yaksen Creative Studio - Crafting digital experiences with a touch of art and technology.",
    metadataBase: new URL("https://yaksen.com"), // Placeholder, adjust if needed
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Yaksen",
        description: "Yaksen Creative Studio - Crafting digital experiences with a touch of art and technology.",
        url: "https://yaksen.com",
        siteName: "Yaksen",
        images: [
            {
                url: "/opengraph-image.svg",
                width: 1200,
                height: 630,
                alt: "Yaksen Logo",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Yaksen",
        description: "Yaksen Creative Studio",
        images: ["/opengraph-image.svg"],
    },
    icons: {
        icon: "/icon.svg",
        apple: "/apple-icon.png", // We can add this later if needed
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
