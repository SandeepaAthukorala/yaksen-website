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
            {/* Triangle Canvas Background */}
            <TriangleCanvas />

            {/* Gradient Mesh Overlay */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(at 40% 20%, rgba(102, 126, 234, 0.2) 0px, transparent 50%),
                        radial-gradient(at 80% 0%, rgba(241, 72, 53, 0.2) 0px, transparent 50%),
                        radial-gradient(at 0% 80%, rgba(0, 217, 255, 0.15) 0px, transparent 50%)
                    `
                }}
            />

            {/* Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-yaksen-black/90 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel mb-10 group hover:bg-white/10 transition-all duration-300 animate-border-glow"
                    >
                        <Sparkles className="w-4 h-4 text-yaksen-red animate-float" />
                        <span className="text-sm text-gray-300 font-medium">Sri Lanka's #1 AI-First Studio</span>
                        <div className="w-2 h-2 rounded-full bg-yaksen-red animate-glow-pulse" />
                    </motion.div>

                    {/* Headline with enhanced typography */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-display-1 font-bold text-white mb-8 leading-none font-sinhala"
                    >
                        {content.headline}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-sinhala"
                    >
                        {content.description}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6"
                    >
                        <button
                            onClick={() => document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-10 py-5 bg-gradient-to-r from-yaksen-red to-yaksen-orange text-white text-lg font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-yaksen-red/50 hover:scale-105"
                        >
                            {/* Animated gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-yaksen-purple to-yaksen-red opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Shimmer effect */}
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

                            <span className="relative flex items-center gap-3">
                                {content.ctaText}
                                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                            </span>
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Enhanced Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2 glass-panel px-4 py-3 rounded-full">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Scroll</span>
                    <ArrowDown className="w-4 h-4 text-yaksen-red" />
                </div>
            </motion.div>
        </section>
    );
}
