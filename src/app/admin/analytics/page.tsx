'use client';

import { useEffect, useState } from 'react';

interface AnalyticsData {
    pageViews: Array<{ path: string; timestamp: number; visitor: string }>;
    projectViews: Record<string, number>;
    summary: {
        totalViews: number;
        uniqueVisitors: number;
    };
}

export default function AnalyticsPage() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            const res = await fetch('/api/admin/analytics');
            const analyticsData = await res.json();
            setData(analyticsData);
        } catch (error) {
            console.error('Failed to load analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-white">Loading analytics...</div>;
    }

    const topProjects = Object.entries(data?.projectViews || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">Analytics</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <p className="text-slate-400 text-sm mb-2">Total Page Views</p>
                    <p className="text-4xl font-bold text-white">
                        {data?.summary.totalViews || 0}
                    </p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <p className="text-slate-400 text-sm mb-2">Unique Visitors</p>
                    <p className="text-4xl font-bold text-white">
                        {data?.summary.uniqueVisitors || 0}
                    </p>
                </div>
            </div>

            {/* Top Projects */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Top Projects</h2>
                {topProjects.length > 0 ? (
                    <div className="space-y-3">
                        {topProjects.map(([slug, views]) => (
                            <div
                                key={slug}
                                className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg"
                            >
                                <span className="text-white">{slug}</span>
                                <span className="text-slate-400">{views} views</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-400">No project views recorded yet</p>
                )}
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Recent Page Views
                </h2>
                {data && data.pageViews.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {data.pageViews
                            .slice()
                            .reverse()
                            .map((pv, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center p-2 text-sm border-b border-slate-800 last:border-0"
                                >
                                    <span className="text-white">{pv.path}</span>
                                    <span className="text-slate-400">
                                        {new Date(pv.timestamp).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                    </div>
                ) : (
                    <p className="text-slate-400">No page views recorded yet</p>
                )}
            </div>

            <div className="bg-blue-500/10 border border-blue-500/50 rounded-xl p-4">
                <p className="text-blue-400 text-sm">
                    ℹ️ Analytics are tracked locally in `src/data/analytics.json`. To enable frontend tracking, add the analytics script to your pages.
                </p>
            </div>
        </div>
    );
}
