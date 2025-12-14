"use client";

import React from "react";
import { useParams } from "next/navigation";
import { getProjectsContent } from "@/data/lib/content-loader";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import ProjectGallery from "@/components/work/ProjectGallery";

const projectPageText = {
    en: {
        home: "Home",
        notFound: "Project Not Found",
        goHome: "Go Home",
        challenge: "The Challenge",
        solution: "The Solution",
        result: "The Result",
        impact: "Impact",
        backToHome: "Back to Home",
        nextCaseStudy: "Next Case Study"
    },
    si: {
        home: "මුල් පිටුව",
        notFound: "ව්‍යාපෘතිය හමු නොවිණි",
        goHome: "මුල් පිටුවට",
        challenge: "අභියෝගය",
        solution: "විසඳුම",
        result: "ප්‍රතිඵලය",
        impact: "බලපෑම",
        backToHome: "මුල් පිටුවට",
        nextCaseStudy: "ඊළඟ අධ්‍යයනය"
    }
};

export default function ProjectPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { language } = useLanguage();
    const text = projectPageText[language];
    const content = getProjectsContent(language);
    const project = content.projects.find((p) => p.slug === slug);

    if (!project) {
        return (
            <div className="min-h-screen bg-yaksen-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">{text.notFound}</h1>
                    <Link href={`/${language}`} className="text-yaksen-red hover:underline">
                        {text.goHome}
                    </Link>
                </div>
            </div>
        );
    }

    // Find next project for navigation
    const currentIndex = content.projects.findIndex((p) => p.slug === slug);
    const nextProject = content.projects[(currentIndex + 1) % content.projects.length];

    return (
        <main className="min-h-screen bg-yaksen-black text-white font-sans selection:bg-yaksen-red selection:text-white">
            {/* Floating Home Button */}
            <Link href={`/${language}`} className="fixed top-8 left-8 z-50 group">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 px-5 py-3 glass-panel rounded-full hover:bg-white/10 transition-all duration-300"
                >
                    <ArrowLeft className="w-4 h-4 text-yaksen-red group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium text-white">{text.home}</span>
                </motion.div>
            </Link>

            {/* Hero Section */}
            <section className={`relative pt-32 md:pt-48 pb-20 px-6 overflow-hidden min-h-[80vh] flex items-center`}>
                {/* Dynamic Background Blur */}
                <div className={`absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] ${project.color} opacity-20 blur-[120px] rounded-full mix-blend-screen pointer-events-none`} />
                <div className={`absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] ${project.color} opacity-10 blur-[150px] rounded-full mix-blend-screen pointer-events-none`} />

                <div className="container mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium uppercase tracking-widest text-yaksen-red border border-yaksen-red/20"
                            >
                                {project.category}
                            </motion.span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-8 leading-[0.9] tracking-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-3xl text-white/70 max-w-4xl leading-relaxed font-light">
                            {project.description}
                        </p>

                        {/* Project Links */}
                        {project.links && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap gap-4 mt-12"
                            >
                                {project.links.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2 text-lg"
                                    >
                                        {link.label}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                ))}
                            </motion.div>
                        )}

                        {project.tech_stack && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-wrap gap-3 mt-12"
                            >
                                {project.tech_stack.map((tech, i) => (
                                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors cursor-default">
                                        {tech}
                                    </span>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Detailed Content */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid gap-24 md:gap-32">
                        {/* Challenge */}
                        {project.challenge && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="grid md:grid-cols-12 gap-8 items-start"
                            >
                                <h2 className="md:col-span-4 text-3xl md:text-4xl font-bold text-yaksen-red">{text.challenge}</h2>
                                <p className="md:col-span-8 text-xl md:text-2xl text-gray-300 leading-relaxed font-sinhala">
                                    {project.challenge}
                                </p>
                            </motion.div>
                        )}

                        {/* Solution */}
                        {project.solution && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="grid md:grid-cols-12 gap-8 items-start"
                            >
                                <h2 className="md:col-span-4 text-3xl md:text-4xl font-bold text-yaksen-red">{text.solution}</h2>
                                <p className="md:col-span-8 text-xl md:text-2xl text-gray-300 leading-relaxed font-sinhala">
                                    {project.solution}
                                </p>
                            </motion.div>
                        )}

                        {/* Result */}
                        {project.result && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden"
                            >
                                {/* Showcase Videos */}
                                {project.showcase_videos && project.showcase_videos.length > 0 && (
                                    <div className="mb-16">
                                        <div className="grid gap-8">
                                            {project.showcase_videos.map((video, i) => (
                                                <div key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 aspect-video shadow-2xl">
                                                    <iframe
                                                        src={video}
                                                        className="w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Showcase Websites - Interactive Previews */}
                                {project.showcase_websites && project.showcase_websites.length > 0 && (
                                    <div className="mb-16">
                                        <h3 className="text-2xl font-bold text-white mb-6">Live Website Previews</h3>
                                        <div className="grid gap-8">
                                            {project.showcase_websites.map((website, i) => (
                                                <div key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl">
                                                    <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
                                                        <div className="flex gap-1.5">
                                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                                        </div>
                                                        <span className="text-xs text-white/50 ml-2 font-mono">{website}</span>
                                                    </div>
                                                    <iframe
                                                        src={website}
                                                        className="w-full h-[600px]"
                                                        title={`Website preview: ${website}`}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-12 items-end relative z-10">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-6 text-white">{text.result}</h2>
                                        <p className="text-xl text-gray-300 leading-relaxed font-sinhala">
                                            {project.result}
                                        </p>
                                    </div>
                                    {project.impact && (
                                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
                                            <div className="text-sm uppercase tracking-widest text-yaksen-muted mb-2">{text.impact}</div>
                                            <div className="text-4xl md:text-6xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                                                {project.impact}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* New Gallery Component */}
                        {project.showcase_images && (
                            <div className="-mx-6 md:-mx-12">
                                <ProjectGallery images={project.showcase_images} />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Next Project Navigation */}
            <section className="py-32 border-t border-white/10">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end">
                        <Link href={`/${language}`} className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span>{text.backToHome}</span>
                        </Link>

                        <Link href={`/${language}/work/${nextProject.slug}`} className="group text-right">
                            <span className="block text-sm text-yaksen-red mb-2 uppercase tracking-widest">{text.nextCaseStudy}</span>
                            <div className="flex items-center gap-4 text-3xl md:text-6xl font-bold text-white hover:text-gray-300 transition-colors">
                                <span>{nextProject.title}</span>
                                <ArrowRight className="w-8 h-8 md:w-16 md:h-16 group-hover:translate-x-4 transition-transform duration-500" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
