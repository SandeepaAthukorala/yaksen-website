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
    // Disabled for English-only enforcement
    // const router = useRouter();
    // const pathname = usePathname();

    // useEffect(() => {
    //     // ... logic removed ...
    // }, [pathname, router]);

    // This component doesn't render anything
    return null;
}
