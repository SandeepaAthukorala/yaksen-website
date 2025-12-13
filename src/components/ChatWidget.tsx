"use client";

// AI Chatbot Widget - Dragon Aesthetic
// Features: Dragon Eye Toggle, Shield Shape, Breathing Glow, Ember Particles

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Shield, Database, Clock, X, MessageCircle, Mail } from 'lucide-react';
import { useChatbot } from '@/hooks/useChatbot';
import { DragonEye } from './icons/DragonEye';
import { useLanguage } from '@/context/LanguageContext';

const WEBHOOK_URL = 'http://185.215.166.12:5678/webhook-test/yaksen-website-chatbot';

export default function ChatWidget() {
    const { language } = useLanguage();
    const {
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
    } = useChatbot();

    const [input, setInput] = useState('');
    const [showSources, setShowSources] = useState(false);
    const [showMemory, setShowMemory] = useState(false);

    // Email collection state
    const [email, setEmail] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [emailError, setEmailError] = useState('');

    // Chat state for webhook-based messaging
    const [chatMessages, setChatMessages] = useState<Array<{ id: string, role: 'user' | 'assistant', content: string }>>([]);
    const [isSending, setIsSending] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Load email from localStorage on mount
    useEffect(() => {
        const savedEmail = localStorage.getItem('yaksen_chatbot_email');
        if (savedEmail) {
            setEmail(savedEmail);
            setEmailSubmitted(true);
        }
    }, []);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Email validation function
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');

        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        }

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        try {
            // Send email to webhook with action: register
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'register',
                    email: email,
                    language: language,
                    timestamp: new Date().toISOString(),
                    source: 'chatbot'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit email');
            }

            // Get welcome message from webhook response
            const data = await response.json();
            const welcomeMessage = data.message || data.reply || 'Welcome! How can I help you today?';

            // Store email in localStorage
            localStorage.setItem('yaksen_chatbot_email', email);
            setEmailSubmitted(true);

            // Add welcome message to chat
            setChatMessages([{
                id: 'welcome_' + Date.now(),
                role: 'assistant',
                content: welcomeMessage
            }]);

            // Auto-verify to skip verification screen
            await verify();
        } catch (error) {
            console.error('Email submission error:', error);
            setEmailError('Failed to submit email. Please try again.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isSending) return;

        const userMessage = input.trim();
        setInput('');

        // Add user message to chat
        const userMsg = {
            id: 'user_' + Date.now(),
            role: 'user' as const,
            content: userMessage
        };
        setChatMessages(prev => [...prev, userMsg]);
        setIsSending(true);

        try {
            // Send message to webhook with action: chatting
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'chatting',
                    email: email,
                    message: userMessage,
                    language: language,
                    timestamp: new Date().toISOString()
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();
            const replyMessage = data.message || data.reply || 'I received your message.';

            // Add assistant response to chat
            setChatMessages(prev => [...prev, {
                id: 'assistant_' + Date.now(),
                role: 'assistant',
                content: replyMessage
            }]);
        } catch (error) {
            console.error('Chat error:', error);
            // Add error message
            setChatMessages(prev => [...prev, {
                id: 'error_' + Date.now(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            {/* Dragon Eye Toggle */}
            <div className="fixed bottom-8 right-8 z-[60]">
                <motion.button
                    onClick={toggleOpen}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative w-16 h-16 rounded-full flex items-center justify-center bg-black/80 backdrop-blur-sm border border-[#F14835]/30 shadow-lg overflow-hidden group hover:border-[#F14835] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="absolute inset-0 bg-[#F14835]/10" />
                    <div className="w-full h-full p-3 text-[#F14835]">
                        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
                    </div>
                </motion.button>
            </div>

            {/* Shield Chat Window */}
            <AnimatePresence>
                {isOpen && (

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-28 right-8 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-[#0A0A0A] border border-[#F14835]/30 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl rounded-2xl"
                    >
                        {/* Breathing Glow Border Effect */}
                        <div className="absolute inset-0 pointer-events-none rounded-[inherit] border border-[#F14835]/20 animate-pulse" />

                        {/* Header */}
                        <div className="relative bg-gradient-to-b from-[#F14835]/10 to-transparent p-4 flex items-center justify-between border-b border-[#F14835]/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#F14835]/10 rounded-lg border border-[#F14835]/20">
                                    <Shield className="w-5 h-5 text-[#F14835]" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-base tracking-wide">YAKSEN AI</h3>
                                    <p className="text-[#F14835]/70 text-[10px] uppercase tracking-widest">System Online</p>
                                </div>
                            </div>
                            <button onClick={toggleOpen} className="text-white/50 hover:text-white transition-colors p-1 hover:bg-white/5 rounded">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content Area */}
                        {!emailSubmitted ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#F14835] blur-xl opacity-20 animate-pulse" />
                                    <Mail className="w-20 h-20 text-[#F14835] relative z-10" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Enter Your Email</h4>
                                    <p className="text-gray-400 text-sm">Required to access Yaksen AI Assistant</p>
                                </div>
                                <form onSubmit={handleEmailSubmit} className="w-full space-y-4">
                                    <div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="w-full bg-gray-900/50 border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#F14835]/50 focus:bg-gray-900 transition-all placeholder:text-gray-600 text-sm"
                                        />
                                        {emailError && (
                                            <p className="text-red-400 text-xs mt-2 text-left">{emailError}</p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-[#F14835] text-white font-bold uppercase tracking-widest hover:bg-[#d63a28] transition-all rounded-lg text-sm"
                                    >
                                        Continue
                                    </button>
                                </form>
                            </div>
                        ) : !isVerified ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#F14835] blur-xl opacity-20 animate-pulse" />
                                    <Shield className="w-20 h-20 text-[#F14835] relative z-10" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Initializing...</h4>
                                    <p className="text-gray-400 text-sm">Setting up your AI assistant</p>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 bg-[#F14835] rounded-full animate-ping" />
                                    <div className="w-2 h-2 bg-[#F14835] rounded-full animate-ping delay-100" />
                                    <div className="w-2 h-2 bg-[#F14835] rounded-full animate-ping delay-200" />
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Controls */}
                                <div className="px-6 py-2 flex gap-2 border-b border-[#F14835]/10 bg-black/20">
                                    <button
                                        onClick={() => setShowSources(!showSources)}
                                        className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs uppercase tracking-wider font-medium border transition-all ${showSources ? 'border-[#F14835] text-[#F14835] bg-[#F14835]/10' : 'border-gray-800 text-gray-500 hover:text-gray-300'
                                            }`}
                                    >
                                        <Database className="w-3 h-3" /> Source
                                    </button>
                                    <button
                                        onClick={() => setShowMemory(!showMemory)}
                                        className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs uppercase tracking-wider font-medium border transition-all ${showMemory ? 'border-[#F14835] text-[#F14835] bg-[#F14835]/10' : 'border-gray-800 text-gray-500 hover:text-gray-300'
                                            }`}
                                    >
                                        <Clock className="w-3 h-3" /> Memory
                                    </button>
                                </div>

                                {/* Memory Panel */}
                                {showMemory && (
                                    <div className="bg-black/50 border-b border-[#F14835]/10 p-4 max-h-32 overflow-y-auto">
                                        {memory.length === 0 ? (
                                            <p className="text-xs text-gray-600 italic">No memory data available.</p>
                                        ) : (
                                            memory.map((m, i) => (
                                                <div key={i} className="mb-2 pb-2 border-b border-gray-800 last:border-0">
                                                    <p className="text-xs text-gray-400">Q: {m.q}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                    {chatMessages.length === 0 && (
                                        <div className="flex flex-col items-center justify-center h-full text-center opacity-30">
                                            <DragonEye isOpen={true} />
                                            <p className="mt-4 text-sm font-mono text-[#F14835]">Awaiting Input...</p>
                                        </div>
                                    )}

                                    {chatMessages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user'
                                                ? 'bg-[#F14835] text-white rounded-br-none'
                                                : 'bg-gray-800/80 text-gray-200 rounded-bl-none'
                                                }`}>
                                                <p className="text-sm leading-relaxed">{msg.content}</p>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isSending && (
                                        <div className="flex justify-start">
                                            <div className="bg-gray-900 p-4 border border-[#F14835]/30">
                                                <div className="flex gap-1.5">
                                                    <div className="w-1.5 h-1.5 bg-[#F14835] rounded-full animate-ping" />
                                                    <div className="w-1.5 h-1.5 bg-[#F14835] rounded-full animate-ping delay-100" />
                                                    <div className="w-1.5 h-1.5 bg-[#F14835] rounded-full animate-ping delay-200" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Error */}
                                {error && (
                                    <div className="p-2 bg-red-900/50 border-t border-red-500/30 flex justify-between items-center text-xs text-red-200">
                                        <span>Error: {error}</span>
                                        <button onClick={clearError}><X className="w-3 h-3" /></button>
                                    </div>
                                )}

                                {/* Input Area */}
                                <form onSubmit={handleSubmit} className="p-4 bg-black/40 border-t border-[#F14835]/10 pb-12">
                                    <div className="relative flex items-center">
                                        <input
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Ask Yaksen AI..."
                                            className="w-full bg-gray-900/50 border border-gray-800 text-white px-4 py-3 pr-12 rounded-lg focus:outline-none focus:border-[#F14835]/50 focus:bg-gray-900 transition-all placeholder:text-gray-600 text-sm"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSending || !input.trim()}
                                            className="absolute right-2 p-2 text-[#F14835] hover:text-white transition-colors disabled:opacity-30"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}

                        {/* Decorative Bottom Glow */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F14835] to-transparent opacity-50" />
                    </motion.div>
                )}
            </AnimatePresence >

            <style jsx global>{`
                @keyframes float-up {
                    0% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { transform: translateY(-30px); opacity: 0; }
                }
                .animate-float-up {
                    animation: float-up 3s ease-in-out infinite;
                }
                .animate-float-up-delayed {
                    animation: float-up 4s ease-in-out infinite 1.5s;
                }
            `}</style>
        </>
    );
}
