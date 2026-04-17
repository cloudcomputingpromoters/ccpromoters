'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-[#1A3A8F] mb-2">Oops</div>
        <h1 className="text-2xl font-bold text-[#1A3A8F] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>Something went wrong</h1>
        <p className="text-[#4A5568] mb-8">We encountered an unexpected error. Please try again or return to the homepage.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="bg-[#D4AF37] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#B8960C] transition-colors">
            Try Again
          </button>
          <Link href="/" className="border border-[#1A3A8F] text-[#1A3A8F] font-bold px-6 py-3 rounded-lg hover:bg-[#1A3A8F] hover:text-white transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
