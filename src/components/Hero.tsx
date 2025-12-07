"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ConstellationCanvas from "./ConstellationCanvas";
import { getHeroContent } from "@/data/lib/content-loader";

export default function Hero() {
    const content = getHeroContent('si'); // Default to Sinhala for now

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden text-center pt-20">
            {/* Background Orb */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-yaksen-red rounded-full blur-[120px] -z-10"
            />

            {/* 3D Constellation System */}
            <ConstellationCanvas />

            <div className="max-w-4xl space-y-8 z-10">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight font-sinhala"
                >
                    {content.headline.split(content.highlightText)[0]}
                    <br className="hidden md:block" />
                    <span className="text-yaksen-red">{content.highlightText}</span>
                    {content.headline.split(content.highlightText)[1]}
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg md:text-xl text-yaksen-muted max-w-2xl mx-auto"
                >
                    {content.subtitle} <br className="hidden md:block" />
                    <span className="font-sinhala">{content.description}</span>
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <Link
                        href={content.ctaLink}
                        className="inline-block px-8 py-4 text-lg font-semibold text-white bg-yaksen-red rounded-full hover:bg-red-600 transition-all duration-300 shadow-[0_0_20px_rgba(241,72,53,0.5)] hover:shadow-[0_0_40px_rgba(241,72,53,0.7)]"
                    >
                        {content.ctaText}
                    </Link>
                </motion.div>
            </div>

            {/* Floating Elements / Decor */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 w-4 h-4 bg-white/10 rounded-full"
            />
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-10 w-6 h-6 bg-yaksen-red/20 rounded-full"
            />
        </section>
    );
}
