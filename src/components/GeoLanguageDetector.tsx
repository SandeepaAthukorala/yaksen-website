"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { detectPreferredLanguage } from '@/utils/geolocation';

/**
 * GeoLanguageDetector Component
 * Automatically detects visitor's location and redirects to appropriate language
 * Only runs once per session to avoid unnecessary API calls
 */
export default function GeoLanguageDetector() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const detectAndRedirect = async () => {
            // Only run if we're on a language-prefixed path
            if (!pathname) return;

            // Extract current language from path
            const currentLang = pathname.split('/')[1];
            if (currentLang !== 'en' && currentLang !== 'si') return;

            // Check if user has manually set language before
            const manuallySet = localStorage.getItem('yaksen_lang_manual');
            if (manuallySet === 'true') {
                // User has manually chosen a language, don't override
                return;
            }

            // Check if we've already detected and redirected in this session
            const sessionDetected = sessionStorage.getItem('yaksen_geo_redirected');
            if (sessionDetected === 'true') {
                return;
            }

            try {
                // Detect preferred language
                const preferredLang = await detectPreferredLanguage();

                // Mark as detected in this session
                sessionStorage.setItem('yaksen_geo_redirected', 'true');

                // If detected language differs from current, redirect
                if (preferredLang !== currentLang) {
                    const newPath = pathname.replace(`/${currentLang}`, `/${preferredLang}`);
                    router.replace(newPath);
                }
            } catch (error) {
                console.error('Geo-detection failed:', error);
                // Fail silently - don't interrupt user experience
            }
        };

        detectAndRedirect();
    }, [pathname, router]);

    // This component doesn't render anything
    return null;
}
