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
        <section className="py-20 px-6 bg-yaksen-black">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sinhala">{content.title}</h2>
                    <p className="text-yaksen-muted text-lg font-sinhala">{content.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.services.map((service, index) => {
                        const Icon = Icons[service.icon as keyof typeof Icons] as React.ComponentType<any>;

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-8 rounded-2xl glass-panel glass-panel-hover relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-[0.03] font-black text-7xl text-white select-none transition-transform group-hover:scale-110 duration-700">
                                    {service.id}
                                </div>

                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yaksen-red/20 to-transparent border border-yaksen-red/20 text-yaksen-red flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(241,72,53,0.1)]">
                                    {Icon && <Icon className="w-7 h-7" />}
                                </div>

                                <h3 className="text-2xl font-bold mb-2 text-white font-sinhala tracking-tight">{service.title}</h3>
                                <div className="text-xs text-yaksen-red font-bold mb-4 uppercase tracking-widest">{service.subtitle}</div>

                                <p className="text-white/60 mb-8 leading-relaxed font-sinhala group-hover:text-white/80 transition-colors">
                                    {service.description}
                                </p>

                                {/* Pain Point Alert */}
                                <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl mb-6 backdrop-blur-sm">
                                    <p className="text-sm text-red-200/80 italic font-sinhala">"{service.pain_point}"</p>
                                </div>

                                <div className="pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
                                    <div className="text-[10px] text-yaksen-muted uppercase tracking-[0.2em] mb-3 font-bold">Deliverables</div>
                                    <p className="text-sm text-gray-300 font-medium">
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
