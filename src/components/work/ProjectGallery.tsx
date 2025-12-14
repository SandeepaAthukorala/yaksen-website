"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ZoomIn } from "lucide-react";

interface ProjectGalleryProps {
    images: string[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Handle ESC key to close lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedImage(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        layoutId={`gallery-image-${i}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        viewport={{ once: true }}
                        onClick={() => setSelectedImage(img)}
                        className="relative rounded-2xl overflow-hidden group border border-white/10 cursor-pointer aspect-[4/3]"
                    >
                        <img
                            src={img}
                            alt={`Project shot ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                            className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-20 group"
                        >
                            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                        </motion.button>

                        {/* Open Original Button */}
                        <motion.a
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            href={selectedImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-4 left-4 md:top-8 md:left-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-20 group"
                            title="Open in new tab"
                        >
                            <ExternalLink className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </motion.a>

                        <motion.div
                            layoutId={`gallery-image-${images.indexOf(selectedImage)}`}
                            className="relative max-w-full max-h-full rounded-lg overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Full screen preview"
                                className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
