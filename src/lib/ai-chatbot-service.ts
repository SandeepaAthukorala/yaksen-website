// AI Chatbot Service - Handles MD ingestion, context retrieval, and Gemini API calls

import fs from 'fs';
import path from 'path';

// Types
export interface KnowledgeChunk {
    chunk_id: string;
    text: string;
    section: string;
    tokens: number;
}

export interface ConversationMemory {
    sessionId: string;
    history: Array<{ q: string; a: string }>;
    verified: boolean;
}

export interface ChatResponse {
    reply: string;
    sources: string[];
    memory: Array<{ q: string; a: string }>;
}

// In-memory knowledge base
let knowledgeBase: KnowledgeChunk[] = [];
let isInitialized = false;

/**
 * Estimate token count (rough approximation: 1 token ≈ 4 characters)
 */
function estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
}

/**
 * Parse and chunk the markdown knowledge base
 */
export function ingestMarkdownKnowledge(): void {
    if (isInitialized) return;

    const mdPath = path.join(process.cwd(), 'content_guide.md');
    const content = fs.readFileSync(mdPath, 'utf-8');

    // Split by major sections (headers starting with numbers)
    const sections = content.split(/\n(?=\d+\.\s+[A-Z])/);

    knowledgeBase = [];
    let chunkCounter = 0;

    sections.forEach((section) => {
        const lines = section.trim().split('\n');
        if (lines.length === 0) return;

        // Extract section title
        const titleMatch = lines[0].match(/^\d+\.\s+(.+)/);
        const sectionTitle = titleMatch ? titleMatch[1] : 'Introduction';

        // Join all content for this section
        const sectionText = lines.join('\n');
        const tokens = estimateTokens(sectionText);

        // If section is small enough (<500 tokens), store as one chunk
        if (tokens <= 500) {
            knowledgeBase.push({
                chunk_id: `chunk_${chunkCounter++}`,
                text: sectionText,
                section: sectionTitle,
                tokens,
            });
        } else {
            // Split large sections into smaller chunks
            const maxChunkSize = 2000; // characters (≈500 tokens)
            let currentChunk = '';
            let currentLines: string[] = [];

            lines.forEach((line) => {
                if (currentChunk.length + line.length > maxChunkSize && currentChunk.length > 0) {
                    // Save current chunk
                    knowledgeBase.push({
                        chunk_id: `chunk_${chunkCounter++}`,
                        text: currentLines.join('\n'),
                        section: sectionTitle,
                        tokens: estimateTokens(currentLines.join('\n')),
                    });
                    currentChunk = '';
                    currentLines = [];
                }
                currentChunk += line + '\n';
                currentLines.push(line);
            });

            // Save remaining chunk
            if (currentChunk.trim()) {
                knowledgeBase.push({
                    chunk_id: `chunk_${chunkCounter++}`,
                    text: currentLines.join('\n'),
                    section: sectionTitle,
                    tokens: estimateTokens(currentLines.join('\n')),
                });
            }
        }
    });

    isInitialized = true;
    console.log(`[AI Chatbot] Ingested ${knowledgeBase.length} knowledge chunks`);
}

/**
 * Simple keyword-based context retrieval
 */
export function retrieveRelevantContext(query: string, topN: number = 3): KnowledgeChunk[] {
    if (!isInitialized) {
        ingestMarkdownKnowledge();
    }

    // Extract keywords (simple: lowercase, split by spaces, filter common words)
    const stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for', 'of', 'as', 'by']);
    const keywords = query
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter((word) => word.length > 2 && !stopWords.has(word));

    // Score each chunk by keyword overlap
    const scoredChunks = knowledgeBase.map((chunk) => {
        const chunkLower = chunk.text.toLowerCase();
        const score = keywords.reduce((acc, keyword) => {
            // Count occurrences of keyword (weighted by frequency)
            const matches = (chunkLower.match(new RegExp(keyword, 'g')) || []).length;
            return acc + matches;
        }, 0);

        return { chunk, score };
    });

    // Sort by score descending
    scoredChunks.sort((a, b) => b.score - a.score);

    // Return top N chunks
    return scoredChunks.slice(0, topN).map((sc) => sc.chunk);
}

/**
 * Build Gemini prompt with context and memory
 */
export function buildPromptWithContext(
    userQuery: string,
    context: KnowledgeChunk[],
    memory: Array<{ q: string; a: string }>
): string {
    const contextSection = context
        .map((chunk) => `[${chunk.chunk_id}] ${chunk.section}:\n${chunk.text}`)
        .join('\n\n---\n\n');

    const memorySection = memory.length > 0
        ? memory.map((item, idx) => `${idx + 1}. Q: ${item.q}\n   A: ${item.a}`).join('\n')
        : 'No previous conversation.';

    return `You are the Yaksen Knowledge Agent, an AI assistant for Yaksen Creative Studio.

CONTEXT (from knowledge base):
${contextSection}

CONVERSATION HISTORY:
${memorySection}

USER QUESTION:
${userQuery}

INSTRUCTIONS:
- Answer using ONLY the provided context above
- When referencing information, cite the chunk ID in brackets (e.g., [chunk_0])
- If the context doesn't contain enough information to answer, politely say you don't have that information in your knowledge base
- Be professional, friendly, and concise
- Use Yaksen's brand voice: competent, mentor-like, punchy
- Respond in the same language as the user's question (Sinhala or English)

RESPONSE:`;
}

/**
 * Call Gemini API with retry logic
 */
export async function callGeminiAPI(prompt: string, retries: number = 3): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is not set');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt,
                                },
                            ],
                        },
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1024,
                        topP: 0.95,
                        topK: 40,
                    },
                    safetySettings: [
                        {
                            category: 'HARM_CATEGORY_HARASSMENT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
                        },
                        {
                            category: 'HARM_CATEGORY_HATE_SPEECH',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
                        },
                    ],
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();

            // Extract text from response
            if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
                return data.candidates[0].content.parts[0].text;
            }

            throw new Error('Invalid response format from Gemini API');
        } catch (error) {
            console.error(`[AI Chatbot] Attempt ${attempt + 1} failed:`, error);

            if (attempt === retries - 1) {
                throw error;
            }

            // Exponential backoff
            await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
    }

    throw new Error('Failed to call Gemini API after retries');
}

/**
 * Parse memory from cookie string
 */
export function parseMemoryCookie(cookieValue: string | undefined): ConversationMemory {
    if (!cookieValue) {
        return {
            sessionId: generateSessionId(),
            history: [],
            verified: false,
        };
    }

    try {
        return JSON.parse(decodeURIComponent(cookieValue));
    } catch {
        return {
            sessionId: generateSessionId(),
            history: [],
            verified: false,
        };
    }
}

/**
 * Generate a simple session ID
 */
function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Update conversation memory (keep last 5 items)
 */
export function updateMemory(
    currentMemory: ConversationMemory,
    userQuery: string,
    aiResponse: string
): ConversationMemory {
    const newHistory = [
        ...currentMemory.history,
        {
            q: userQuery.substring(0, 100), // Truncate to save space
            a: aiResponse.substring(0, 200),
        },
    ].slice(-5); // Keep last 5 items

    return {
        ...currentMemory,
        history: newHistory,
    };
}

/**
 * Format memory as cookie string
 */
export function formatMemoryCookie(memory: ConversationMemory): string {
    return encodeURIComponent(JSON.stringify(memory));
}
