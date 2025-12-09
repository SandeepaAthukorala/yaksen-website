"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProjectGalleryProps {
    images: string[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
    if (!images || images.length === 0) return null;

    return (
        <div className="py-12">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-8 text-white"
            >
                Gallery
            </motion.h2>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="relative rounded-2xl overflow-hidden group border border-white/10 break-inside-avoid"
                    >
                        <img
                            src={img}
                            alt={`Project shot ${i + 1}`}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
