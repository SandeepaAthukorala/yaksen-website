"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Terminal, ShieldAlert, ArrowLeft, Bug } from 'lucide-react';
import { useState, useEffect } from 'react';

const aiDialogue = {
    en: [
        "Scanning sector...",
        "Error 404: Coordinate invalid.",
        "I've checked 400 petabytes of data. This page doesn't exist.",
        "Did you glitch through the matrix?"
    ],
    si: [
        "පද්ධතිය පරිලෝකනය කරමින් පවතී...",
        "දෝෂය 404: ඛණ්ඩාංක වලංගු නොවේ.",
        "මම දත්ත පෙටබයිට් 400ක් පරීක්ෂා කළෙමි. මෙම පිටුව සොයාගත නොහැක.",
        "ඔබ ඩිජිටල් අවකාශයෙන් ඉවතට විසි වී තිබේද?"
    ]
};

export default function NotFound() {
    const { language } = useLanguage();
    const [dialogueStep, setDialogueStep] = useState(0);

    // Typing effect logic
    useEffect(() => {
        if (dialogueStep < 4) {
            const timeout = setTimeout(() => {
                setDialogueStep(prev => prev + 1);
            }, dialogueStep === 0 ? 1000 : 1500); // Varied delays for realism
            return () => clearTimeout(timeout);
        }
    }, [dialogueStep]);

    const messages = aiDialogue[language] || aiDialogue.en;

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-yaksen-black text-white relative overflow-hidden font-mono">

            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />
                <div className="absolute inset-0 opacity-20 bg-gradient-radial" />
            </div>

            <div className="relative z-10 max-w-2xl w-full px-6">

                {/* Terminal Window */}
                <div className="glass-panel-strong rounded-xl border-t border-white/10 overflow-hidden shadow-2xl shadow-yaksen-red/10">

                    {/* Header */}
                    <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="text-[10px] text-white/30 tracking-widest uppercase">Yaksen_OS // v2.0.4</div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 min-h-[300px] flex flex-col justify-end items-start space-y-4 font-mono text-sm sm:text-base">

                        {/* Line 1: System Scan */}
                        {dialogueStep >= 1 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-yaksen-red/70">
                                <Terminal className="w-4 h-4" />
                                <span>&gt; SYSTEM: {messages[0]}</span>
                            </motion.div>
                        )}

                        {/* Line 2: Error Flash */}
                        {dialogueStep >= 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 text-red-500 font-bold"
                            >
                                <ShieldAlert className="w-4 h-4" />
                                <span className="uppercase">&gt; {messages[1]}</span>
                            </motion.div>
                        )}

                        {/* Line 3: AI Message 1 */}
                        {dialogueStep >= 3 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="pl-7 text-white/90 border-l-2 border-yaksen-red/50 pl-4 py-1"
                            >
                                "{messages[2]}"
                            </motion.div>
                        )}

                        {/* Line 4: AI Message 2 + Actions */}
                        {dialogueStep >= 4 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="pl-7 text-yaksen-red/90 mb-6">
                                    "{messages[3]}"
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-4 pl-7">
                                    <Link href="/" className="group relative overflow-hidden px-6 py-3 bg-white text-yaksen-black font-bold text-sm tracking-wider uppercase hover:bg-yaksen-red hover:text-white transition-all duration-300">
                                        <span className="relative z-10 flex items-center gap-2">
                                            <ArrowLeft className="w-4 h-4" />
                                            [ RETURN_TO_BASE ]
                                        </span>
                                    </Link>

                                    <Link href="/#contact" className="group relative overflow-hidden px-6 py-3 border border-white/20 text-white/70 font-medium text-sm tracking-wider uppercase hover:text-yaksen-red hover:border-yaksen-red transition-all duration-300">
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Bug className="w-4 h-4" />
                                            [ REPORT_ANOMALY ]
                                        </span>
                                    </Link>
                                </div>
                            </motion.div>
                        )}

                        {/* Blinking Cursor */}
                        {dialogueStep < 4 && (
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2 h-4 bg-yaksen-red ml-7"
                            />
                        )}

                    </div>
                </div>

                {/* Decorative Footer */}
                <div className="mt-8 text-center text-xs text-white/10 font-mono">
                    ERROR_CODE: 0x404_PAGE_NOT_FOUND // MEMORY_DUMP_COMPLETE
                </div>
            </div>
        </div>
    );
}
