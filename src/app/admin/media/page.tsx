'use client';

export default function MediaPage() {
    const handleUpload = () => {
        // Cloudinary upload widget would go here
        alert('Cloudinary integration requires API keys in .env.local\n\nFor now, you can:\n1. Upload images directly to Cloudinary\n2. Copy the image URL\n3. Paste it into your project/team/blog forms');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">Media Library</h1>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
                <div className="max-w-md mx-auto space-y-4">
                    <div className="w-20 h-20 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto">
                        <svg
                            className="w-10 h-10 text-indigo-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-white">
                        Cloudinary Integration
                    </h2>

                    <p className="text-slate-400">
                        To use the media library, add your Cloudinary credentials to{' '}
                        <code className="text-indigo-400">.env.local</code>
                    </p>

                    <div className="bg-slate-800/50 rounded-lg p-4 text-left text-sm">
                        <pre className="text-slate-300">
                            {`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret`}
                        </pre>
                    </div>

                    <button
                        onClick={handleUpload}
                        disabled
                        className="px-6 py-3 bg-indigo-600/50 text-white rounded-lg opacity-50 cursor-not-allowed"
                    >
                        Upload Media (Requires Cloudinary Setup)
                    </button>

                    <div className="pt-4 border-t border-slate-800">
                        <h3 className="text-white font-semibold mb-2">Quick Alternative:</h3>
                        <ol className="text-slate-400 text-sm text-left space-y-1">
                            <li>1. Go to <a href="https://cloudinary.com" target="_blank" className="text-indigo-400 hover:underline">cloudinary.com</a></li>
                            <li>2. Upload images in their dashboard</li>
                            <li>3. Copy the image URL</li>
                            <li>4. Use the URL in your projects/team/blog entries</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
