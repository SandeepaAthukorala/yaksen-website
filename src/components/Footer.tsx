"use client";

import React from "react";
import { getContactContent } from "@/data/lib/content-loader";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Footer() {
    const { language } = useLanguage();
    const contact = getContactContent(language);

    return (
        <footer className="py-12 border-t border-white/10 bg-black/80 backdrop-blur-xl text-center text-sm text-yaksen-muted relative z-10">
            <div className="container mx-auto px-6 space-y-4">
                {/* Location Badge */}
                <div className="flex justify-center mb-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-sm font-medium text-white">Sri Lanka</span>
                    </div>
                </div>

                <p className="mb-2">
                    Sri Lanka's AI-First Agency. Built with <span className="text-yaksen-red">❤️</span> & Next.js.
                </p>

                <div className="flex justify-center gap-4 text-xs text-yaksen-muted items-center flex-wrap">
                    <p>{contact.footer_rights}</p>
                    <Link href="/privacy" className="hover:text-white transition-colors">{contact.footer_privacy}</Link>
                    <span className="hidden md:inline text-white/10">|</span>
                    {contact.social_links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url}
                            target="_blank"
                            className="hover:text-white transition-colors"
                        >
                            {link.platform}
                        </Link>
                    ))}
                </div>

                {/* Copyright */}
                <p className="text-xs text-gray-500 pt-4">
                    © 2025 Yaksen. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
