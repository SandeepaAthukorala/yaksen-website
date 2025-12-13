"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { getFAQContent } from "@/data/lib/content-loader";
import { useLanguage } from "@/context/LanguageContext";

// Rich text formatter for FAQ answers
function formatAnswer(text: string) {
    // Split by newlines and process each line
    const lines = text.split('\\n');

    return lines.map((line, index) => {
        // Check if line is a bullet point
        const isBullet = line.trim().startsWith('*');

        // Remove bullet marker if present
        const cleanLine = isBullet ? line.trim().substring(1).trim() : line;

        // Process bold text (**text**)
        const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
        const formattedParts = parts.map((part, partIndex) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                // Bold text
                return (
                    <strong key={partIndex} className="text-white font-bold">
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return part;
        });

        // Return formatted line
        if (isBullet) {
            return (
                <div key={index} className="flex gap-2 ml-4">
                    <span className="text-yaksen-red mt-1">•</span>
                    <span>{formattedParts}</span>
                </div>
            );
        } else if (cleanLine.trim()) {
            return <p key={index}>{formattedParts}</p>;
        }
        return null;
    }).filter(Boolean);
}

export default function FAQ() {
    const { language } = useLanguage();
    const content = getFAQContent(language);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-20 px-6 bg-white/5">
            <div className="container mx-auto max-w-3xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sinhala">{content.title}</h2>
                    {content.subtitle && (
                        <p className="text-yaksen-muted text-lg font-sinhala">{content.subtitle}</p>
                    )}
                </div>

                <div className="space-y-4">
                    {content.questions.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-white/10 rounded-xl overflow-hidden bg-black/20 hover:border-white/20 transition-colors"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="text-lg font-medium font-sinhala pr-4">{faq.question}</span>
                                {activeIndex === index ? (
                                    <Minus className="text-yaksen-red flex-shrink-0" />
                                ) : (
                                    <Plus className="text-white/50 flex-shrink-0" />
                                )}
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-gray-300 font-sinhala leading-relaxed border-t border-white/5">
                                            <div className="space-y-2">
                                                {formatAnswer(faq.answer)}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
