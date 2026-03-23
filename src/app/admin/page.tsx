'use client';

import { useEffect, useState } from 'react';
import { FolderKanban, Users, FileText, TrendingUp } from 'lucide-react';

interface Stats {
    projects: number;
    teamMembers: number;
    blogPosts: number;
    totalViews: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        projects: 0,
        teamMembers: 0,
        blogPosts: 0,
        totalViews: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [projectsRes, teamRes, blogRes, analyticsRes] = await Promise.all([
                fetch('/api/admin/projects'),
                fetch('/api/admin/team'),
                fetch('/api/admin/blog'),
                fetch('/api/admin/analytics'),
            ]);

            const [projects, team, blog, analytics] = await Promise.all([
                projectsRes.json(),
                teamRes.json(),
                blogRes.json(),
                analyticsRes.json(),
            ]);

            setStats({
                projects: projects.projects?.length || 0,
                teamMembers: team.members?.length || 0,
                blogPosts: blog.posts?.length || 0,
                totalViews: analytics.summary?.totalViews || 0,
            });
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            name: 'Projects',
            value: stats.projects,
            icon: FolderKanban,
            color: 'from-blue-600 to-cyan-600',
            href: '/admin/projects',
        },
        {
            name: 'Team Members',
            value: stats.teamMembers,
            icon: Users,
            color: 'from-purple-600 to-pink-600',
            href: '/admin/team',
        },
        {
            name: 'Blog Posts',
            value: stats.blogPosts,
            icon: FileText,
            color: 'from-green-600 to-emerald-600',
            href: '/admin/blog',
        },
        {
            name: 'Total Views',
            value: stats.totalViews,
            icon: TrendingUp,
            color: 'from-orange-600 to-red-600',
            href: '/admin/analytics',
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-slate-400">
                    Welcome back! Here's what's happening with your website.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <a
                        key={stat.name}
                        href={stat.href}
                        className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all hover:shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">
                                    {stat.name}
                                </p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {loading ? '...' : stat.value}
                                </p>
                            </div>
                            <div
                                className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                            >
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="/admin/projects"
                        className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-all border border-slate-700 hover:border-slate-600"
                    >
                        <FolderKanban className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">Add New Project</span>
                    </a>
                    <a
                        href="/admin/blog"
                        className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-all border border-slate-700 hover:border-slate-600"
                    >
                        <FileText className="w-5 h-5 text-green-400" />
                        <span className="text-white font-medium">Write Blog Post</span>
                    </a>
                    <a
                        href="/admin/team"
                        className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-all border border-slate-700 hover:border-slate-600"
                    >
                        <Users className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-medium">Add Team Member</span>
                    </a>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-indigo-500/10 border border-indigo-500/50 rounded-2xl p-6">
                <h3 className="text-indigo-400 font-semibold mb-2">💡 Remember</h3>
                <p className="text-slate-300 text-sm">
                    All changes you make here edit the JSON files in your project. Don't
                    forget to commit and push your changes to GitHub to deploy them!
                </p>
            </div>
        </div>
    );
}
