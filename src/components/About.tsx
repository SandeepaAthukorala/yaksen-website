"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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

// Rich text formatter for About content
function formatRichText(text: string) {
    return text.split('\n').map((line, lineIndex) => {
        // Handle bullet points
        if (line.trim().startsWith('- ')) {
            const bulletText = line.trim().substring(2);
            const parts = bulletText.split(/(\*\*.*?\*\*)/).filter(Boolean);

            return (
                <li key={lineIndex} className="ml-4">
                    {parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                        }
                        return <span key={i}>{part}</span>;
                    })}
                </li>
            );
        }

        // Handle bold text
        const parts = line.split(/(\*\*.*?\*\*)/).filter(Boolean);

        return (
            <span key={lineIndex}>
                {parts.map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                    }
                    return <span key={i}>{part}</span>;
                })}
                {lineIndex < text.split('\n').length - 1 && <br />}
            </span>
        );
    });
}

// Counter animation component
function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
    const [count, setCount] = useState(0);
    const isNumber = /^\d+/.test(value);
    const numericValue = isNumber ? parseInt(value) : 0;

    useEffect(() => {
        if (!inView || !isNumber) return;

        let start = 0;
        const duration = 2000;
        const increment = numericValue / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= numericValue) {
                setCount(numericValue);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [inView, isNumber, numericValue]);

    if (!isNumber) return <>{value}</>;

    return <>{count}{value.replace(/^\d+/, '')}</>;
}

export default function About() {
    const { language } = useLanguage();
    const content: AboutContent = require(`@/data/content/${language}/about.json`);
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true });

    return (
        <section id="about" className="py-32 px-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-gradient-mesh" />
            <motion.div
                className="absolute top-20 right-10 w-[500px] h-[500px] bg-yaksen-red/10 rounded-full blur-[120px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center max-w-4xl mx-auto"
                >
                    <motion.h2
                        className="text-display-2 font-bold mb-4 font-sinhala"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gradient">{content.title}</span>
                    </motion.h2>
                    <motion.p
                        className="text-yaksen-red text-xl font-semibold mb-6 uppercase tracking-wider"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        {content.subtitle}
                    </motion.p>
                </motion.div>

                {/* Story & Mission */}
                <div className="max-w-4xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        {/* Gradient border effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-yaksen-red to-yaksen-orange rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />

                        <div className="relative glass-panel rounded-3xl p-8 md:p-12">
                            {/* Floating accent */}
                            <motion.div
                                className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-yaksen-red/20 to-yaksen-orange/20 rounded-2xl blur-xl"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />

                            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-sinhala mb-8">
                                {formatRichText(content.story)}
                            </p>
                            <div className="h-px bg-gradient-to-r from-transparent via-yaksen-red/30 to-transparent mb-8" />
                            <p className="text-lg text-gray-400 leading-relaxed font-sinhala">
                                {formatRichText(content.mission)}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                    ref={statsRef}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
                >
                    {content.stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="relative group"
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-yaksen-red to-yaksen-orange rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />

                            <div className="relative glass-panel rounded-2xl p-6 text-center hover:border-yaksen-red/30 transition-all duration-300">
                                <motion.div
                                    className="text-4xl md:text-5xl font-black text-gradient mb-2"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 + (0.1 * index), type: "spring" }}
                                    viewport={{ once: true }}
                                >
                                    <AnimatedCounter value={stat.value} inView={statsInView} />
                                </motion.div>
                                <div className="text-sm text-yaksen-muted font-sinhala">
                                    {stat.label}
                                </div>

                                {/* Decorative element */}
                                <motion.div
                                    className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-yaksen-red to-yaksen-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </motion.div>
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
                                whileHover={{ y: -8 }}
                                className="relative group"
                            >
                                {/* Gradient glow on hover */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-yaksen-red to-yaksen-orange rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />

                                <div className="relative glass-panel rounded-3xl p-8 hover:border-yaksen-red/30 transition-all duration-300 h-full">
                                    {/* Icon container with animation */}
                                    <motion.div
                                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yaksen-red/20 to-yaksen-orange/20 border border-yaksen-red/20 flex items-center justify-center mb-6 relative overflow-hidden"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {/* Shimmer effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            animate={{
                                                x: ['-200%', '200%']
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                repeatDelay: 2
                                            }}
                                        />
                                        <Icon className="w-7 h-7 text-yaksen-red relative z-10" />
                                    </motion.div>

                                    <h3 className="text-xl font-bold text-white mb-3 font-sinhala group-hover:text-gradient transition-all duration-300">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed font-sinhala">
                                        {formatRichText(value.description)}
                                    </p>

                                    {/* Bottom accent line */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yaksen-red to-yaksen-orange rounded-b-3xl"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: '100%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
