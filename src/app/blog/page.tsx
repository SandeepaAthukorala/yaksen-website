import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getBlogPosts } from "@/data/lib/markdown-parser";

export default function BlogListing() {
    const posts = getBlogPosts('si'); // Default to Sinhala

    return (
        <main className="min-h-screen bg-yaksen-black text-white selection:bg-yaksen-red selection:text-white">
            <Navbar />
            <div className="pt-32 pb-20 px-6 md:px-12 container mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Yaksen <span className="text-yaksen-red">දැනුම</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-sinhala">
                        තාක්ෂණය ගැන සිංහලෙන්.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block rounded-2xl bg-white/5 border border-white/10 hover:border-yaksen-red transition-all duration-300 overflow-hidden"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex gap-2 mb-3">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-gray-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-xl font-bold text-white mb-2 font-sinhala group-hover:text-yaksen-red transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-gray-400 text-sm line-clamp-2 font-sinhala">
                                    {post.excerpt}
                                </p>
                                <div className="mt-4 text-xs text-gray-500">
                                    {post.date}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
