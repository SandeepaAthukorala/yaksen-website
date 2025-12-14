"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { language, setLanguage } = useLanguage();
    const [showLangMenu, setShowLangMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === 'si' ? 'en' : 'si');
        setShowLangMenu(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-6 left-0 right-0 z-50"
            >
                <div
                    className={`mx-auto transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${scrolled
                        ? "max-w-[95%] sm:max-w-[90%] md:max-w-[700px] h-14 sm:h-16 rounded-full px-4 sm:px-6"
                        : "container h-20 sm:h-24 bg-transparent px-4 sm:px-6"
                        }`}
                    style={{
                        willChange: scrolled ? 'auto' : 'max-width, height, border-radius',
                        outline: 'none !important',
                        border: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                        boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.4)' : 'none',
                        WebkitTapHighlightColor: 'transparent',
                        ...(scrolled && {
                            background: 'rgba(10, 10, 15, 0.85)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)'
                        })
                    }}
                >
                    <div className="h-full flex items-center justify-between">

                        {/* Brand */}
                        <Link href="/" className="flex items-center gap-2 group relative z-50">
                            <div className="relative w-9 h-9 sm:w-10 sm:h-10 overflow-hidden rounded-full border border-white/10 group-hover:border-yaksen-red/50 transition-colors">
                                <Image
                                    src="/logo.svg"
                                    alt="Yaksen"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <AnimatePresence>
                                {!scrolled && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="text-xl font-medium text-white hidden md:block overflow-hidden whitespace-nowrap tracking-tight"
                                    >
                                        Yaksen
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>

                        {/* Right Controls */}
                        <div className="flex items-center gap-4">
                            {/* Business Knowledge Link */}
                            <Link
                                href="https://blogs.yaksen.cloud"
                                target="_blank"
                                className={`hidden md:flex items-center gap-2 text-sm font-medium transition-all duration-300 ${scrolled
                                    ? "text-white/80 hover:text-yaksen-red"
                                    : "text-white/70 hover:text-yaksen-red"
                                    }`}
                            >
                                <span>{language === 'si' ? 'ව්‍යාපාරික දැනුම' : 'Business Knowledge'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            {/* Language Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowLangMenu(!showLangMenu)}
                                    className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                                >
                                    <Globe className="w-5 h-5" />
                                </button>
                                <AnimatePresence>
                                    {showLangMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-full right-0 mt-2 rounded-xl p-2 w-32 glass-panel"
                                        >
                                            <button
                                                onClick={() => { setLanguage('si'); setShowLangMenu(false); }}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${language === 'si' ? 'bg-white/10 text-yaksen-red' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                            >
                                                Sinhala
                                            </button>
                                            <button
                                                onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${language === 'en' ? 'bg-white/10 text-yaksen-red' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                            >
                                                English
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* CTA Button */}
                            <Link
                                href="#contact"
                                className={`hidden md:flex items-center px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all btn-glow ${scrolled
                                    ? "bg-gradient-to-r from-yaksen-red to-[#ff7e5f] text-white shadow-lg shadow-yaksen-red/25"
                                    : "border border-yaksen-red/50 text-white hover:border-yaksen-red hover:bg-yaksen-red/10"
                                    }`}
                            >
                                {language === 'si' ? 'කතා කරන්න' : "Let's Talk"}
                            </Link>

                            {/* Mobile Toggle */}
                            <button
                                className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-yaksen-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 space-y-8"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-white/50 hover:text-white"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="flex flex-col items-center gap-8 text-center px-6">
                            <Link
                                href="https://blogs.yaksen.cloud"
                                target="_blank"
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-medium text-white hover:text-yaksen-red transition-colors min-h-[44px] flex items-center"
                            >
                                {language === 'si' ? 'ව්‍යාපාරික දැනුම' : 'Business Knowledge'}
                            </Link>

                            <hr className="w-16 border-white/10" />

                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-3 text-xl text-gray-400 hover:text-white transition-colors min-h-[44px] px-4"
                            >
                                <Globe className="w-6 h-6" />
                                {language === 'si' ? 'English වලට මාරු වන්න' : 'Switch to Sinhala'}
                            </button>

                            <Link
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="mt-4 px-10 py-5 bg-yaksen-red rounded-full text-xl font-bold text-white shadow-lg shadow-yaksen-red/20 min-h-[56px] flex items-center justify-center"
                            >
                                {language === 'si' ? 'කතා කරන්න' : "Let's Talk"}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
