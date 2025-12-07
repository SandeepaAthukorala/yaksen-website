"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { getFrameworkContent } from "@/data/lib/content-loader";

export default function Framework() {
    const [activeStep, setActiveStep] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const content = getFrameworkContent('si');
    const stepDuration = 4000; // 4 seconds per step

    // Auto-play functionality
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % content.steps.length);
        }, stepDuration);

        return () => clearInterval(interval);
    }, [isPaused, content.steps.length]);

    const activeContent = content.steps[activeStep];
    const ActiveIcon = Icons[activeContent.icon as keyof typeof Icons] as React.ElementType;

    return (
        <section
            className="py-20 bg-yaksen-black overflow-hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-yaksen-red/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{content.title}</h2>
                    <p className="text-yaksen-muted text-lg">{content.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                    {/* Left Column: Navigation Steps */}
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
                                {/* Progress Bar */}
                                {activeStep === index && !isPaused && (
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: stepDuration / 1000, ease: "linear" }}
                                        className="absolute bottom-0 left-0 h-[2px] bg-yaksen-red"
                                    />
                                )}

                                <span
                                    className={`text-sm font-bold px-2 py-1 rounded-md transition-colors ${activeStep === index
                                        ? "bg-yaksen-red text-white"
                                        : "bg-white/10 text-gray-400 group-hover:text-white"
                                        }`}
                                >
                                    {step.id}
                                </span>
                                <span
                                    className={`text-lg font-bold transition-colors ${activeStep === index ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                                        }`}
                                >
                                    {step.title}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Right Column: Dynamic Content Card */}
                    <div className="lg:col-span-7 h-[400px] relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="absolute inset-0 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col justify-center backdrop-blur-sm"
                            >
                                <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yaksen-red/10 text-yaksen-red">
                                    {ActiveIcon && <ActiveIcon className="w-8 h-8" as={undefined as any} />}
                                </div>

                                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                                    {activeContent.title}
                                </h3>

                                <p className="text-lg md:text-xl text-gray-300 font-sinhala leading-relaxed">
                                    {activeContent.description}
                                </p>

                                <div className="mt-8 flex items-center gap-2 text-sm text-yaksen-muted uppercase tracking-wider font-medium">
                                    <div className="w-8 h-[1px] bg-yaksen-red" />
                                    Step {activeContent.id} of {content.steps.length}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
