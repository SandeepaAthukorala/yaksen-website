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
    const [language, setLanguageState] = useState<Language>(initialLang);
    const router = useRouter();
    const pathname = usePathname();

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('yaksen-lang', lang);

        // redirect to new locale
        if (!pathname) return;
        const newPath = pathname.replace(`/${language}`, `/${lang}`);
        router.push(newPath);
    };

    const toggleLanguage = () => {
        const newLang = language === 'si' ? 'en' : 'si';
        setLanguage(newLang);
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
