'use client';

// AI Chatbot Widget - Floating button and modal interface

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Shield, Database, Clock } from 'lucide-react';
import { useChatbot } from '@/hooks/useChatbot';

export default function ChatWidget() {
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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        await sendMessage(input);
        setInput('');
    };

    const handleVerify = async () => {
        await verify();
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={toggleOpen}
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#F14835] to-[#d63a28] text-white shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle chatbot"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-[#0A0A0A] border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#F14835] to-[#d63a28] px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <MessageCircle className="w-5 h-5 text-white" />
                                <div>
                                    <h3 className="text-white font-bold text-sm">Yaksen Assistant</h3>
                                    <p className="text-white/80 text-xs">AI-powered support</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleOpen}
                                className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                                aria-label="Close chat"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Verification Gate */}
                        {!isVerified && (
                            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-900 to-[#0A0A0A]">
                                <Shield className="w-16 h-16 text-[#F14835] mb-4" />
                                <h4 className="text-white font-bold text-lg mb-2">Verify to Continue</h4>
                                <p className="text-gray-400 text-sm text-center mb-6">
                                    Please verify you're not a robot to start chatting
                                </p>
                                <button
                                    onClick={handleVerify}
                                    disabled={isLoading}
                                    className="px-6 py-3 bg-[#F14835] hover:bg-[#d63a28] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Verifying...' : "I'm not a robot"}
                                </button>
                            </div>
                        )}

                        {/* Chat Interface */}
                        {isVerified && (
                            <>
                                {/* Info Toggles */}
                                <div className="px-4 py-2 border-b border-gray-800 flex gap-2">
                                    <button
                                        onClick={() => setShowSources(!showSources)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${showSources
                                                ? 'bg-[#F14835] text-white'
                                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                            }`}
                                    >
                                        <Database className="w-3 h-3 inline mr-1" />
                                        Sources
                                    </button>
                                    <button
                                        onClick={() => setShowMemory(!showMemory)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${showMemory
                                                ? 'bg-[#F14835] text-white'
                                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                            }`}
                                    >
                                        <Clock className="w-3 h-3 inline mr-1" />
                                        Memory ({memory.length})
                                    </button>
                                </div>

                                {/* Memory Display */}
                                {showMemory && memory.length > 0 && (
                                    <div className="px-4 py-3 bg-gray-900 border-b border-gray-800 max-h-32 overflow-y-auto">
                                        <div className="text-xs text-gray-400 space-y-2">
                                            {memory.map((item, idx) => (
                                                <div key={idx} className="pb-2 border-b border-gray-800 last:border-0">
                                                    <div className="text-gray-500">Q: {item.q}</div>
                                                    <div className="text-gray-400">A: {item.a}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {messages.length === 0 && (
                                        <div className="text-center text-gray-500 text-sm mt-8">
                                            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                            <p>Ask me anything about Yaksen Creative Studio!</p>
                                        </div>
                                    )}

                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                                        ? 'bg-[#F14835] text-white'
                                                        : 'bg-gray-800 text-gray-100'
                                                    }`}
                                            >
                                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                                                {/* Sources */}
                                                {showSources && message.sources && message.sources.length > 0 && (
                                                    <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-400">
                                                        Sources: {message.sources.join(', ')}
                                                    </div>
                                                )}

                                                <div className="text-xs opacity-50 mt-1">
                                                    {message.timestamp.toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-gray-800 rounded-2xl px-4 py-3">
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Error Display */}
                                {error && (
                                    <div className="px-4 py-2 bg-red-900/20 border-t border-red-900/50 text-red-400 text-xs flex items-center justify-between">
                                        <span>{error}</span>
                                        <button onClick={clearError} className="text-red-400 hover:text-red-300">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}

                                {/* Input */}
                                <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Type your message..."
                                            disabled={isLoading}
                                            className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F14835] disabled:opacity-50 text-sm"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading || !input.trim()}
                                            className="bg-[#F14835] hover:bg-[#d63a28] text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            aria-label="Send message"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
