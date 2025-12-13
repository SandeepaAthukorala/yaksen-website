"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { getProjectsContent } from "@/data/lib/content-loader";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const seeMoreText = {
    en: {
        seeMore: "View All Projects",
        seeLess: "Show Less"
    },
    si: {
        seeMore: "සියළුම ව්‍යාපෘති බලන්න",
        seeLess: "අඩු කරන්න"
    }
};

export default function FeaturedWork() {
    const { language } = useLanguage();
    const content = getProjectsContent(language);
    const text = seeMoreText[language];
    const [showAll, setShowAll] = useState(false);

    const featuredProject = content.projects[0];
    const INITIAL_OTHER_COUNT = 2; // Show 2 in grid initially (total 3 with featured)
    const allOtherProjects = content.projects.slice(1);
    const displayedOtherProjects = showAll ? allOtherProjects : allOtherProjects.slice(0, INITIAL_OTHER_COUNT);
    const remainingCount = allOtherProjects.length - INITIAL_OTHER_COUNT;

    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-gradient-mesh" />

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-display-2 font-bold mb-4 font-sinhala">
                        <span className="text-gradient">{content.title}</span>
                    </h2>
                    {content.subtitle && (
                        <p className="text-yaksen-muted text-xl font-sinhala max-w-2xl">{content.subtitle}</p>
                    )}
                </motion.div>

                {/* Featured Project - Full Width */}
                {featuredProject && (
                    <Link href={`/work/${featuredProject.slug}`}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="group relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden cursor-pointer mb-8 border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-yaksen-red/20"
                        >
                            {/* Background Image */}
                            {featuredProject.coverImage ? (
                                <img
                                    src={featuredProject.coverImage}
                                    alt={featuredProject.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className={`absolute inset-0 ${featuredProject.color} transition-transform duration-700 group-hover:scale-105`} />
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-yaksen-black via-black/40 to-transparent opacity-90" />

                            {/* Number Indicator */}
                            <div className="absolute top-8 left-8 text-9xl font-black text-white/[0.03] select-none">01</div>

                            {/* Arrow Icon */}
                            <div className="absolute top-8 right-8 w-14 h-14 glass-panel rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-45">
                                <ArrowUpRight className="w-6 h-6 text-white" />
                            </div>

                            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                                <span className="text-yaksen-red text-sm font-bold uppercase tracking-widest mb-3 block">
                                    {featuredProject.category}
                                </span>
                                <h3 className="text-4xl md:text-6xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300 font-sinhala tracking-tight">{featuredProject.title}</h3>
                                {featuredProject.subtitle && (
                                    <p className="text-xl text-white/80 mb-6 font-sinhala max-w-2xl leading-relaxed">{featuredProject.subtitle}</p>
                                )}

                                {featuredProject.impact && (
                                    <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yaksen-red/10 border border-yaksen-red/20 backdrop-blur-md">
                                        <span className="w-2 h-2 rounded-full bg-yaksen-red animate-pulse" />
                                        <p className="text-yaksen-red text-sm font-bold font-sinhala">{featuredProject.impact}</p>
                                    </div>
                                )}

                                {featuredProject.tech_stack && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {featuredProject.tech_stack.map((tech: string, i: number) => (
                                            <span key={i} className="px-4 py-1.5 text-xs font-semibold bg-white/5 backdrop-blur-md rounded-full text-white/70 border border-white/10 hover:bg-white/10 transition-colors">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </Link>
                )}

                {/* Other Projects - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayedOtherProjects.map((project, index) => (
                        <Link href={`/work/${project.slug}`} key={project.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl"
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
                                <div className="absolute inset-0 bg-gradient-to-t from-yaksen-black via-black/20 to-transparent opacity-90" />

                                {/* Number Indicator */}
                                <div className="absolute top-6 left-6 text-7xl font-black text-white/[0.03] select-none">
                                    {String(index + 2).padStart(2, '0')}
                                </div>

                                {/* Arrow Icon */}
                                <div className="absolute top-6 right-6 w-12 h-12 glass-panel rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-45">
                                    <ArrowUpRight className="w-5 h-5 text-white" />
                                </div>

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <span className="text-yaksen-red text-xs font-bold uppercase tracking-widest mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-3xl font-bold mb-2 group-hover:text-white transition-colors font-sinhala tracking-tight">{project.title}</h3>
                                    {project.subtitle && (
                                        <p className="text-sm text-white/70 line-clamp-2 mb-4 font-sinhala leading-relaxed">{project.subtitle}</p>
                                    )}

                                    {project.tech_stack && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tech_stack.map((tech: string, i: number) => (
                                                <span key={i} className="px-3 py-1 text-[10px] font-medium bg-white/5 backdrop-blur-md rounded-full text-white/60 border border-white/5">
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

                {/* Creative See More Button */}
                {allOtherProjects.length > INITIAL_OTHER_COUNT && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 flex justify-center"
                    >
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="group relative px-8 py-4 bg-gradient-to-r from-yaksen-red to-yaksen-orange rounded-2xl text-white font-bold overflow-hidden hover:shadow-2xl hover:shadow-yaksen-red/50 transition-all duration-300 hover:scale-105"
                        >
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="relative flex items-center gap-3">
                                <span className="font-sinhala">
                                    {showAll ? text.seeLess : text.seeMore}
                                </span>

                                {/* Count badge */}
                                {!showAll && remainingCount > 0 && (
                                    <span className="px-2.5 py-0.5 bg-white/20 rounded-full text-sm backdrop-blur-xl">
                                        +{remainingCount}
                                    </span>
                                )}

                                {/* Animated icon */}
                                <motion.div
                                    animate={{
                                        rotate: showAll ? 180 : 0,
                                        y: showAll ? 0 : [0, 3, 0]
                                    }}
                                    transition={{
                                        rotate: { duration: 0.3 },
                                        y: { duration: 1.5, repeat: showAll ? 0 : Infinity }
                                    }}
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </motion.div>
                            </div>
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
