"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProcessStep } from "@/data/types/content";

export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
    if (!steps || steps.length === 0) return null;

    return (
        <section className="py-24 bg-yaksen-black relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How We Work</h2>
                    <p className="text-gray-400">Our proven process for consistent results.</p>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row gap-8 md:gap-0 relative ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Content Side */}
                                <div className="flex-1 md:px-12">
                                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-yaksen-red/50 transition-colors">
                                        <span className="text-yaksen-red text-6xl font-bold opacity-20 absolute top-4 right-8 select-none">
                                            {step.step_number}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center bg-yaksen-black border-4 border-yaksen-black rounded-full z-10">
                                    <div className="w-3 h-3 bg-yaksen-red rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                                </div>

                                {/* Spacer Side */}
                                <div className="hidden md:block flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
