'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    FileText,
    Image,
    BarChart3,
    LogOut,
} from 'lucide-react';

interface AdminLayoutClientProps {
    children: ReactNode;
}

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Team', href: '/admin/team', icon: Users },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Media', href: '/admin/media', icon: Image },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 h-full w-64 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 z-50">
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-slate-800">
                        <h1 className="text-2xl font-bold text-white">Yaksen</h1>
                        <p className="text-sm text-slate-400 mt-1">Admin Panel</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                            ? 'bg-indigo-600 text-white shadow-lg'
                                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-slate-800">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 min-h-screen">
                <div className="max-w-7xl mx-auto p-8">{children}</div>
            </main>
        </div>
    );
}
