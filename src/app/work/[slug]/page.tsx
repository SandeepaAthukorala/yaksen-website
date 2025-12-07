"use client";

import React from "react";
import { useParams } from "next/navigation";
import { getProjectsContent } from "@/data/lib/content-loader";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ProjectPage() {
    const params = useParams();
    const slug = params.slug as string;
    const content = getProjectsContent('si');
    const project = content.projects.find((p) => p.slug === slug);

    if (!project) {
        return (
            <div className="min-h-screen bg-yaksen-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link href="/" className="text-yaksen-red hover:underline">
                        Go Home
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
            <Navbar />

            {/* Hero Section */}
            <section className={`relative py-32 md:py-48 px-6 overflow-hidden`}>
                <div className={`absolute inset-0 opacity-20 ${project.color} blur-[100px]`} />
                <div className="container mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium uppercase tracking-wider text-yaksen-red border border-yaksen-red/20">
                                {project.category}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed">
                            {project.description}
                        </p>

                        {/* Project Links */}
                        {project.links && (
                            <div className="flex flex-wrap gap-4 mt-8">
                                {project.links.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2"
                                    >
                                        {link.label} <ArrowRight className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* Project Links */}
                        {project.links && (
                            <div className="flex flex-wrap gap-4 mt-8">
                                {project.links.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2"
                                    >
                                        {link.label} <ArrowRight className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* Project Links */}
                        {project.links && (
                            <div className="flex flex-wrap gap-4 mt-8">
                                {project.links.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2"
                                    >
                                        {link.label} <ArrowRight className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        )}

                        {project.tech_stack && (
                            <div className="flex flex-wrap gap-3 mt-8">
                                {project.tech_stack.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Detailed Content */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid gap-16 md:gap-24">
                        {/* Challenge */}
                        {project.challenge && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl font-bold mb-6 text-yaksen-red">The Challenge</h2>
                                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-sinhala">
                                    {project.challenge}
                                </p>
                            </motion.div>
                        )}

                        {/* Solution */}
                        {project.solution && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl font-bold mb-6 text-yaksen-red">The Solution</h2>
                                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-sinhala">
                                    {project.solution}
                                </p>
                            </motion.div>
                        )}

                        {/* Result */}
                        {project.result && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-64 h-64 ${project.color} opacity-20 blur-[80px] rounded-full`} />

                                <h2 className="text-3xl font-bold mb-6 text-white relative z-10">The Result</h2>
                                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-sinhala mb-8 relative z-10">
                                    {project.result}
                                </p>

                                {/* Showcase Videos */}
                                {project.showcase_videos && project.showcase_videos.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                    >
                                        <h2 className="text-3xl font-bold mb-6 text-white">Project Showcase</h2>
                                        <div className="grid gap-6">
                                            {project.showcase_videos.map((video, i) => (
                                                <div key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 aspect-video">
                                                    <iframe
                                                        src={video}
                                                        className="w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Showcase Images */}
                                {project.showcase_images && project.showcase_images.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                    >
                                        <h2 className="text-3xl font-bold mb-6 text-white">Gallery</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {project.showcase_images.map((img, i) => (
                                                <div key={i} className="rounded-2xl overflow-hidden border border-white/10 group">
                                                    <img
                                                        src={img}
                                                        alt={`${project.title} showcase ${i + 1}`}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {project.impact && (
                                    <div className="inline-block relative z-10">
                                        <div className="text-sm uppercase tracking-widest text-yaksen-muted mb-2">Impact</div>
                                        <div className="text-3xl md:text-5xl font-bold text-white">
                                            {project.impact}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Next Project Navigation */}
            <section className="py-20 border-t border-white/10">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Home</span>
                        </Link>

                        <Link href={`/work/${nextProject.slug}`} className="group text-right">
                            <span className="block text-sm text-gray-500 mb-1">Next Project</span>
                            <div className="flex items-center gap-2 text-xl font-bold text-white hover:text-yaksen-red transition-colors">
                                <span>{nextProject.title}</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
