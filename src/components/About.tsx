"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Target, Globe } from "lucide-react";

interface AboutContent {
    title: string;
    subtitle: string;
    story: string;
    mission: string;
    stats: {
        value: string;
        label: string;
    }[];
    values: {
        title: string;
        description: string;
    }[];
}

const valueIcons = [Sparkles, Target, Globe];

export default function About() {
    const { language } = useLanguage();
    const content: AboutContent = require(`@/data/content/${language}/about.json`);

    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Background gradient mesh */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-gradient-mesh" />

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center max-w-4xl mx-auto"
                >
                    <h2 className="text-display-2 font-bold mb-4 font-sinhala">
                        <span className="text-gradient">{content.title}</span>
                    </h2>
                    <p className="text-yaksen-red text-xl font-semibold mb-6 uppercase tracking-wider">
                        {content.subtitle}
                    </p>
                </motion.div>

                {/* Story & Mission */}
                <div className="max-w-4xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-3xl p-8 md:p-12 mb-8"
                    >
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-sinhala mb-8">
                            {content.story}
                        </p>
                        <p className="text-lg text-gray-400 leading-relaxed font-sinhala">
                            {content.mission}
                        </p>
                    </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
                >
                    {content.stats.map((stat, index) => (
                        <div
                            key={index}
                            className="glass-panel rounded-2xl p-6 text-center hover:border-yaksen-red/30 transition-colors duration-300"
                        >
                            <div className="text-4xl md:text-5xl font-black text-gradient mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-yaksen-muted font-sinhala">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Values */}
                <div className="grid md:grid-cols-3 gap-8">
                    {content.values.map((value, index) => {
                        const Icon = valueIcons[index];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                viewport={{ once: true }}
                                className="glass-panel rounded-3xl p-8 hover:border-yaksen-red/30 transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yaksen-red/20 to-yaksen-orange/20 border border-yaksen-red/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-7 h-7 text-yaksen-red" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 font-sinhala">
                                    {value.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed font-sinhala">
                                    {value.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
