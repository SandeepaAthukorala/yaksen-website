"use client";

import React from "react";

import { getContactContent } from "@/data/lib/content-loader";
import Link from "next/link";

export default function Footer() {
    const contact = getContactContent();

    return (
        <footer className="py-8 border-t border-white/5 bg-black text-center text-sm text-yaksen-muted">
            <div className="container mx-auto px-6">
                <p className="mb-2">
                    Sri Lanka's AI-First Agency. Built with <span className="text-yaksen-red">❤️</span> & Next.js.
                </p>
                <div className="flex justify-center gap-4 text-xs text-yaksen-muted items-center flex-wrap">
                    <p>© 2025 Yaksen Studio. All Rights Reserved.</p>
                    <Link href="/privacy" className="hover:text-white transition-colors">පෞද්ගලිකත්ව ප්‍රතිපත්තිය</Link>
                    <span className="text-white/10">|</span>
                    <Link href="/privacy" className="hover:text-white transition-colors">නියමයන්</Link>
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
            </div>
        </footer>
    );
}
