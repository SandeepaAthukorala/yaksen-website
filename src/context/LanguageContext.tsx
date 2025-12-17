"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'si' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

import { useRouter, usePathname } from 'next/navigation';

export function LanguageProvider({ children, initialLang }: { children: ReactNode; initialLang: Language }) {
    // Force English regardless of initialLang
    const [language, setLanguageState] = useState<Language>('en');
    const router = useRouter();
    const pathname = usePathname();

    const setLanguage = (lang: Language) => {
        // Disabled
        console.log('Language switching disabled');
    };

    const toggleLanguage = () => {
        // Disabled
        console.log('Language switching disabled');
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
