"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
}

interface TestimonialsData {
    title: string;
    subtitle: string;
    testimonials: Testimonial[];
}

export default function Testimonials() {
    const { language } = useLanguage();

    // Load testimonials content
    const content: TestimonialsData = require(`@/data/content/${language}/testimonials.json`);

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
                    className="mb-16 text-center"
                >
                    <h2 className="text-display-2 font-bold mb-4 font-sinhala">
                        <span className="text-gradient">{content.title}</span>
                    </h2>
                    <p className="text-yaksen-muted text-xl font-sinhala max-w-2xl mx-auto">
                        {content.subtitle}
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {content.testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            {/* Card */}
                            <div className="relative h-full p-8 glass-panel rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-yaksen-red/5 to-yaksen-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

                                {/* Quote icon */}
                                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                    <Quote className="w-16 h-16 text-yaksen-red" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-4 h-4 fill-yaksen-red text-yaksen-red"
                                            />
                                        ))}
                                    </div>

                                    {/* Testimonial text */}
                                    <p className="text-gray-300 leading-relaxed mb-6 font-sinhala">
                                        "{testimonial.content}"
                                    </p>

                                    {/* Author */}
                                    <div className="border-t border-white/10 pt-4">
                                        <h4 className="font-bold text-white mb-1 font-sinhala">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-yaksen-muted font-sinhala">
                                            {testimonial.role}
                                        </p>
                                        <p className="text-xs text-yaksen-red mt-1 font-semibold">
                                            {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
