"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
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

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8
    })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export default function Testimonials() {
    const { language } = useLanguage();
    // Load testimonials content
    const content: TestimonialsData = require(`@/data/content/${language}/testimonials.json`);

    const [[page, direction], setPage] = useState([0, 0]);

    // We only have limited testimonials, so we wrap around
    const testimonials = content.testimonials;
    const imageIndex = Math.abs(page % testimonials.length);
    const testimonial = testimonials[imageIndex];

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <section className="py-24 sm:py-32 px-4 relative overflow-hidden bg-yaksen-black">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-yaksen-red/5 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px] pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-24 flex flex-col items-center text-center"
                >
                    <span className="text-yaksen-red font-mono text-sm tracking-widest uppercase mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-sinhala">
                        {content.title}
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-sinhala">
                        {content.subtitle}
                    </p>
                </motion.div>

                {/* Carousel */}
                <div className="relative h-[500px] flex flex-col justify-center items-center">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute w-full max-w-4xl"
                        >
                            <div className="relative glass-panel rounded-3xl p-8 md:p-14 border border-white/5 shadow-2xl overflow-hidden">
                                {/* Giant Quote Icon Background */}
                                <Quote className="absolute -top-6 -left-6 w-48 h-48 text-white/5 rotate-180 pointer-events-none" />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Stars */}
                                    <div className="flex gap-2 mb-8">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yaksen-red text-yaksen-red" />
                                        ))}
                                    </div>

                                    {/* Content */}
                                    <p className="text-xl md:text-3xl font-medium text-white leading-relaxed mb-10 font-sinhala italic">
                                        "{testimonial.content}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex flex-col items-center gap-1">
                                        <h4 className="text-xl font-bold text-white font-sinhala">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-gray-400 font-sinhala">
                                            {testimonial.role} at <span className="text-yaksen-red">{testimonial.company}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center gap-6 mt-12 md:mt-4">
                    <button
                        className="group p-4 rounded-full glass-panel border border-white/10 hover:border-yaksen-red/50 hover:bg-yaksen-red/10 transition-all duration-300"
                        onClick={() => paginate(-1)}
                        aria-label="Previous testimonial"
                    >
                        <ArrowLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Dots */}
                    <div className="flex gap-3">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === imageIndex ? "bg-yaksen-red w-8" : "bg-white/20 hover:bg-white/40"
                                    }`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        className="group p-4 rounded-full glass-panel border border-white/10 hover:border-yaksen-red/50 hover:bg-yaksen-red/10 transition-all duration-300"
                        onClick={() => paginate(1)}
                        aria-label="Next testimonial"
                    >
                        <ArrowRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
