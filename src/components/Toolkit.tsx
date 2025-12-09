"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wrench, Sparkles, Code, Palette, Bot, Database, Zap } from "lucide-react";
import { getToolkitContent } from "@/data/lib/content-loader";
import { useLanguage } from "@/context/LanguageContext";
import { GoogleIcon, YaksenIcon, GeminiIcon } from "./icons/TechIcons";
import { SiFigma, SiNextdotjs, SiPython, SiN8N, SiSupabase, SiAffinitydesigner } from "react-icons/si";

// Tool icons mapping
const toolIcons: Record<string, React.ComponentType<any>> = {
    "Figma": SiFigma,
    "Affinity Suite": SiAffinitydesigner,
    "Next.js": SiNextdotjs,
    "Google": GoogleIcon,
    "Yaksen AI": YaksenIcon,
    "Python": SiPython,
    "n8n": SiN8N,
    "Supabase": SiSupabase,
    "Gemini": GeminiIcon,
};

export default function Toolkit() {
    const { language } = useLanguage();
    const content = getToolkitContent(language);

    return (
        <section className="py-16 border-y border-white/5 bg-white/2 overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-2 mb-8"
                >
                    <Wrench className="w-4 h-4 text-yaksen-red" />
                    <p className="text-sm font-medium text-yaksen-muted uppercase tracking-widest">
                        {content.label}
                    </p>
                    <Sparkles className="w-4 h-4 text-yaksen-red" />
                </motion.div>

                {/* Tools Grid */}
                <div className="flex flex-wrap justify-center gap-3">
                    {content.tools.map((tool, index) => {
                        const Icon = toolIcons[tool] || Code;

                        return (
                            <motion.div
                                key={tool}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="group flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl cursor-default transition-all hover:border-yaksen-red/50 hover:bg-yaksen-red/5"
                            >
                                <Icon className="w-4 h-4 text-yaksen-muted group-hover:text-yaksen-red transition-colors" />
                                <span className="text-sm font-medium text-white/90 group-hover:text-white">
                                    {tool}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-8 text-xs text-yaksen-muted font-sinhala"
                >
                    නවතම තාක්ෂණය භාවිතයෙන් ඔබේ ව්‍යාපාරය වේගවත් කරමු
                </motion.p>
            </div>
        </section>
    );
}
