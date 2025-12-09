"use client";

import React from "react";
import { motion } from "framer-motion";
import TriangleCanvas from "@/components/TriangleCanvas";
import { ArrowDown } from "lucide-react";

interface ServiceHeroProps {
    title: string;
    subtitle?: string;
    description: string;
    icon?: string; // We can map this to Lucide icons if needed
}

export default function ServiceHero({ title, subtitle, description }: ServiceHeroProps) {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-yaksen-black pt-20">
            {/* 3D Background */}
            <TriangleCanvas />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-yaksen-black/50 via-transparent to-yaksen-black pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    {subtitle && (
                        <div className="inline-block px-4 py-2 rounded-full bg-yaksen-red/10 border border-yaksen-red/20 mb-6 backdrop-blur-sm">
                            <span className="text-sm text-yaksen-red font-medium tracking-wide uppercase">{subtitle}</span>
                        </div>
                    )}

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-sinhala">
                        {title}
                    </h1>

                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-sinhala">
                        {description}
                    </p>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2 text-gray-500"
                    >
                        <span className="text-sm uppercase tracking-widest opacity-60">Success Process</span>
                        <ArrowDown className="w-5 h-5" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
