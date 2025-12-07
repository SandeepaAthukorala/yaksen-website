"use client";

import React from "react";
import { motion } from "framer-motion";
import { getToolkitContent } from "@/data/lib/content-loader";

export default function Toolkit() {
    const content = getToolkitContent();

    return (
        <section className="py-20 border-y border-white/5 bg-black/20">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-medium text-yaksen-muted mb-8 uppercase tracking-widest">{content.label}</p>

                <div className="flex flex-wrap justify-center gap-4">
                    {content.tools.map((tool, index) => (
                        <motion.span
                            key={tool}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:border-yaksen-red/50 hover:text-yaksen-red transition-all cursor-default"
                        >
                            {tool}
                        </motion.span>
                    ))}
                </div>
            </div>
        </section>
    );
}
