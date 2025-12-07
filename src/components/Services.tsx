"use client";

import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { getServicesContent } from "@/data/lib/content-loader";

export default function Services() {
    const content = getServicesContent('si');

    return (
        <section className="py-20 px-6 bg-yaksen-black">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">{content.title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.services.map((service, index) => {
                        const Icon = Icons[service.icon as keyof typeof Icons] as React.ElementType;

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors group"
                            >
                                <div className="mb-6 inline-block p-4 bg-white/5 rounded-full group-hover:bg-yaksen-red/20 transition-colors">
                                    {Icon && <Icon className="w-8 h-8 text-white group-hover:text-yaksen-red transition-colors" as={undefined as any} />}
                                </div>
                                <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                                    <span className="text-yaksen-red text-sm">{service.id}</span>
                                    {service.title}
                                </h3>
                                <p className="text-yaksen-muted mb-4">{service.description}</p>
                                {service.value_proposition && (
                                    <p className="text-sm text-white/80 italic mb-4 border-l-2 border-yaksen-red pl-3">
                                        "{service.value_proposition}"
                                    </p>
                                )}
                                {service.deliverables && (
                                    <ul className="space-y-2 mt-4">
                                        {service.deliverables.map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                                                <div className="w-1.5 h-1.5 rounded-full bg-yaksen-red/50" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
