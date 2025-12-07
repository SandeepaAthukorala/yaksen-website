"use client";

import React from "react";
import { motion } from "framer-motion";
import { getProjectsContent } from "@/data/lib/content-loader";
import Link from "next/link";

export default function FeaturedWork() {
    const content = getProjectsContent('si');

    return (
        <section className="py-20 px-6">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-12">{content.title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.projects.map((project, index) => (
                        <Link href={`/work/${project.slug}`} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                            >
                                {/* Background Image */}
                                {project.coverImage ? (
                                    <img
                                        src={project.coverImage}
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className={`absolute inset-0 ${project.color} transition-transform duration-700 group-hover:scale-110`} />
                                )}

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <span className="text-yaksen-red text-sm font-bold uppercase tracking-wider mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-3xl font-bold mb-2 group-hover:text-yaksen-red transition-colors">{project.title}</h3>
                                    <p className="text-white/80 mb-4">{project.description}</p>

                                    {project.impact && (
                                        <div className="mb-4">
                                            <p className="text-yaksen-red text-sm font-bold flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-yaksen-red animate-pulse" />
                                                {project.impact}
                                            </p>
                                        </div>
                                    )}

                                    {project.tech_stack && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {project.tech_stack.map((tech: string, i: number) => (
                                                <span key={i} className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-md text-white/70 border border-white/5">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
