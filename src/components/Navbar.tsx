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
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${scrolled
                    ? "w-[90%] md:w-[600px] h-16 rounded-full glass-panel"
                    : "w-full h-24 bg-transparent border-transparent"
                    }`}
            >
                <div className={`h-full flex items-center justify-between px-6 ${scrolled ? "md:px-4" : "container mx-auto"
                    }`}>

                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2 group relative z-50">
                        <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-full border border-white/10 group-hover:border-yaksen-red/50 transition-colors">
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

                    {/* Desktop Center - Business Knowledge */}
                    <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
                        <Link
                            href="https://blogs.yaksen.cloud"
                            target="_blank"
                            className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${scrolled
                                ? "text-white/80 hover:text-yaksen-red"
                                : "text-white/70 hover:text-yaksen-red"
                                }`}
                        >
                            <span>{language === 'si' ? 'ව්‍යාපාරික දැනුම' : 'Business Knowledge'}</span>
                            {scrolled && <ArrowRight className="w-4 h-4 text-yaksen-red" />}
                        </Link>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-4">
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
                            className={`hidden md:flex items-center px-6 py-2 rounded-full text-sm font-bold transition-all btn-glow ${scrolled
                                ? "bg-gradient-to-r from-yaksen-red to-[#ff7e5f] text-white shadow-lg shadow-yaksen-red/25"
                                : "border border-yaksen-red/50 text-white hover:border-yaksen-red hover:bg-yaksen-red/10"
                                }`}
                        >
                            {language === 'si' ? 'කතා කරන්න' : "Let's Talk"}
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden text-white p-2"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
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

                        <div className="flex flex-col items-center gap-6 text-center">
                            <Link
                                href="https://blogs.yaksen.cloud"
                                target="_blank"
                                className="text-2xl font-medium text-white hover:text-yaksen-red transition-colors"
                            >
                                {language === 'si' ? 'ව්‍යාපාරික දැනුම' : 'Business Knowledge'}
                            </Link>

                            <hr className="w-12 border-white/10" />

                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 text-xl text-gray-400 hover:text-white transition-colors"
                            >
                                <Globe className="w-5 h-5" />
                                {language === 'si' ? 'English වලට මාරු වන්න' : 'Switch to Sinhala'}
                            </button>

                            <Link
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="mt-8 px-8 py-4 bg-yaksen-red rounded-full text-xl font-bold text-white shadow-lg shadow-yaksen-red/20"
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
