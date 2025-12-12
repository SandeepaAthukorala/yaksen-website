import { NextRequest, NextResponse } from 'next/server';

// Webhook URL stored securely on server-side only
// Using HTTP is safe here since this connection is server-to-server and hidden from public
const WEBHOOK_URL = "http://185.215.166.12:5678/webhook/yaksen-website";

// Rate limiting map (in production, use Redis or a proper rate limiting solution)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const limit = rateLimitMap.get(ip);

    if (!limit || now > limit.resetTime) {
        // Reset or create new limit (5 requests per hour)
        rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 });
        return true;
    }

    if (limit.count >= 5) {
        return false; // Rate limit exceeded
    }

    limit.count++;
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // Parse and validate request body
        const body = await request.json();
        const { name, phone, business, service, message, timestamp, language } = body;

        // Basic validation
        if (!name || !phone || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Forward to webhook
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                phone,
                business,
                service,
                message,
                timestamp,
                language,
                submittedFrom: 'yaksen-website',
                clientIp: ip
            }),
        });

        if (!response.ok) {
            throw new Error('Webhook request failed');
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
