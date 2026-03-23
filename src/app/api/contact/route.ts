import { NextRequest, NextResponse } from 'next/server';

// API keys stored securely on server-side only
const WEB3FORMS_API = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY || "";

// Rate limiting map (in production, use Redis or a proper rate limiting solution)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const limit = rateLimitMap.get(ip);

    if (!limit || now > limit.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 });
        return true;
    }

    if (limit.count >= 5) {
        return false;
    }

    limit.count++;
    return true;
}

export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';

        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { name, email, phone, business, message, language } = body;

        if (!name || !phone || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate email format if provided
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Submit to Web3Forms (API key stays server-side)
        const response = await fetch(WEB3FORMS_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                subject: `New Contact from ${name} - Yaksen Website`,
                from_name: 'Yaksen Website',
                name,
                email,
                phone,
                business,
                message,
                language,
            }),
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Web3Forms submission failed');
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Contact form error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            {
                error: 'Failed to process request',
                details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
            },
            { status: 500 }
        );
    }
}
