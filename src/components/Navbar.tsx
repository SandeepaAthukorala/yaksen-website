"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "මුල් පිටුව", href: "/" },
    { name: "ලිපි", href: "/blog" },
    { name: "මිල ගණන්", href: "/pricing" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-yaksen-black/80 border-b border-white/5"
        >
            <div className="container mx-auto px-6 py-4 md:px-12 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group z-50">
                    <Image
                        src="/logo.svg"
                        alt="Yaksen Logo"
                        width={40}
                        height={40}
                        className="w-10 h-10"
                    />
                    <span className="flex items-center gap-1.5" style={{ height: '40px' }}>
                        <span className="text-xl font-medium text-yaksen-red">Yaksen</span>
                        <span className="text-xl font-light text-yaksen-red">Creative Studio</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-gray-300 hover:text-yaksen-red transition-colors">
                        මුල් පිටුව
                    </Link>
                    <Link href="/work" className="text-sm font-medium text-gray-300 hover:text-yaksen-red transition-colors">
                        අපේ වැඩ
                    </Link>
                    <Link href="/#services" className="text-sm font-medium text-gray-300 hover:text-yaksen-red transition-colors">
                        සේවාවන්
                    </Link>
                    <Link href="/pricing" className="text-sm font-medium text-gray-300 hover:text-yaksen-red transition-colors">
                        මිල ගණන්
                    </Link>
                    <Link
                        href="#contact"
                        className="px-6 py-2 text-sm font-medium text-yaksen-red border border-yaksen-red rounded-full hover:bg-yaksen-red hover:text-white transition-all duration-300"
                    >
                        කතා කරන්න
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Navigation Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-0 right-0 bg-yaksen-black border-b border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
                        >
                            <Link href="/" className="text-lg font-medium text-gray-300 hover:text-yaksen-red transition-colors" onClick={() => setIsOpen(false)}>
                                මුල් පිටුව
                            </Link>
                            <Link href="/work" className="text-lg font-medium text-gray-300 hover:text-yaksen-red transition-colors" onClick={() => setIsOpen(false)}>
                                අපේ වැඩ
                            </Link>
                            <Link href="/#services" className="text-lg font-medium text-gray-300 hover:text-yaksen-red transition-colors" onClick={() => setIsOpen(false)}>
                                සේවාවන්
                            </Link>
                            <Link href="/pricing" className="text-lg font-medium text-gray-300 hover:text-yaksen-red transition-colors" onClick={() => setIsOpen(false)}>
                                මිල ගණන්
                            </Link>
                            <Link
                                href="#contact"
                                className="text-lg font-medium text-yaksen-red hover:text-white transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                කතා කරන්න
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
