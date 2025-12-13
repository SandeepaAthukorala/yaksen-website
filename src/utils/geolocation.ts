/**
 * Geolocation utility for detecting visitor location based on IP
 */

export async function detectCountry(): Promise<string | null> {
    try {
        // Use ipapi.co free API (1000 requests/day, no API key needed)
        const response = await fetch('https://ipapi.co/json/', {
            cache: 'force-cache',
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error('Geolocation API failed');
        }

        const data = await response.json();
        return data.country_code; // Returns 'LK' for Sri Lanka, 'US' for USA, etc.
    } catch (error) {
        console.error('Geolocation detection failed:', error);
        return null; // Graceful fallback
    }
}

/**
 * Determine default language based on country code
 * @param countryCode - ISO country code (e.g., 'LK', 'US')
 * @returns 'si' for Sri Lanka, 'en' for all other countries
 */
export function getDefaultLanguageForCountry(countryCode: string | null): 'si' | 'en' {
    return countryCode === 'LK' ? 'si' : 'en';
}

/**
 * Detect visitor's preferred language
 * Priority:
 * 1. Saved user preference (localStorage)
 * 2. IP-based geolocation
 * 3. Browser language
 * 4. Default to English
 */
export async function detectPreferredLanguage(): Promise<'si' | 'en'> {
    // Check if running on client-side
    if (typeof window === 'undefined') {
        return 'en'; // Default for server-side rendering
    }

    // 1. Check saved preference (user manually changed language)
    const savedLang = localStorage.getItem('yaksen-lang');
    if (savedLang === 'si' || savedLang === 'en') {
        return savedLang;
    }

    // 2. Check if we've already detected location this session
    const geoDetected = sessionStorage.getItem('yaksen_geo_detected');
    const geoLang = sessionStorage.getItem('yaksen_geo_lang');

    if (geoDetected === 'true' && (geoLang === 'si' || geoLang === 'en')) {
        return geoLang;
    }

    // 3. Detect via IP geolocation
    try {
        const country = await detectCountry();
        const detectedLang = getDefaultLanguageForCountry(country);

        // Save to sessionStorage to avoid repeated API calls
        sessionStorage.setItem('yaksen_geo_detected', 'true');
        sessionStorage.setItem('yaksen_geo_lang', detectedLang);

        return detectedLang;
    } catch (error) {
        console.error('Language detection failed:', error);
    }

    // 4. Fallback to browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('si')) {
        return 'si';
    }

    // 5. Final fallback
    return 'en';
}
