"use client";

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function useScrollRestoration() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Use a ref to track if we've already restored scroll for this mount
    const isRestored = useRef(false);

    useEffect(() => {
        const storageKey = `scroll-position-${pathname}`;
        const savedPosition = sessionStorage.getItem(storageKey);

        if (savedPosition && !isRestored.current) {
            // Small timeout to ensure content is rendered
            setTimeout(() => {
                window.scrollTo({
                    top: parseInt(savedPosition),
                    behavior: 'instant'
                });
                isRestored.current = true;
            }, 100);
        }
    }, [pathname, searchParams]);

    useEffect(() => {
        const handleScroll = () => {
            const storageKey = `scroll-position-${window.location.pathname}`;
            sessionStorage.setItem(storageKey, window.scrollY.toString());
        };

        // Throttled save could be better, but native scroll event is fine for modern browsers
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);
}
