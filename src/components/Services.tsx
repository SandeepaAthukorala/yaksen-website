"use client";

import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { getServicesContent } from "@/data/lib/content-loader";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
    const { language } = useLanguage();
    const content = getServicesContent(language);

    return (
        <section className="py-32 px-6 bg-yaksen-black relative overflow-hidden">
            {/* Background gradient mesh */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-mesh" />

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-display-2 font-bold mb-6 font-sinhala">
                        <span className="text-gradient">{content.title}</span>
                    </h2>
                    <p className="text-yaksen-muted text-xl font-sinhala max-w-2xl mx-auto">{content.subtitle}</p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {content.services.map((service, index) => {
                        const Icon = Icons[service.icon as keyof typeof Icons] as React.ComponentType<any>;

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-8 rounded-3xl glass-panel-strong glass-panel-hover card-3d relative overflow-hidden"
                            >
                                {/* Background number */}
                                <div className="absolute top-0 right-0 p-4 opacity-[0.02] font-black text-9xl text-white select-none transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.04]">
                                    {service.id}
                                </div>

                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-yaksen-red/5 to-yaksen-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

                                {/* Icon container with enhanced effects */}
                                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-yaksen-red/20 to-yaksen-orange/20 border border-yaksen-red/20 text-yaksen-red flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-yaksen-red/10 animate-border-glow">
                                    {Icon && <Icon className="w-8 h-8" />}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold mb-2 text-white font-sinhala tracking-tight group-hover:text-gradient transition-all duration-300">{service.title}</h3>

                                {/* Subtitle */}
                                <div className="text-xs text-yaksen-red font-bold mb-5 uppercase tracking-widest">{service.subtitle}</div>

                                {/* Description */}
                                <p className="text-white/60 mb-8 leading-relaxed font-sinhala group-hover:text-white/80 transition-colors">
                                    {service.description}
                                </p>

                                {/* Pain Point with gradient background */}
                                <div className="relative p-5 bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-2xl mb-6 backdrop-blur-sm overflow-hidden">
                                    {/* Quote icon */}
                                    <div className="absolute top-2 right-2 opacity-5">
                                        <Icons.Quote className="w-12 h-12 text-red-400" />
                                    </div>
                                    <p className="text-sm text-red-200/90 italic font-sinhala relative z-10">"{service.pain_point}"</p>
                                </div>

                                {/* Deliverables */}
                                <div className="pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Icons.CheckCircle className="w-4 h-4 text-yaksen-red" />
                                        <div className="text-[10px] text-yaksen-muted uppercase tracking-[0.2em] font-bold">Deliverables</div>
                                    </div>
                                    <p className="text-sm text-gray-300 font-medium leading-relaxed">
                                        {typeof service.deliverables === 'string'
                                            ? service.deliverables
                                            : Array.isArray(service.deliverables) ? service.deliverables.join(' · ') : ''}
                                    </p>
                                </div>

                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section >
    );
}
