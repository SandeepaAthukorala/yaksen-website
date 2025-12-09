"use client";

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function useScrollRestoration() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Use a ref to track if we've already restored scroll for this mount
    const isRestored = useRef(false);

    useEffect(() => {
        // Only run on the homepage
        if (pathname === '/') {
            const savedPosition = sessionStorage.getItem('homepage-scroll-position');

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
        }
    }, [pathname, searchParams]);

    useEffect(() => {
        const handleScroll = () => {
            // Only save if we are on the homepage
            if (window.location.pathname === '/') {
                sessionStorage.setItem('homepage-scroll-position', window.scrollY.toString());
            }
        };

        // Throttled save could be better, but native scroll event is fine for modern browsers
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);
}
