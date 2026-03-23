'use client';

import { useEffect, useState } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    description: string;
    icon: string;
    image: string;
    social_links: Array<{ platform: string; url: string }>;
}

export default function TeamPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTeam();
    }, []);

    const loadTeam = async () => {
        try {
            const res = await fetch('/api/admin/team');
            const data = await res.json();
            setMembers(data.members || []);
        } catch (error) {
            console.error('Failed to load team:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Remove this team member?')) return;
        try {
            await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' });
            await loadTeam();
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-white">Team Members</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
                    <Plus className="w-5 h-5" />
                    Add Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <div
                        key={member.id}
                        className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center"
                    >
                        {member.image && (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />
                        )}
                        <h3 className="text-white font-bold text-xl mb-1">{member.name}</h3>
                        <p className="text-indigo-400 text-sm mb-3">{member.role}</p>
                        <p className="text-slate-400 text-sm mb-4">{member.description}</p>
                        <div className="flex gap-2">
                            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition">
                                <Edit className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(member.id)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-4">
                <p className="text-yellow-400 text-sm">
                    Note: Team editing UI is similar to projects. For full implementation, extend with a modal editor like the projects page.
                </p>
            </div>
        </div>
    );
}
