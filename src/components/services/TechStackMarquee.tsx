"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TechStackMarquee({ stack }: { stack: string[] }) {
    if (!stack || stack.length === 0) return null;

    // Duplicate stack to create seamless infinite loop
    const displayStack = [...stack, ...stack, ...stack, ...stack];

    return (
        <section className="py-12 bg-black/50 border-y border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-8 text-center">
                <p className="text-sm uppercase tracking-widest text-gray-500">Powered By</p>
            </div>

            <div className="flex relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-yaksen-black to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-yaksen-black to-transparent z-10" />

                <motion.div
                    className="flex gap-12 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30
                    }}
                >
                    {displayStack.map((tech, index) => (
                        <div key={index} className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity">
                            {/* We could map icons here later, strict text for now */}
                            <span className="text-lg font-bold text-white border border-white/10 px-6 py-2 rounded-full bg-white/5">
                                {tech}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
