"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { getFAQContent } from "@/data/lib/content-loader";
import { useLanguage } from "@/context/LanguageContext";

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
                            className="border border-white/10 rounded-xl overflow-hidden bg-black/20"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="text-lg font-medium font-sinhala">{faq.question}</span>
                                {activeIndex === index ? (
                                    <Minus className="text-yaksen-red" />
                                ) : (
                                    <Plus className="text-white/50" />
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
                                        <div className="p-6 pt-0 text-yaksen-muted font-sinhala leading-relaxed border-t border-white/5">
                                            {faq.answer}
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
