import type { Metadata } from "next";
import { Poppins, Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";
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
  title: "Yaksen Creative Studio | AI-First Creative Agency",
  description: "Sri Lanka's #1 AI-First Creative Studio. We combine Design, Technology, and Strategy to elevate your brand.",
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${notoSansSinhala.variable} antialiased bg-yaksen-black text-white font-sans selection:bg-yaksen-red selection:text-white`}
      >
        <Cursor />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
