import { NextRequest, NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile, isLocalhost } from '@/lib/file-utils';

interface PageView {
    path: string;
    timestamp: number;
    visitor: string;
}

interface AnalyticsData {
    pageViews: PageView[];
    projectViews: Record<string, number>;
    summary: {
        totalViews: number;
        uniqueVisitors: number;
    };
}

const INITIAL_ANALYTICS: AnalyticsData = {
    pageViews: [],
    projectViews: {},
    summary: {
        totalViews: 0,
        uniqueVisitors: 0,
    },
};

// GET - Fetch analytics data
export async function GET(request: NextRequest) {
    try {
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        let data: AnalyticsData;
        try {
            data = await readJsonFile<AnalyticsData>('analytics.json');
        } catch {
            // Create initial analytics file if doesn't exist
            data = INITIAL_ANALYTICS;
            await writeJsonFile('analytics.json', data);
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading analytics:', error);
        return NextResponse.json(INITIAL_ANALYTICS);
    }
}

// POST - Record page view
export async function POST(request: NextRequest) {
    try {
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { path, visitor } = await request.json();

        let data: AnalyticsData;
        try {
            data = await readJsonFile<AnalyticsData>('analytics.json');
        } catch {
            data = INITIAL_ANALYTICS;
        }

        // Add page view
        data.pageViews.push({
            path,
            timestamp: Date.now(),
            visitor: visitor || 'anonymous',
        });

        // Update project views if it's a project page
        if (path.includes('/projects/')) {
            const projectSlug = path.split('/projects/')[1]?.split('/')[0];
            if (projectSlug) {
                data.projectViews[projectSlug] =
                    (data.projectViews[projectSlug] || 0) + 1;
            }
        }

        // Update summary
        data.summary.totalViews = data.pageViews.length;
        const uniqueVisitors = new Set(data.pageViews.map((pv) => pv.visitor));
        data.summary.uniqueVisitors = uniqueVisitors.size;

        await writeJsonFile('analytics.json', data);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error recording page view:', error);
        return NextResponse.json(
            { error: 'Failed to record page view' },
            { status: 500 }
        );
    }
}
