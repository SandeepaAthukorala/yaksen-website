import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-yaksen-black text-white relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yaksen-black/90 pointer-events-none" />

            <div className="relative z-10 text-center px-6">
                <h1 className="text-9xl font-bold text-yaksen-red opacity-20 mb-4 select-none">404</h1>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Page Not Found</h2>
                <p className="text-gray-400 text-lg mb-12 max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-yaksen-red/50 rounded-full transition-all duration-300 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Return Home</span>
                </Link>
            </div>
        </div>
    );
}
