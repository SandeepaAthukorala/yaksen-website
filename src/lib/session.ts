import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SESSION_SECRET = new TextEncoder().encode(
    process.env.SESSION_SECRET || 'default-secret-please-change-in-env'
);
const SESSION_COOKIE_NAME = 'admin-session';
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface SessionPayload {
    username: string;
    expiresAt: number;
}

export async function createSession(username: string): Promise<string> {
    const expiresAt = Date.now() + SESSION_DURATION;

    const token = await new SignJWT({ username, expiresAt })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(new Date(expiresAt))
        .sign(SESSION_SECRET);

    return token;
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
    try {
        const verified = await jwtVerify(token, SESSION_SECRET);
        return verified.payload as SessionPayload;
    } catch (error) {
        return null;
    }
}

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
        return null;
    }

    return verifySession(token);
}

export async function setSessionCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_DURATION / 1000, // Convert to seconds
        path: '/',
    });
}

export async function deleteSessionCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}
