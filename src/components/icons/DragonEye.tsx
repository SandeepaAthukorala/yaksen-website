import React from 'react';
import { motion } from 'framer-motion';

export const DragonEye = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Sclera (Outer Eye) */}
            <motion.path
                d="M10,50 Q50,10 90,50 Q50,90 10,50 Z"
                fill="#1a1a1a"
                stroke="#F14835"
                strokeWidth="2"
                initial={{ scaleY: 0.1 }}
                animate={{ scaleY: isOpen ? 1.2 : 1, scaleX: isOpen ? 1 : 1 }}
                transition={{ duration: 0.4 }}
                className="origin-center"
            />

            {/* Iris */}
            <motion.circle
                cx="50"
                cy="50"
                r="30"
                fill="#F14835"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: isOpen ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                filter="url(#glow)"
            />

            {/* Pupil (Vertical Slit) */}
            <motion.ellipse
                cx="50"
                cy="50"
                rx="3"
                ry="25"
                fill="#000"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isOpen ? 0.8 : 1, scaleX: isOpen ? 2 : 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            />

            {/* Highlights */}
            <motion.circle
                cx="65"
                cy="35"
                r="4"
                fill="#fff"
                opacity="0.8"
                animate={{ opacity: isOpen ? 0.8 : 0.4 }}
            />
        </svg>
    );
};
