'use client';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';

export default function DebugPage() {
    const { language } = useLanguage();
    const pathname = usePathname();

    return (
        <div className="min-h-screen pt-32 px-6 text-white text-2xl font-mono">
            <h1>Debug Info</h1>
            <ul>
                <li>Pathname: {pathname}</li>
                <li>Context Language: {language}</li>
            </ul>
        </div>
    );
}
