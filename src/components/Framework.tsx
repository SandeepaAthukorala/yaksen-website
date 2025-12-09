"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { getFrameworkContent } from "@/data/lib/content-loader";
import { useLanguage } from "@/context/LanguageContext";

export default function Framework() {
    const [activeStep, setActiveStep] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const { language } = useLanguage();
    const content = getFrameworkContent(language);
    const stepDuration = 5000;

    // Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Auto-play
    useEffect(() => {
        if (isPaused || !isInView) return;

        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % content.steps.length);
        }, stepDuration);

        return () => clearInterval(interval);
    }, [isPaused, isInView, content.steps.length]);

    const activeContent = content.steps[activeStep];
    const ActiveIcon = Icons[activeContent.icon as keyof typeof Icons] as React.ComponentType<any>;

    return (
        <section
            id="framework"
            ref={sectionRef}
            className="py-20 bg-yaksen-black overflow-hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-yaksen-red/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sinhala">{content.title}</h2>
                    <p className="text-yaksen-muted text-lg font-sinhala">{content.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    {/* Left: Navigation */}
                    <div className="lg:col-span-5 flex flex-col gap-3">
                        {content.steps.map((step, index) => (
                            <button
                                key={step.id}
                                onClick={() => setActiveStep(index)}
                                className={`group relative flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 border overflow-hidden ${activeStep === index
                                    ? "bg-white/10 border-yaksen-red/50 shadow-[0_0_30px_rgba(241,72,53,0.1)]"
                                    : "bg-transparent border-transparent hover:bg-white/5"
                                    }`}
                            >
                                {activeStep === index && !isPaused && (
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: stepDuration / 1000, ease: "linear" }}
                                        className="absolute bottom-0 left-0 h-[2px] bg-yaksen-red"
                                    />
                                )}

                                <span className={`text-sm font-bold px-2 py-1 rounded-md transition-colors ${activeStep === index ? "bg-yaksen-red text-white" : "bg-white/10 text-gray-400 group-hover:text-white"}`}>
                                    {step.id}
                                </span>
                                <div className="flex flex-col">
                                    <span className={`text-lg font-bold transition-colors ${activeStep === index ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}>
                                        {step.title}
                                    </span>
                                    {step.subtitle && (
                                        <span className="text-sm text-yaksen-muted font-sinhala">
                                            {step.subtitle}
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right: Minimal Content Card */}
                    <div className="lg:col-span-7 min-h-[350px] relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="absolute inset-0 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm"
                            >
                                {/* Icon & Title */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-yaksen-red/10 text-yaksen-red flex items-center justify-center">
                                        {ActiveIcon && <ActiveIcon className="w-7 h-7" />}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                                            {activeContent.title}
                                        </h3>
                                        {activeContent.subtitle && (
                                            <p className="text-yaksen-red text-sm font-semibold mt-1 font-sinhala">
                                                {activeContent.subtitle}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Pain Point (Problem) */}
                                {activeContent.pain_point && (
                                    <div className="mb-6 p-4 bg-yaksen-red/5 border-l-4 border-yaksen-red rounded-r-lg">
                                        <p className="text-base md:text-lg text-gray-200 italic font-sinhala leading-relaxed">
                                            "{activeContent.pain_point}"
                                        </p>
                                    </div>
                                )}

                                {/* Solution (Description with example) */}
                                <p className="text-base md:text-lg text-gray-300 font-sinhala leading-relaxed">
                                    {activeContent.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
