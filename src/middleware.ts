import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { verifySession } from "./lib/session";

let locales = ["en"];
export let defaultLocale = "en";

function getLocale(request: NextRequest): string {
    return defaultLocale;
}

function isLocalhost(host: string | null): boolean {
    if (!host) return false;
    return (
        host.includes('localhost') ||
        host.includes('127.0.0.1') ||
        host.includes('[::1]')
    );
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const host = request.headers.get('host');

    // Skip all API routes (including admin API) from locale handling
    if (pathname.startsWith('/api/')) {
        // Admin API security: only accessible on localhost
        if (pathname.startsWith('/api/admin/')) {
            if (!isLocalhost(host)) {
                return NextResponse.json(
                    { error: 'Admin API is only accessible on localhost' },
                    { status: 403 }
                );
            }
        }
        return NextResponse.next();
    }

    // Admin panel security checks
    if (pathname.startsWith('/admin')) {
        // Only allow admin access on localhost
        if (!isLocalhost(host)) {
            return NextResponse.json(
                { error: 'Admin panel is only accessible on localhost' },
                { status: 403 }
            );
        }

        // Allow access to login page without authentication
        if (pathname === '/admin/login' || pathname === '/admin/login/') {
            return NextResponse.next();
        }

        // Check for valid session
        const sessionCookie = request.cookies.get('admin-session');
        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        const session = await verifySession(sessionCookie.value);
        if (!session || session.expiresAt < Date.now()) {
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin-session');
            return response;
        }

        return NextResponse.next();
    }

    // Locale handling for non-admin routes
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next) and static assets
        // Include /admin and /api/admin for security checks
        '/((?!_next|favicon.ico|.*\\..*).*)',
    ],
};

