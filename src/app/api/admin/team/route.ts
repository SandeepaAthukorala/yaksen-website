import { NextRequest, NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile, isLocalhost } from '@/lib/file-utils';

interface SocialLink {
    platform: string;
    url: string;
}

interface TeamMember {
    id: string;
    name: string;
    role: string;
    description: string;
    icon: string;
    image: string;
    social_links: SocialLink[];
}

interface TeamData {
    title: string;
    subtitle: string;
    members: TeamMember[];
}

// GET - Fetch all team members
export async function GET(request: NextRequest) {
    try {
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const data = await readJsonFile<TeamData>('content/en/team.json');
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading team:', error);
        return NextResponse.json(
            { error: 'Failed to load team' },
            { status: 500 }
        );
    }
}

// POST - Add new team member
export async function POST(request: NextRequest) {
    try {
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const newMember = await request.json();
        const data = await readJsonFile<TeamData>('content/en/team.json');

        // Generate ID if not provided
        if (!newMember.id) {
            const maxId = Math.max(
                ...data.members.map((m) => {
                    const num = parseInt(m.id);
                    return isNaN(num) ? 0 : num;
                }),
                0
            );
            newMember.id = String(maxId + 1);
        }

        data.members.push(newMember);
        await writeJsonFile('content/en/team.json', data);

        return NextResponse.json({ success: true, member: newMember });
    } catch (error) {
        console.error('Error adding team member:', error);
        return NextResponse.json(
            { error: 'Failed to add team member' },
            { status: 500 }
        );
    }
}

// PUT - Update existing team member
export async function PUT(request: NextRequest) {
    try {
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const updatedMember = await request.json();
        const data = await readJsonFile<TeamData>('content/en/team.json');

        const index = data.members.findIndex((m) => m.id === updatedMember.id);
        if (index === -1) {
            return NextResponse.json(
                { error: 'Team member not found' },
                { status: 404 }
            );
        }

        data.members[index] = updatedMember;
        await writeJsonFile('content/en/team.json', data);

        return NextResponse.json({ success: true, member: updatedMember });
    } catch (error) {
        console.error('Error updating team member:', error);
        return NextResponse.json(
            { error: 'Failed to update team member' },
            { status: 500 }
        );
    }
}

// DELETE - Remove team member
export async function DELETE(request: NextRequest) {
    try {
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Team member ID required' },
                { status: 400 }
            );
        }

        const data = await readJsonFile<TeamData>('content/en/team.json');
        const initialLength = data.members.length;
        data.members = data.members.filter((m) => m.id !== id);

        if (data.members.length === initialLength) {
            return NextResponse.json(
                { error: 'Team member not found' },
                { status: 404 }
            );
        }

        await writeJsonFile('content/en/team.json', data);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting team member:', error);
        return NextResponse.json(
            { error: 'Failed to delete team member' },
            { status: 500 }
        );
    }
}
