"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ArrowDown } from "lucide-react";
import Link from "next/link";
import { getHeroContent } from "@/data/lib/content-loader";
import { useLanguage } from "@/context/LanguageContext";
import TriangleCanvas from "@/components/TriangleCanvas";

export default function Hero() {
    const { language } = useLanguage();
    const content = getHeroContent(language);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-yaksen-black">
            {/* Background elements would go here, simplified for now */}
            <TriangleCanvas />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yaksen-black/90 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-yaksen-red" />
                        <span className="text-sm text-gray-300">Sri Lanka’s #1 AI-First Studio</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight font-sinhala">
                        {content.headline}
                    </h1>

                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-sinhala">
                        {content.description}
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button
                            onClick={() => document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-8 py-4 bg-yaksen-red text-white text-lg font-bold rounded-lg overflow-hidden transition-all hover:bg-red-600"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                            <span className="relative flex items-center gap-2">
                                {content.ctaText}
                                <ArrowDown className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-500"
            >
                <ArrowDown className="w-6 h-6" />
            </motion.div>
        </section>
    );
}
