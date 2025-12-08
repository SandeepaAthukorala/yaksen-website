// Custom React hook for chatbot functionality

import { useState, useCallback, useEffect } from 'react';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    sources?: string[];
    timestamp: Date;
}

export interface UseChatbotReturn {
    messages: Message[];
    isVerified: boolean;
    isOpen: boolean;
    isLoading: boolean;
    error: string | null;
    memory: Array<{ q: string; a: string }>;
    verify: () => Promise<void>;
    sendMessage: (message: string) => Promise<void>;
    toggleOpen: () => void;
    clearError: () => void;
}

export function useChatbot(): UseChatbotReturn {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isVerified, setIsVerified] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [memory, setMemory] = useState<Array<{ q: string; a: string }>>([]);

    // Check if already verified on mount
    useEffect(() => {
        const chatAllowed = document.cookie
            .split('; ')
            .find((row) => row.startsWith('chat_allowed='))
            ?.split('=')[1];

        if (chatAllowed === 'true') {
            setIsVerified(true);
        }
    }, []);

    const verify = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/chat?action=verify');

            if (!response.ok) {
                throw new Error('Verification failed');
            }

            setIsVerified(true);
            setError(null);
        } catch (err) {
            console.error('Verification error:', err);
            setError('Failed to verify. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const sendMessage = useCallback(async (message: string) => {
        if (!isVerified) {
            setError('Please verify you are not a robot first');
            return;
        }

        if (!message.trim()) {
            return;
        }

        // Add user message to UI
        const userMessage: Message = {
            id: `user_${Date.now()}`,
            role: 'user',
            content: message,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                const errorData = await response.json() as { error?: string };
                throw new Error(errorData.error || 'Failed to send message');
            }

            const data = await response.json() as { reply: string; sources?: string[]; memory?: Array<{ q: string; a: string }> };

            // Add assistant message to UI
            const assistantMessage: Message = {
                id: `assistant_${Date.now()}`,
                role: 'assistant',
                content: data.reply,
                sources: data.sources,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setMemory(data.memory || []);
        } catch (err) {
            console.error('Send message error:', err);
            setError(err instanceof Error ? err.message : 'An error occurred');

            // Remove user message if send failed
            setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
        } finally {
            setIsLoading(false);
        }
    }, [isVerified]);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        messages,
        isVerified,
        isOpen,
        isLoading,
        error,
        memory,
        verify,
        sendMessage,
        toggleOpen,
        clearError,
    };
}
