"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail } from "lucide-react";
import Link from "next/link";

import { getContactContent } from "@/data/lib/content-loader";

export default function Contact() {
    const contact = getContactContent();

    return (
        <section id="contact" className="py-20 px-6">
            <div className="container mx-auto max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sinhala">වැඩේ පටන් ගමුද?</h2>
                        <p className="text-yaksen-muted mb-8 text-lg font-sinhala">
                            තවත් කල් දාන්න එපා. අදම Yaksen එක්ක එකතු වෙලා ඔබේ ව්‍යාපාරය Brand එකක් කරන්න.
                        </p>

                        <div className="space-y-6">
                            <Link
                                href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                className="flex items-center gap-4 p-4 border border-white/10 rounded-xl hover:border-yaksen-red/50 hover:bg-white/5 transition-all group"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-yaksen-red/20 transition-colors">
                                    <Phone className="text-white group-hover:text-yaksen-red" />
                                </div>
                                <div>
                                    <p className="text-sm text-yaksen-muted">WhatsApp</p>
                                    <p className="text-lg font-bold">{contact.phone}</p>
                                </div>
                            </Link>

                            <Link
                                href={`mailto:${contact.email}`}
                                className="flex items-center gap-4 p-4 border border-white/10 rounded-xl hover:border-yaksen-red/50 hover:bg-white/5 transition-all group"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-yaksen-red/20 transition-colors">
                                    <Mail className="text-white group-hover:text-yaksen-red" />
                                </div>
                                <div>
                                    <p className="text-sm text-yaksen-muted">Email</p>
                                    <p className="text-lg font-bold">{contact.email}</p>
                                </div>
                            </Link>

                            <div className="flex gap-4 mt-6">
                                {contact.social_links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        className="text-yaksen-muted hover:text-yaksen-red transition-colors text-sm font-medium border-b border-white/10 hover:border-yaksen-red pb-1"
                                    >
                                        {link.platform}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-4 bg-white/5 p-8 rounded-2xl border border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-yaksen-muted">නම</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-yaksen-red transition-colors"
                                    placeholder="ඔබේ නම"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-yaksen-muted">දුරකථන අංකය</label>
                                <input
                                    type="tel"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-yaksen-red transition-colors"
                                    placeholder="+94 7..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-yaksen-muted">ව්‍යාපාරයේ නම</label>
                            <input
                                type="text"
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-yaksen-red transition-colors"
                                placeholder="Brand එකේ නම..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-yaksen-muted">ඔබට අවශ්‍ය දේ?</label>
                            <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-yaksen-red transition-colors text-white">
                                <option>Brand එකක් හදාගන්න (Branding)</option>
                                <option>Website / System එකක් (Web & Systems)</option>
                                <option>Marketing / Social Media (Growth)</option>
                                <option>වැඩ ලේසි කරගන්න (Automation)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-yaksen-muted">පණිවිඩය</label>
                            <textarea
                                rows={4}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-yaksen-red transition-colors"
                                placeholder="මට අවශ්‍ය වෙබ් අඩවියක් නිර්මාණය කරගන්න..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-yaksen-red text-white font-bold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                        >
                            පණිවිඩය යවන්න <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
