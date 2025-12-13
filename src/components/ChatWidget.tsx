"use client";

// Glassmorphic AI Chatbot Widget
// Features: Bold glass effects, fluid animations, glowing message bubbles

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Mail } from 'lucide-react';
import { useChatbot } from '@/hooks/useChatbot';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

const WEBHOOK_URL = 'http://185.215.166.12:5678/webhook-test/yaksen-website-chatbot';

export default function ChatWidget() {
    const { language } = useLanguage();
    const {
        isVerified,
        isOpen,
        verify,
        toggleOpen,
    } = useChatbot();

    const [input, setInput] = useState('');

    // Email collection state
    const [email, setEmail] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [emailError, setEmailError] = useState('');

    // Chat state for webhook-based messaging
    const [chatMessages, setChatMessages] = useState<Array<{ id: string, role: 'user' | 'assistant', content: string }>>([]);
    const [isSending, setIsSending] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

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
    }, [chatMessages]);

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
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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

            let welcomeMessage = 'Welcome! How can I help you today!';
            try {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    welcomeMessage = data.message || data.reply || welcomeMessage;
                } else {
                    const textResponse = await response.text();
                    welcomeMessage = textResponse || welcomeMessage;
                }
            } catch (parseError) {
                console.log('Using default welcome message');
            }

            localStorage.setItem('yaksen_chatbot_email', email);
            setEmailSubmitted(true);

            setChatMessages([{
                id: 'welcome_' + Date.now(),
                role: 'assistant',
                content: welcomeMessage
            }]);

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

        const userMsg = {
            id: 'user_' + Date.now(),
            role: 'user' as const,
            content: userMessage
        };
        setChatMessages(prev => [...prev, userMsg]);
        setIsSending(true);

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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

            let replyMessage = 'I received your message.';
            try {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    replyMessage = data.message || data.reply || replyMessage;
                } else {
                    const textResponse = await response.text();
                    replyMessage = textResponse || replyMessage;
                }
            } catch (parseError) {
                console.error('Error parsing response:', parseError);
            }

            setChatMessages(prev => [...prev, {
                id: 'assistant_' + Date.now(),
                role: 'assistant',
                content: replyMessage
            }]);
        } catch (error) {
            console.error('Chat error:', error);
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
            {/* Animated GIF Toggle Button - Bottom Left */}
            <div className="fixed bottom-8 left-8 z-[60]">
                <motion.button
                    onClick={toggleOpen}
                    className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        y: [0, -8, 0],
                    }}
                    transition={{
                        y: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                >
                    {/* Glow ring on hover */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F14835] to-[#F14835]/50 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

                    {isOpen ? (
                        <div className="relative w-full h-full flex items-center justify-center bg-[#F14835] rounded-full">
                            <X className="w-8 h-8 text-white" />
                        </div>
                    ) : (
                        <Image
                            src="https://res.cloudinary.com/das8wrfd1/image/upload/v1743822916/hi_j74hqj.gif"
                            alt="Chat"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                            unoptimized
                        />
                    )}
                </motion.button>
            </div>

            {/* Glassmorphic Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: -20, y: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -20, y: 20 }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 200,
                            opacity: { duration: 0.3 }
                        }}
                        className="fixed bottom-28 left-8 z-50 w-[420px] max-w-[calc(100vw-4rem)] h-[650px] max-h-[calc(100vh-10rem)] flex flex-col overflow-hidden rounded-3xl"
                        style={{
                            background: 'rgba(10, 10, 15, 0.55)',
                            backdropFilter: 'blur(40px)',
                            WebkitBackdropFilter: 'blur(40px)',
                            border: '1px solid rgba(241, 72, 53, 0.15)',
                            boxShadow: `
                                0 8px 32px rgba(241, 72, 53, 0.15),
                                0 20px 60px rgba(0, 0, 0, 0.3),
                                inset 0 0 60px rgba(241, 72, 53, 0.05)
                            `
                        }}
                    >
                        {/* Header with gradient overlay */}
                        <div className="relative p-5 flex items-center justify-between border-b border-white/5"
                            style={{
                                background: 'linear-gradient(180deg, rgba(241, 72, 53, 0.2) 0%, rgba(241, 72, 53, 0.1) 50%, transparent 100%)'
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg tracking-wide">YAKSEN AI</h3>
                                    <p className="text-[#F14835]/70 text-xs">Online</p>
                                </div>
                            </div>
                            <motion.button
                                onClick={toggleOpen}
                                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-5 h-5" />
                            </motion.button>
                        </div>

                        {/* Content Area */}
                        {!emailSubmitted ? (
                            {/* Email Collection Screen */ }
                            < div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.1 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-[#F14835] blur-2xl opacity-30 animate-pulse" />
                            <Mail className="w-20 h-20 text-[#F14835] relative z-10" />
                        </motion.div>
                        <div>
                            <h4 className="text-2xl font-bold text-white mb-2">Get Started</h4>
                            <p className="text-gray-300 text-sm">Enter your email to chat with Yaksen AI</p>
                        </div>
                        <form onSubmit={handleEmailSubmit} className="w-full space-y-4">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#F14835] focus:ring-2 focus:ring-[#F14835]/50 transition-all placeholder:text-gray-500 text-sm backdrop-blur-xl"
                                    style={{
                                        boxShadow: '0 0 20px rgba(241, 72, 53, 0.1)'
                                    }}
                                />
                                {emailError && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs mt-2 text-left"
                                    >
                                        {emailError}
                                    </motion.p>
                                )}
                            </div>
                            <motion.button
                                type="submit"
                                className="w-full py-3 bg-[#F14835] text-white font-bold rounded-xl transition-all text-sm relative overflow-hidden group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    boxShadow: '0 0 30px rgba(241, 72, 53, 0.4)'
                                }}
                            >
                                <span className="relative z-10">Continue</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#F14835] to-[#ff6b5a] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                        </form>
                    </div>
                ) : !isVerified ? (
                {/* Initializing Screen */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#F14835] blur-2xl opacity-20 animate-pulse" />
                        <div className="w-16 h-16 border-4 border-[#F14835]/30 border-t-[#F14835] rounded-full animate-spin relative" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2">Initializing...</h4>
                        <p className="text-gray-400 text-sm">Setting up your AI assistant</p>
                    </div>
                </div>
                ) : (
                <>
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {chatMessages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                                <p className="text-sm text-gray-400">Start a conversation...</p>
                            </div>
                        )}

                        {chatMessages.map((msg, index) => (
                            <motion.div
                                key={msg.id}
                                initial={{
                                    opacity: 0,
                                    x: msg.role === 'user' ? 50 : -50,
                                    y: 20
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    y: 0
                                }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 200,
                                    delay: index * 0.05
                                }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] px-4 py-3 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-[#F14835] text-white rounded-br-sm'
                                            : 'bg-white/5 text-gray-100 border border-white/10 rounded-bl-sm backdrop-blur-xl'
                                        }`}
                                    style={msg.role === 'user' ? {
                                        boxShadow: '0 0 20px rgba(241, 72, 53, 0.4), 0 4px 12px rgba(241, 72, 53, 0.2)'
                                    } : {
                                        boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)'
                                    }}
                                >
                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                </div>
                            </motion.div>
                        ))}

                        {isSending && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div className="bg-white/5 backdrop-blur-xl px-5 py-3 rounded-2xl rounded-bl-sm border border-white/10">
                                    <div className="flex gap-1.5">
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                className="w-2 h-2 bg-[#F14835] rounded-full"
                                                animate={{
                                                    y: [-4, 4, -4],
                                                    opacity: [1, 0.5, 1]
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    delay: i * 0.15
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div
                        className="p-4 border-t border-white/5"
                        style={{
                            background: 'rgba(5, 5, 10, 0.6)',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#F14835] focus:ring-2 focus:ring-[#F14835]/50 transition-all placeholder:text-gray-500 text-sm backdrop-blur-xl"
                            />
                            <motion.button
                                type="submit"
                                disabled={isSending || !input.trim()}
                                className="p-3 bg-[#F14835] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    boxShadow: '0 0 20px rgba(241, 72, 53, 0.4)'
                                }}
                            >
                                <Send className="w-5 h-5 relative z-10" />
                                <motion.div
                                    className="absolute inset-0 bg-white/20"
                                    initial={{ scale: 0, opacity: 1 }}
                                    whileTap={{ scale: 2, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </motion.button>
                        </form>
                    </div>
                </>
                        )}
            </motion.div>
                )}
        </AnimatePresence >
        </>
    );
}
