'use client';

import { useEffect, useState } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    published: boolean;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const res = await fetch('/api/admin/blog');
            const data = await res.json();
            setPosts(data.posts || []);
        } catch (error) {
            console.error('Failed to load posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this blog post?')) return;
        try {
            await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' });
            await loadPosts();
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-white">Blog Posts</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
                    <Plus className="w-5 h-5" />
                    New Post
                </button>
            </div>

            {posts.length === 0 ? (
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
                    <p className="text-slate-400 mb-4">No blog posts yet</p>
                    <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
                        Create Your First Post
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-white font-bold text-xl">{post.title}</h3>
                                        {post.published ? (
                                            <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded">
                                                Published
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs rounded">
                                                Draft
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-400 text-sm mb-2">{post.excerpt}</p>
                                    <p className="text-slate-500 text-xs">
                                        By {post.author} • {post.date}
                                    </p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-4">
                <p className="text-yellow-400 text-sm">
                    Note: For a full markdown editor, extend this page with @uiw/react-md-editor. Current version provides basic list and delete functionality.
                </p>
            </div>
        </div>
    );
}
