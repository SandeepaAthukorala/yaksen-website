// API Route: /api/chat
// Handles chatbot requests with security, rate limiting, and memory management

import { NextRequest, NextResponse } from 'next/server';
import {
    ingestMarkdownKnowledge,
    retrieveRelevantContext,
    buildPromptWithContext,
    callGeminiAPI,
    parseMemoryCookie,
    updateMemory,
    formatMemoryCookie,
} from '@/lib/ai-chatbot-service';

// Rate limiting (simple in-memory store)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

/**
 * Check rate limit for IP
 */
function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitStore.get(ip);

    if (!record || now > record.resetAt) {
        rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
        return true;
    }

    if (record.count >= RATE_LIMIT) {
        return false;
    }

    record.count++;
    return true;
}

/**
 * Get client IP address
 */
function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    return ip;
}

/**
 * POST /api/chat
 */
export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const clientIP = getClientIP(request);

        // Check rate limit
        if (!checkRateLimit(clientIP)) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        // Parse request body
        const body = await request.json();
        const { message } = body;

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Invalid request: message is required' },
                { status: 400 }
            );
        }

        if (message.length > 1000) {
            return NextResponse.json(
                { error: 'Message too long (max 1000 characters)' },
                { status: 400 }
            );
        }

        // Get cookies
        const cookieHeader = request.headers.get('cookie') || '';
        const cookies = Object.fromEntries(
            cookieHeader.split(';').map((c) => {
                const [key, ...valueParts] = c.trim().split('=');
                return [key, valueParts.join('=')];
            })
        );

        // Check "I'm not a robot" verification
        const chatAllowed = cookies['chat_allowed'];
        if (chatAllowed !== 'true') {
            return NextResponse.json(
                { error: 'Please verify you are not a robot first' },
                { status: 403 }
            );
        }

        // Parse conversation memory
        const memory = parseMemoryCookie(cookies['chat_memory']);

        // Initialize knowledge base (lazy loading)
        ingestMarkdownKnowledge();

        // Retrieve relevant context chunks
        const contextChunks = retrieveRelevantContext(message, 3);

        // Build prompt
        const prompt = buildPromptWithContext(message, contextChunks, memory.history);

        // Call Gemini API
        console.log(`[AI Chatbot] Processing query: "${message.substring(0, 50)}..."`);
        const aiResponse = await callGeminiAPI(prompt);

        // Update memory
        const updatedMemory = updateMemory(memory, message, aiResponse);

        // Prepare response
        const responseData = {
            reply: aiResponse,
            sources: contextChunks.map((chunk) => chunk.chunk_id),
            memory: updatedMemory.history,
        };

        // Create response with updated cookies
        const response = NextResponse.json(responseData);

        // Set memory cookie
        response.cookies.set('chat_memory', formatMemoryCookie(updatedMemory), {
            httpOnly: false, // Accessible to client JS
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return response;
    } catch (error) {
        console.error('[AI Chatbot] Error processing request:', error);

        // Don't leak internal errors to client
        return NextResponse.json(
            { error: 'An error occurred while processing your request. Please try again.' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/chat/verify
 * Verify "I'm not a robot"
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'verify') {
        const response = NextResponse.json({ verified: true });

        // Set chat_allowed cookie
        response.cookies.set('chat_allowed', 'true', {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return response;
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
