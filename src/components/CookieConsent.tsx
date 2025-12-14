"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Check, X } from "lucide-react";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Check local storage after mount
        const consent = localStorage.getItem("cookie-consent");
        if (consent === null) {
            // Small delay for dramatic effect
            setTimeout(() => setIsVisible(true), 2000);
        }
    }, []);

    const handleAction = (accepted: boolean) => {
        localStorage.setItem("cookie-consent", accepted.toString());
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                    className="fixed bottom-6 left-6 z-[100]"
                    onMouseEnter={() => setIsExpanded(true)}
                    onMouseLeave={() => setIsExpanded(false)}
                >
                    <div
                        className={`
              relative overflow-hidden backdrop-blur-md border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
              ${isExpanded
                                ? "bg-yaksen-black/90 border-yaksen-red/30 p-4 rounded-xl shadow-lg shadow-yaksen-red/10 w-[320px]"
                                : "bg-black/40 border-white/10 px-4 py-2 rounded-xl cursor-none hover:border-white/20 w-auto"
                            }
            `}
                    >
                        {/* Scanline Effect */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />

                        {/* Collapsed State */}
                        {!isExpanded && (
                            <div className="flex items-center gap-3 font-mono text-xs text-yaksen-red">
                                <Terminal className="w-3 h-3 animate-pulse" />
                                <span className="opacity-80 typing-effect whitespace-nowrap">
                                    &gt; cookies.init()<span className="animate-blink">_</span>
                                </span>
                            </div>
                        )}

                        {/* Expanded State */}
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-col gap-3"
                            >
                                {/* Header */}
                                <div className="flex items-center gap-2 text-xs font-mono text-yaksen-red/70 border-b border-yaksen-red/10 pb-2 mb-1">
                                    <span className="w-2 h-2 rounded-full bg-yaksen-red animate-pulse" />
                                    <span>SYSTEM_NOTIFICATION</span>
                                </div>

                                {/* Content */}
                                <p className="text-sm text-gray-300 font-sans leading-relaxed">
                                    <span className="text-yaksen-red font-mono text-xs mr-2">&gt;</span>
                                    We use cookies to optimize system performance and enhance your experience.
                                </p>

                                {/* Actions */}
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => handleAction(true)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-yaksen-red/10 border border-yaksen-red/30 hover:bg-yaksen-red hover:text-white text-yaksen-red text-xs font-mono rounded transition-all group"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            [
                                        </span>
                                        EXECUTE
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            ]
                                        </span>
                                        <Check className="w-3 h-3 ml-1" />
                                    </button>

                                    <button
                                        onClick={() => handleAction(false)}
                                        className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 text-xs font-mono rounded transition-colors"
                                        aria-label="Decline"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
