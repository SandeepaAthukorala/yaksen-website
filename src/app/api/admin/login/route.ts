import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createSession, setSessionCookie } from '@/lib/session';
import { isLocalhost } from '@/lib/file-utils';

export async function POST(request: NextRequest) {
    try {
        // Verify request is from localhost
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json(
                { error: 'Admin API is only accessible on localhost' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { username, password } = body;

        // Validate input
        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // Get credentials from environment
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminPasswordHash) {
            console.error('ADMIN_PASSWORD_HASH not set in environment variables');
            return NextResponse.json(
                { error: 'Admin credentials not configured' },
                { status: 500 }
            );
        }

        // Verify credentials
        const isValidUsername = username === adminUsername;
        const isValidPassword = await bcrypt.compare(password, adminPasswordHash);

        if (!isValidUsername || !isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid username or password' },
                { status: 401 }
            );
        }

        // Create session
        const sessionToken = await createSession(username);

        // Set cookie  
        const response = NextResponse.json({ success: true });
        await setSessionCookie(sessionToken);

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'An error occurred during login' },
            { status: 500 }
        );
    }
}
