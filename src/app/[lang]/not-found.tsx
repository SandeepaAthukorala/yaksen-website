"use client";

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const notFoundText = {
    en: {
        title: 'Page Not Found',
        description: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
        button: 'Return Home'
    },
    si: {
        title: 'පිටුව හමු නොවීය',
        description: 'ඔබ සොයන පිටුව ඉවත් කර ඇති, එහි නම වෙනස් කර ඇති හෝ තාවකාලිකව නොමැති විය හැක.',
        button: 'ආපසු මුල් පිටුවට'
    }
};

export default function NotFound() {
    const { language } = useLanguage();
    const text = notFoundText[language];

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-yaksen-black text-white relative overflow-hidden">
            {/* Background gradient mesh */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-mesh" />

            <div className="relative z-10 text-center px-6 max-w-2xl">
                {/* Animated 404 */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-[200px] md:text-[280px] font-black text-yaksen-red mb-0 select-none leading-none"
                >
                    404
                </motion.h1>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold mb-6 -mt-12"
                >
                    {text.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-gray-400 text-lg mb-12 leading-relaxed"
                >
                    {text.description}
                </motion.p>

                {/* Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yaksen-red to-yaksen-orange text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-yaksen-red/50 hover:scale-105 transition-all duration-300"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>{text.button}</span>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
