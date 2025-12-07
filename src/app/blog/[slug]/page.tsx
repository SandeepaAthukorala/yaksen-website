import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPost } from "@/data/lib/markdown-parser";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getBlogPost(slug, 'si'); // Default to Sinhala

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-yaksen-black text-white selection:bg-yaksen-red selection:text-white">
            <Navbar />
            <article className="pt-32 pb-20 px-6 md:px-12 container mx-auto max-w-4xl">
                <div className="mb-8">
                    <div className="flex gap-2 mb-4">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-sm font-medium px-3 py-1 rounded-full bg-yaksen-red/10 text-yaksen-red border border-yaksen-red/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 font-sinhala leading-tight">
                        {post.title}
                    </h1>
                    <div className="text-gray-400 text-sm mb-8">{post.date}</div>
                    <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-12 border border-white/10">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none font-sinhala prose-headings:font-bold prose-a:text-yaksen-red hover:prose-a:text-white prose-img:rounded-xl">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.content || ""}
                    </ReactMarkdown>
                </div>
            </article>
            <Footer />
        </main>
    );
}
