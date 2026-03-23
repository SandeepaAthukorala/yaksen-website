import { NextRequest, NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile, isLocalhost } from '@/lib/file-utils';

interface Project {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    description: string;
    impact: string;
    tech_stack: string[];
    challenge: string;
    solution: string;
    result: string;
    coverImage: string;
    color: string;
    featured: boolean;
    showcase_videos?: string[];
    showcase_images?: string[];
    showcase_websites?: string[];
    links?: Array<{ label: string; url: string }>;
}

interface ProjectsData {
    title: string;
    subtitle: string;
    projects: Project[];
}

// GET - Fetch all projects
export async function GET(request: NextRequest) {
    try {
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const data = await readJsonFile<ProjectsData>('content/en/projects.json');
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading projects:', error);
        return NextResponse.json(
            { error: 'Failed to load projects' },
            { status: 500 }
        );
    }
}

// POST - Add new project
export async function POST(request: NextRequest) {
    try {
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const newProject = await request.json();
        const data = await readJsonFile<ProjectsData>('content/en/projects.json');

        // Generate ID if not provided
        if (!newProject.id) {
            const maxId = Math.max(...data.projects.map((p) => parseInt(p.id) || 0), 0);
            newProject.id = String(maxId + 1);
        }

        // Add project to the beginning of the array
        data.projects.unshift(newProject);

        await writeJsonFile('content/en/projects.json', data);

        return NextResponse.json({ success: true, project: newProject });
    } catch (error) {
        console.error('Error adding project:', error);
        return NextResponse.json(
            { error: 'Failed to add project' },
            { status: 500 }
        );
    }
}

// PUT - Update existing project
export async function PUT(request: NextRequest) {
    try {
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const updatedProject = await request.json();
        const data = await readJsonFile<ProjectsData>('content/en/projects.json');

        const index = data.projects.findIndex((p) => p.id === updatedProject.id);
        if (index === -1) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        data.projects[index] = updatedProject;
        await writeJsonFile('content/en/projects.json', data);

        return NextResponse.json({ success: true, project: updatedProject });
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json(
            { error: 'Failed to update project' },
            { status: 500 }
        );
    }
}

// DELETE - Remove project
export async function DELETE(request: NextRequest) {
    try {
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
        }

        const data = await readJsonFile<ProjectsData>('content/en/projects.json');
        const initialLength = data.projects.length;
        data.projects = data.projects.filter((p) => p.id !== id);

        if (data.projects.length === initialLength) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        await writeJsonFile('content/en/projects.json', data);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json(
            { error: 'Failed to delete project' },
            { status: 500 }
        );
    }
}
