'use client';

import { useEffect, useState } from 'react';
import { Trash2, Edit, Plus, X, Save } from 'lucide-react';

interface Project {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    description: string;
    coverImage: string;
    impact: string;
    tech_stack: string[];
    challenge: string;
    solution: string;
    result: string;
    color: string;
    featured: boolean;
    [key: string]: any;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isNewProject, setIsNewProject] = useState(false);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const res = await fetch('/api/admin/projects');
            const data = await res.json();
            setProjects(data.projects || []);
        } catch (error) {
            console.error('Failed to load projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!editingProject) return;

        try {
            const method = isNewProject ? 'POST' : 'PUT';
            const res = await fetch('/api/admin/projects', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingProject),
            });

            if (res.ok) {
                await loadProjects();
                setEditingProject(null);
                setIsNewProject(false);
            }
        } catch (error) {
            console.error('Failed to save project:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
            await loadProjects();
        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    };

    const handleNew = () => {
        setEditingProject({
            id: '',
            slug: '',
            title: '',
            subtitle: '',
            category: '',
            description: '',
            coverImage: '',
            impact: '',
            tech_stack: [],
            challenge: '',
            solution: '',
            result: '',
            color: 'bg-blue-900',
            featured: false,
        });
        setIsNewProject(true);
    };

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-white">Projects</h1>
                <button
                    onClick={handleNew}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                >
                    <Plus className="w-5 h-5" />
                    Add Project
                </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition"
                    >
                        {project.coverImage && (
                            <img
                                src={project.coverImage}
                                alt={project.title}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                        )}
                        <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
                        <p className="text-slate-400 text-sm mb-4">{project.subtitle}</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setEditingProject(project);
                                    setIsNewProject(false);
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition"
                            >
                                <Edit className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {editingProject && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-3xl w-full my-8 max-h-screen overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                {isNewProject ? 'New Project' : 'Edit Project'}
                            </h2>
                            <button
                                onClick={() => { setEditingProject(null); setIsNewProject(false); }}
                                className="text-slate-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={editingProject.title}
                                onChange={(e) =>
                                    setEditingProject({ ...editingProject, title: e.target.value })
                                }
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                            />
                            <input
                                type="text"
                                placeholder="Subtitle"
                                value={editingProject.subtitle}
                                onChange={(e) =>
                                    setEditingProject({ ...editingProject, subtitle: e.target.value })
                                }
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                            />
                            <input
                                type="text"
                                placeholder="Slug (URL-friendly name)"
                                value={editingProject.slug}
                                onChange={(e) =>
                                    setEditingProject({ ...editingProject, slug: e.target.value })
                                }
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                value={editingProject.category}
                                onChange={(e) =>
                                    setEditingProject({ ...editingProject, category: e.target.value })
                                }
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                            />
                            <textarea
                                placeholder="Description"
                                value={editingProject.description}
                                onChange={(e) =>
                                    setEditingProject({ ...editingProject, description: e.target.value })
                                }
                                rows={3}
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                            />
                            <input
                                type="text"
                                placeholder="Cover Image URL"
                                value={editingProject.coverImage}
                                onChange={(e) =>
                                    setEditingProject({ ...editingProject, coverImage: e.target.value })
                                }
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Impact"
                                    value={editingProject.impact}
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, impact: e.target.value })
                                    }
                                    className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                                />
                                <input
                                    type="text"
                                    placeholder="Color (e.g., bg-blue-900)"
                                    value={editingProject.color}
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, color: e.target.value })
                                    }
                                    className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                                >
                                    <Save className="w-5 h-5" />
                                    Save Project
                                </button>
                                <button
                                    onClick={() => { setEditingProject(null); setIsNewProject(false); }}
                                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
                                >
                                    Cancel
                                </button>
                            </div>

                            <p className="text-sm text-slate-500">
                                Note: This is a simplified editor. For full field editing (tech stack, challenge, solution, etc.), edit the JSON file directly or extend this interface.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
